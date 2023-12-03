import { ControlNetPane } from "@/builtin-extensions/ControlNet";
import { getOrInitConfig, saveConfig } from "@/configs";
import { ExtensionConfig } from "@/types/config/extension";
import { Collapse } from "antd";
import React from "react";

export const registerExtensionConfig = (extension: ExtensionConfig) => {
  const config = getOrInitConfig();
  if (!config.extensions) {
    config.extensions = [];
  }
  config.extensions.push(extension);
  saveConfig(config);
}

export const registerExtensionComponent = (componentName: string, component: React.FC|React.ReactElement) => {
  if (!window.extensionComponents) {
    window.extensionComponents = {};
  }
  window.extensionComponents[componentName] = component;
}

window.registerExtensionConfig = registerExtensionConfig;

registerExtensionComponent?.('ControlNetPane', ControlNetPane)

export const buildExtensionUI = (value, onChange) => {
  const config = getOrInitConfig();

  const { extensions = [], builtinExtensions = [] } = config;

  const mergedExtensions = builtinExtensions.concat(extensions);

  if (!mergedExtensions?.length) return null;

  const items = mergedExtensions.map((item: ExtensionConfig) => {

    const collapseItem = {
      key: item.name,
      label: <span>{item.title}</span>,
      children: React.createElement(
        window.extensionComponents[item.componentName],
        {
          options: item.options,
          data: value?.[item.name],
          onChange: (updates) => {
            onChange?.({
              ...value,
              [item.name]: updates
            })
          }
        }
      ),
    }

    return collapseItem;
  });

  return <Collapse items={items} />

}