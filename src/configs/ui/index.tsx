import { ToolOutlined } from "@ant-design/icons";
import { Modal, Input, FloatButton, Tabs, TabPaneProps, InputNumber, Form, message } from "antd";

import styles from './index.module.scss';
import { useCallback, useEffect, useState } from "react";
import { ExtensionConfig, ExtensionOption } from "../../types/config/extension";
import { StableDiffusionWebUIConfig } from "@/types/config";
import { GeneralConfig } from "@/types/config/general";
import { getOrInitConfig, saveConfig } from "..";
import { isValidHttpUrl } from "@/utils";

export interface ConfigPanelProps {

  open?: boolean;
  onOk?: (config: StableDiffusionWebUIConfig) => void;
  config?: StableDiffusionWebUIConfig;

}

export interface GeneralConfigPanelProps {
  config?: GeneralConfig;
}

export interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}

const GeneralConfigPanel = () => {
  return <div className={styles.bindSDUrlForm}>
    <Form.Item label="baseAPI" name={[ 'generalConfig', "baseAPI" ]}>
      <Input />
    </Form.Item>
  </div>;
};

function buildConfigItemUI(name, options: GeneralConfig | Record<string, ExtensionOption>) {
  const configItems = Object.keys(options);

  return <div>
    {
      configItems.map(key => {
        const item = options[key];
        switch(item.contentType || typeof item.value) {
          case "string":
            return <Form.Item tooltip={item.tooltip} key={key} label={key} name={[name, key]}>
              <Input />
            </Form.Item>;
          case "number":
            return <Form.Item tooltip={item.tooltip} key={key} label={key} name={[name, key]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>;
          case "bigint":
          case "boolean":
          case "symbol":
          case "undefined":
          case "object":
          case "function":
            return <Form.Item tooltip={item.tooltip} key={key} label={key} name={[name, key]}>
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
      children: buildConfigItemUI(item.name, item.options)

    };

  });
}

function buildInitialValues(config: StableDiffusionWebUIConfig) {
  const values = {};
  const { generalConfig, extensions = [], builtinExtensions = [] } = config;

  if (typeof generalConfig === 'object') {
    if (!values['generalConfig']) {
      values['generalConfig'] = {};
    }
    Object.keys(generalConfig).forEach(key => {
      values['generalConfig'][key] = generalConfig[key].value;
    });
  }

  const mergedExtensions = builtinExtensions.concat(extensions);
  mergedExtensions.forEach(item => {
    if (!values[item.name]) {
      values[item.name] = {};
    }
    const { options } = item;
    if (typeof options === 'object') {
      Object.keys(options).forEach(key => {
        values[item.name][key] = options[key].value;
      });
    }
  })
  
  return {
    ...values,
  }
}

export const ConfigPanel = (props: ConfigPanelProps) => {
  const { open: propsOpen, config = getOrInitConfig() as StableDiffusionWebUIConfig, onOk } = props;
  const [ open, setOpen ] = useState(propsOpen);
  const [ form ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  const handleSaveConfig = useCallback(() => {
    const updates = form.getFieldsValue();
    console.log('updates: ', updates);
    console.log('config: ', config);
    const { generalConfig = {}, extensions = [], builtinExtensions = [] } = config;
    const mergedExtensions = builtinExtensions.concat(extensions);
    Object.keys(updates).forEach(item => {
      const updateDetail = updates[item];
      if (item === 'generalConfig') {
        Object.keys(updateDetail).forEach(key => {
          if (!generalConfig[key]) {
            generalConfig[key] = {};
          }
          generalConfig[key].value = updateDetail[key];
        });
      } else {
        mergedExtensions?.forEach(extension => {
          if (item === extension.name) {
            Object.keys(extension.options).forEach(option => {
              if (typeof updateDetail[option] != 'undefined') {
                extension.options[option].value = updateDetail[option];
              }
            });
          }
        })
      }
    });

    const _url = config.generalConfig.baseAPI?.value as string;
    const isValid = isValidHttpUrl(_url);
    if (!isValid) {
      messageApi.error("请输入正确的 url")
      return;
    }
    if (_url.endsWith('/')) {
      if (!config.generalConfig.baseAPI) {
        config.generalConfig.baseAPI = {} as ExtensionOption;
      }
      config.generalConfig.baseAPI.value = _url.slice(0, -1);
    }
    saveConfig(config);
    setOpen(false);
    onOk?.(config);
  }, [config, form, messageApi, onOk]);

  const builtinExtensionUI = buildExtensionConfigUI(config.builtinExtensions);
  const initialValues = buildInitialValues(config);

  useEffect(() => {
    setOpen(propsOpen);
  }, [propsOpen])


  return <div>
    { contextHolder }
    <Modal
      className={styles.configContainer}
      title={<h1>设置</h1>} 
      centered 
      open={open} 
      onCancel={setOpen.bind(null, false)}
      onOk={handleSaveConfig}
    >
      <Form layout="vertical" form={form} initialValues={initialValues}>
        <div className={styles.configContentWrapper}>
          <Tabs
            items={[
              {
                key: 'General',
                label: '通用',
                children: buildConfigItemUI('generalConfig', config.generalConfig)
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