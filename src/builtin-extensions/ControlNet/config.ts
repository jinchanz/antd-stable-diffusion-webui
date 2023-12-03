import { ExtensionConfig } from "@/types/config/extension";

export const config: ExtensionConfig = {
  name: 'ControlNet',
  title: 'ControlNet',
  options: {
    control_net_unit_count: {
      tooltip: 'ControlNet 单元个数',
      contentType: 'number',
      value: 4
    }
  },
  alwaysOn: true,
  componentName: 'ControlNetPane',
};