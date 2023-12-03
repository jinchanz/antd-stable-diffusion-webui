import { ToolOutlined } from "@ant-design/icons";
import { Modal, Input, Button, FloatButton, Tabs, TabPaneProps, InputNumber, Form } from "antd";

import styles from './index.module.scss';
import { useCallback, useEffect, useState } from "react";
import { StableDiffusionWebUIConfig } from "..";
import { GeneralConfig } from "../general";
import { ExtensionConfig } from "../../types/config/extension";

export interface ConfigPanelProps {

  open?: boolean;
  onOk?: (config: StableDiffusionWebUIConfig) => void;
  config?: StableDiffusionWebUIConfig;

}

export interface GeneralConfigPanelProps {
  config?: GeneralConfig;
  onConfirm?: (config: GeneralConfig) => void;
}

export interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}

const GeneralConfigPanel = (props: GeneralConfigPanelProps) => {

  const { config = {}, onConfirm } = props;
  const { baseAPI } = config;
  const [ baseAPIUrl, setBaseAPIUrl ] = useState(baseAPI);

  const handleBindSDUrl = useCallback(() => {
    if (!baseAPIUrl) return;
    onConfirm?.({
      ...config,
      baseAPI: baseAPIUrl
    });
  }, [baseAPIUrl, config, onConfirm]);

  return <div className={styles.bindSDUrlForm}>
    <Form.Item label="baseAPI" name="baseAPI">
      <Input value={baseAPI} onChange={(item) => {
        console.log('item: ', item.target.value);
        setBaseAPIUrl(item.target.value as string);
      }} />
    </Form.Item>
  </div>;
};

function buildExtensionConfigItemUI(options: Record<string, unknown>) {
  const configItems = Object.keys(options);

  return <div>
    {
      configItems.map(key => {
        const item = options[key];
    
        switch(typeof(item)) {
          case "string":
            return <Form.Item key={key} label={key} name={['controlnet', key]}>
              <Input />
            </Form.Item>;
          case "number":
            return <Form.Item key={key} label={key} name={['controlnet', key]}>
              <InputNumber />
            </Form.Item>;
          case "bigint":
          case "boolean":
          case "symbol":
          case "undefined":
          case "object":
          case "function":
            return <Form.Item key={key} label={key} name={['controlnet', key]}>
              <Input />
            </Form.Item>;
          default:
            return <span key={key}></span>;
        }
    
      })
    }
  </div>;

}

function buildExtensionConfigUI(extensions?: ExtensionConfig[]) : Tab[]|null {
  if (!extensions) {
    return null;
  }
  return extensions.map(item => {

    return {

      key: item.name,
      label: item.title,
      children: buildExtensionConfigItemUI(item.name, item.options)

    };

  });
}

export const ConfigPanel = (props: ConfigPanelProps) => {
  const { open: propsOpen, config = {} as StableDiffusionWebUIConfig, onOk } = props;
  const [ open, setOpen ] = useState(propsOpen);
  const [ form ] = Form.useForm();
  const handleOnGeneralConfigConfirm = useCallback((updates: GeneralConfig) => {
    const updatedConfig: StableDiffusionWebUIConfig = {
      ...config,
      generalConfig: updates,
    }
    onOk?.(updatedConfig)
  }, [config, onOk]);

  const handleSaveConfig = useCallback(() => {
    const updates = form.getFieldsValue();
    console.log('updates: ', updates);
  }, [form]);

  console.log('config.builtinExtensions: ', config.builtinExtensions);
  const builtinExtensionUI = buildExtensionConfigUI(config.builtinExtensions);
  console.log('builtinExtensionUI: ', builtinExtensionUI);

  useEffect(() => {
    setOpen(propsOpen);
  }, [propsOpen])


  return <div>
    <Modal
      className={styles.configContainer}
      title={<h1>设置</h1>} 
      centered 
      open={open} 
      onCancel={setOpen.bind(null, false)}
      onOk={handleSaveConfig}
    >
      <Form layout="vertical" form={form}>
        <div className={styles.configContentWrapper}>
          <Tabs
            items={[
              {
                key: 'General',
                label: '通用',
                children: <GeneralConfigPanel 
                  config={config.generalConfig}
                  onConfirm={handleOnGeneralConfigConfirm} 
                />
              },
              ...(builtinExtensionUI || [])
            ]}
          />
        </div>
      </Form>
    </Modal>
    <FloatButton onClick={setOpen.bind(null, true)} icon={<ToolOutlined />} />
  </div>
}