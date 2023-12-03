import { SAMPLER_OPTIONS } from '@/constants/sampler';
import { Input, Button, Collapse, Select, InputNumber, Form } from 'antd';
import { RandomIcon } from '../Icon/RandomIcon';
import InputSlider from '../InputSlider';
import LoRAPane from '../LoRAPane';
import styles from './index.module.scss'
import { useCallback, useState } from 'react';

export interface Txt2ImgPanelProps {
  onSubmit: () => void;
  loras: unknown[];
  onLoraSelected: (loras: unknown[]) => void;
}

function Text2ImagePanel(props: Txt2ImgPanelProps) {
  const { onSubmit, loras, onLoraSelected } = props;

  const [generating, setGenerating] = useState(false);
  const [selectedLoRAs, setSelectedLoRAs] = useState<unknown[]>([]);

  const onLoRAPaneChange = useCallback((loraList: unknown[]) => {
    setSelectedLoRAs(loraList);
    onLoraSelected(loraList)
  }, [onLoraSelected]);

  const [saveLoading, setSaveLoading] = useState(false);

  const handleSaveSdFile = useCallback(async () => {
    setSaveLoading(false);
    return;
  }, []);

  return <div className={styles.text2imageContainer}>
    <div className={styles.topParamArea}>
      <div className={styles.prompts}>
        <div className={styles.item}>
          <Form.Item name="prompt" style={{ marginBottom: 12 }} className={styles.formItem}>
            <Input.TextArea style={{ fontSize: 12, height: 80, resize: 'none' }} size='large' />
          </Form.Item>
        </div>
        <div className={styles.item}>
          <Form.Item style={{ marginBottom: 0 }} name="negative_prompt" className={styles.formItem}>
            <Input.TextArea style={{ fontSize: 12, height: 80, resize: 'none' }} size='large' />
          </Form.Item>
        </div>
      </div>
      <div className={styles.actions}>
        <Button 
          type="primary" 
          htmlType="submit" 
          className={styles.generateBtn} 
          loading={generating}
          onClick={onSubmit}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            { generating ? '生成中' : '生成图片' }
          </div>
        </Button>

        <Button className={styles.saveBtn} loading={saveLoading} onClick={handleSaveSdFile} type='default'>
          { saveLoading ? '保存中' : '保存参数' }
        </Button>
      </div>
    </div>
    <Collapse items={[
      {
        key: 'GenerationParams',
        label: '参数',
        children: <>
          <div className={styles.paramArea}>
            <Form.Item name="sampler_index" className={styles.item} label="采样方法">
              <Select options={SAMPLER_OPTIONS} />
            </Form.Item>
            <Form.Item name="steps" className={styles.item} label="采样步数">
              <InputSlider min={10} max={50} />
            </Form.Item>
          </div>
          <div className={styles.paramArea}>
            <Form.Item name="width" className={styles.item} label="宽度">
              <InputSlider min={128} max={2048} />
            </Form.Item>
            <Form.Item name="height" className={styles.item} label="高度">
              <InputSlider min={128} max={2048} />
            </Form.Item>
          </div>
          <div className={styles.paramArea}>
            <Form.Item name="cfg_scale" className={styles.item} label="CFG Scale">
              <InputSlider min={1} max={10} />
            </Form.Item>
            <Form.Item name="batch_size" className={styles.item} label="Batch Size">
              <InputSlider min={1} max={10} />
            </Form.Item>
          </div>
          <div className={styles.paramArea}>
            <Form.Item name="seed" className={styles.item} style={{ flex: 'auto' }} label="Seed">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item className={styles.item} label=" ">
              <Button onClick={() => {
                const sdParams = {};
                sdParams.seed = '-1';
              }}><RandomIcon /></Button>
            </Form.Item>
          </div>
        </>
      },
      {
        key: 'LoRAPane',
        label: 'LoRA',
        children: <LoRAPane hideUploader onLoRAUploaded={async () => {

        }} data={loras} value={selectedLoRAs} onChange={onLoRAPaneChange} />,
      },
    ]} />
  </div>
}

export default Text2ImagePanel;