
import { CloseOutlined } from '@ant-design/icons'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { useCallback, useEffect, useState } from 'react'
import { Form, Space, Checkbox, Radio, Select, Button, Image as ImageComp } from 'antd'
import InputSlider from '@/components/InputSlider'
import ImageUploader from '@/components/Uploader/ImageUploader'
import { ControlNetUnit } from '@/builtin-extensions/ControlNet/types'
import { listControlTypes } from './api'

import styles from './index.module.scss'

export interface ControlNetUnitPaneProps {
  index: number;
  data: ControlNetUnit;
  onChange: (index: number, data: ControlNetUnit) => void;
}

const DefaultCnUnit = {
  low_vram: false,
  pixel_perfect: false,
  allowPreview: false,
  controlType: 'All',
  module: 'none',
  model: 'None',
  weight: 1,
  guidance_start: 0,
  guidance_end: 1,
  control_mode: 0,
  resize_mode: 1,
  threshold_a: -1,
  threshold_b: -1,
  processor_res: 512,
  loopback: false,
};

function initData(data: ControlNetUnit) {
  if (!data) return;
  Object.keys(DefaultCnUnit).forEach(item => {
    const value = data[item];
    if (typeof value === 'undefined') {
      data[item] = DefaultCnUnit[item];
    }
  })
}

function ControlNetUnitPane(props: ControlNetUnitPaneProps) {
  const { index, data = {} as ControlNetUnit, onChange } = props;
  const [ controlTypes, setControlTypes ] = useState<Record<string, unknown>>({});
  const [ imageInfo, setImageInfo ] = useState();

  useEffect(() => {
    async function fetchControlTypes() {
      const controlTypes = await listControlTypes();
      setControlTypes(controlTypes);
    }
    fetchControlTypes();
  }, []);

  const handleRadioItemChange = useCallback((key, { target: { value } }) => {
    if (key === 'controlType' && value !== 'All') {
      data.module = controlTypes[value].default_option;
      data.model = controlTypes[value].default_model;
    }

    onChange?.(index, {
      ...data,
      [key]: value
    })

  }, [onChange, index, data, controlTypes]);

  const handleCheckBoxItemChange = useCallback((key, { target: { checked } }) => {
    if (key === 'enabled' && checked) {
      console.log('init data')
      initData(data);
    }
    
    onChange?.(index, {
      ...data,
      [key]: checked
    })

  }, [index, data, onChange]);

  const handleSelectItemChange = useCallback((key, value) => {
    onChange?.(index, {
      ...data,
      [key]: value
    })

  }, [index, data, onChange]);

  const handleInputSliderItemChange = useCallback((key, value) => {
    onChange?.(index, {
      ...data,
      [key]: value
    })

  }, [index, data, onChange]);

  const handleImageUploaderChange = useCallback((key, file) => {
    setImageInfo({
      width: file?.width,
      height: file?.height
    })
    onChange?.(index, {
      ...data,
      [key]: file.src
    })

  }, [index, data, onChange]);
  

  const currentControlTypeData = controlTypes[data.controlType || 'All'];

  const modules = currentControlTypeData?.module_list.map(item => ({
    label: item,
    value: item
  }));
  
  const models = currentControlTypeData?.model_list.map(item => ({
    label: item,
    value: item
  }));
  
  const { default_option, default_model } = currentControlTypeData || {};

  console.log('data: ', data);
  console.log('imageInfo: ', imageInfo);

  return <div>
    <div className={styles.imageUploader}>
      {
        data.image_path && imageInfo?.width
          ? <div className={styles.imgWrapper}>
              { data?.module?.startsWith?.('inpaint') 
                ? <ReactSketchCanvas
                    style={{
                      border: "none",
                      borderRadius: "0",
                    }}
                    height='375'
                    width={`${imageInfo.width*375/imageInfo.height}`}
                    preserveBackgroundImageAspectRatio="meet"
                    backgroundImage={`https://i.ablula.tech/${data.image_path}`}
                    strokeWidth={4}
                    strokeColor="red"
                  /> 
                : <ImageComp height={375} style={{objectFit: 'contain'}} src={`https://i.ablula.tech/${data.image_path}`} /> 
              }
              <Button className={styles.closeBtn} onClick={handleImageUploaderChange.bind(null, 'image_path', { url: undefined})} type='text'><CloseOutlined /></Button>
            </div>
          : <ImageUploader onUploaded={handleImageUploaderChange.bind(null, 'image_path')} />
      }
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0' }}>
      <Space>
        <Checkbox checked={data.enabled} onChange={handleCheckBoxItemChange.bind(null, 'enabled')}><span>Enable</span></Checkbox>
      </Space>
      <Space>
        <Checkbox checked={data.low_vram} onChange={handleCheckBoxItemChange.bind(null, 'low_vram')}><span>Low VRAM</span></Checkbox>
      </Space>
      <Space>
        <Checkbox checked={data.pixel_perfect} onChange={handleCheckBoxItemChange.bind(null, 'pixel_perfect')}><span>Pixel Perfect</span></Checkbox>
      </Space>
      <Space>
        <Checkbox checked={data.allowPreview} onChange={handleCheckBoxItemChange.bind(null, 'allowPreview')} disabled><span>Allow Preview</span></Checkbox>
      </Space>
    </div>
    <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      <span>Control Type</span>
      <div>
        <Radio.Group 
          optionType="button"
          buttonStyle='solid'
          value={data.controlType || 'All'}
          onChange={handleRadioItemChange.bind(null, 'controlType')}
          options={Object.keys(controlTypes)}>
        </Radio.Group>
      </div>
    </div>
    <div>
      <div className={styles.cnSamplerArea}>
        <Form.Item className={styles.item} label="Processor">
          <Select 
            allowClear 
            options={modules} 
            value={data.module || default_option}
            onChange={handleSelectItemChange.bind(null, 'module')}
          />
        </Form.Item>
        <Form.Item className={styles.item} label="Model">
          <Select 
            allowClear 
            options={models} 
            value={data.model || default_model}
            onChange={handleSelectItemChange.bind(null, 'model')}
          />
        </Form.Item>
      </div>
      <div className={styles.cnSamplerArea}>
        <Form.Item className={styles.item} label="Control Weight">
          <InputSlider step={0.01} onChange={handleInputSliderItemChange.bind(null, 'weight')} min={0} max={2} value={data.weight} defaultValue={1} />
        </Form.Item>
        <Form.Item className={styles.item} label="Starting Control Step">
          <InputSlider step={0.01} onChange={handleInputSliderItemChange.bind(null, 'guidance_start')} min={0} max={1} value={data.guidance_start} defaultValue={0}/>
        </Form.Item>
        <Form.Item className={styles.item} label="Ending Control Step">
          <InputSlider step={0.01} onChange={handleInputSliderItemChange.bind(null, 'guidance_end')} min={0} max={1} value={data.guidance_end} defaultValue={1}/>
        </Form.Item>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      <span>Control Mode</span>
      <div>
        <Radio.Group value={data.control_mode} defaultValue={0} onChange={handleRadioItemChange.bind(null, 'control_mode')}>
          <Radio.Button value={0}>Balanced</Radio.Button>
          <Radio.Button value={1}>My prompt is more important</Radio.Button>
          <Radio.Button value={2}>ControlNet prompt is more important</Radio.Button>
        </Radio.Group>
      </div>
    </div>
    <div style={{ display: 'flex', marginTop: 12, gap: 8, flexDirection: 'column' }}>
      <span>Resize Mode</span>
      <div>
        <Radio.Group value={data.resize_mode} defaultValue={1} onChange={handleRadioItemChange.bind(null, 'resize_mode')}>
          <Radio.Button value={0}>Just Resize</Radio.Button>
          <Radio.Button value={1}>Crop and Resize</Radio.Button>
          <Radio.Button value={2}>Resize and Fill</Radio.Button>
        </Radio.Group>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0' }}>
      <Space>
        <Checkbox checked={data.loopback} onChange={handleCheckBoxItemChange.bind(null, 'loopback')}><span>[Loopback] Automatically send generated images to this ControlNet unit</span></Checkbox>
      </Space>
    </div>
  </div>
}

export default ControlNetUnitPane;