import { useCallback, useEffect, useState } from 'react';

import { Collapse, Form, Image, Select, Space, Spin, Tabs, message } from 'antd';

import { Loading } from '@/components/Loading';
import { ControlNetPane } from '@/builtin-extensions/ControlNet';

import styles from './index.module.scss'
import { DownloadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import Text2ImagePanel from '@/components/Text2Image';
import { listLoras, listSDModels, listSDVAEs, txt2img } from '@/services/api';
import { isValidHttpUrl } from '@/utils';
import { getOrInitConfig } from '@/configs';
import { ConfigPanel } from '@/configs/ui';
import { StableDiffusionWebUIConfig } from '@/types/config';
import { buildExtensionUI } from '@/extensions';

export interface FieldData {
  name: string | number | (string | number)[];
  value?: unknown;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const defaultBaseSDURL = localStorage.getItem("SD_BASE_URL") || '';

const defaultCNCount = localStorage.getItem("CONTROLNET_COUNT") || 4;



const SD = () => {
  const [ config, setConfig ] = useState<StableDiffusionWebUIConfig>();
  const [ globalLoading, setGlobalLoading ] = useState(false);
  const [ sdModels, setSDModels ] = useState<unknown[]>([]);
  const [ loras, setLoras ] = useState<unknown[]>([]);
  const [ sdVAEs, setSDVAEs ] = useState<unknown[]>([]);
  const [ messageApi, contextHolder ] = message.useMessage();
  const [ images, setImages ] = useState([]);
  const [ generating, setGenerating ] = useState(false);
  const [ form ] = Form.useForm();
  const [ previewIndex, setPreviewIndex ] = useState(0);
  const [ showSettingModal, setShowSettingModal ] = useState(false);
  const [ selectedLoRAs, setSelectedLoRAs ] = useState<unknown[]>([]);
  const [ params, setParams ] = useState<Record<string, unknown>>({});

  const extensionsUI = buildExtensionUI(params?.extensionParams, (updates) => {
    setParams({
      ...params,
      extensionParams: {
        ...updates
      }
    })
  });

  const init = useCallback(() => {
    const storedConfig = getOrInitConfig();
    if (!storedConfig?.generalConfig?.baseAPI?.value) {
      setShowSettingModal(true);
      setGlobalLoading(false);
      return;
    }
    const fetchSDModels = async () => {
      const sdModelsRes = await listSDModels()
      setSDModels(sdModelsRes as unknown[]);
    }
    const fetchLoras = async () => {
      const loraRes = await listLoras()
      setLoras(loraRes as unknown[]);
    }
    const fetchSDVAEs = async () => {
      const sdVAERes = await listSDVAEs()
      setSDVAEs(sdVAERes as unknown[]);
    }
    fetchSDModels();
    fetchSDVAEs();
    fetchLoras();
    setConfig(storedConfig)
  }, []);

  const handleConfigChanged = useCallback((updates) => {
    setConfig(updates)
    init();
  }, [init])

  useEffect(() => {
    init();
  }, [init])

  const handleGenerate = async () => {
    const sdUrl = config?.generalConfig.baseAPI?.value;
    if (!sdUrl) {
      setShowSettingModal(true);
      messageApi.error("未设置 Stable Diffusion WebUI 地址，请点击右下角🔧进行设置")
      return;
    }
    const { extensionParams = {} } = params;
    const alwayson_scripts = {};
    Object.keys(extensionParams).forEach(item => {
      alwayson_scripts[item] = {
        args: extensionParams[item].filter(item => item?.enabled)
      }
    });
    
    const formFields = form.getFieldsValue();
    const { sd_model_checkpoint, sd_vae, ...sdParams } = formFields;
    const override_settings = {};

    if (sd_model_checkpoint) {
      override_settings.sd_model_checkpoint = sd_model_checkpoint;
    }

    if (sd_vae) {
      override_settings.sd_vae = sd_vae;
    }

    if (!override_settings.sd_model_checkpoint) {
      return;
    }

    if (selectedLoRAs) {
      selectedLoRAs.forEach(item => {
        const loraWeight = item.loraWeight || 1;
        sdParams.prompt += `,<lora:${item.name}:${loraWeight}>`
      });
    }

    setGenerating(true);

    const txt2imgRes = await txt2img({
      ...sdParams,
      override_settings,
      alwayson_scripts
    });
    console.log(txt2imgRes);
    if (txt2imgRes?.images) {
      setImages(txt2imgRes.images.map(item => `data:image/jpg;base64,${item}`));
    }
    setGenerating(false);
  }
  
  return (
    <Spin spinning={globalLoading}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <Form 
            className={styles.formWrapper} 
            layout="vertical" 
            form={form} 
            initialValues={{
              sampler_index: 'DPM++ 2M Karras',
              steps: '20',
              width: '512',
              height: '512',
              cfg_scale: '7',
              batch_size: '1',
              seed: '-1',
            }}
          >
            <div className={styles.selectionSection}>
              <div className={styles.item}>
                <Form.Item rules={[{ required: true }]} label="SD 模型" name="sd_model_checkpoint" className={styles.formItem}>
                  <Select options={sdModels?.map?.(item => ({
                    label: item.model_name,
                    value: item.title,
                  }))} className={styles.selectComp} />
                </Form.Item>
              </div>
              <div className={styles.item}>
                <Form.Item label="VAE" name="sd_vae" className={styles.formItem}>
                  <Select allowClear options={sdVAEs?.map?.(item => ({
                    label: item.model_name,
                    value: item.model_name,
                  }))} className={styles.selectComp} />
                </Form.Item>
              </div>
            </div>
            <Tabs items={
              [
                {
                  key: 'text2image',
                  label: '文生图',
                  children: <Text2ImagePanel onLoraSelected={(loraList) => {
                    setSelectedLoRAs(loraList);
                  }} loras={loras} onSubmit={handleGenerate} />
                },
                {
                  key: 'image2image',
                  label: '图生图',
                  disabled: true,
                  children: <Text2ImagePanel />
                },
              ]
            }>  
            </Tabs>
            { extensionsUI }
          </Form>
          <div className={styles.miniImageGallery}>
            <div className={styles.bigImage}>
            {images?.length ? <Image.PreviewGroup
              preview={{
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                  },
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={() => {
                      // onDownload(sdTaskResults[previewIndex]?.publicId, `https://i.ablula.tech/${sdTaskResults[previewIndex]?.results}`);
                    }} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                  </Space>
                ),
              }}
              items={images}
            > 
              <Image
                height="100%"
                style={{ maxHeight: '100%' }}
                className={styles.bigImageChild} 
                src={`${images?.[0]}`} />
            </Image.PreviewGroup> : null}
            </div>
            <div className={styles.imageListContainer}>
              
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.rightArea}>
          <div className={styles.bigImage}>
          {images?.length ? <Image.PreviewGroup
              preview={{
                current: previewIndex,
                onChange: setPreviewIndex,
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                  },
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={() => {
                      // onDownload(sdTaskResults[previewIndex]?.publicId, `https://i.ablula.tech/${sdTaskResults[previewIndex]?.results}`);
                    }} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                  </Space>
                ),
              }}
              items={images}
            > 
              {
                generating ? <Loading visibility="visible" /> :
                <Image
                  height="100%"
                  style={{ maxHeight: '100%' }}
                  className={styles.bigImageChild} 
                  src={`${images?.[previewIndex]}`} />
              }
            </Image.PreviewGroup> : generating ? <Loading visibility="visible" /> : null}
          </div>
          <div className={styles.imageListContainer}>
            { images?.length ? images.map((item, index) => {
                return <div className={ previewIndex === index ? styles.selectedPreviewItem : styles.previewItem} onClick={() => { setPreviewIndex(index) }}>
                  <img src={item} />
                </div>
              })
            : null }
          </div>
        </div>
      </div>
      <ConfigPanel open={showSettingModal} config={config} onOk={handleConfigChanged} />
    </Spin>
  );
}

export default SD;
