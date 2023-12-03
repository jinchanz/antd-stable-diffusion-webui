import { StableDiffusionWebUIConfig } from "@/types/config";


export const DefaultStableDiffusionWebUIConfig: StableDiffusionWebUIConfig = {
  generalConfig: {},
  builtinExtensions: [
    {
      name: 'ControlNet',
      title: 'ControlNet',
      alwaysOn: true,
      options: {
        control_net_unit_count: 4
      }
    }
  ]
};

export const getOrInitConfig = () => {
  const storedConfig = localStorage.getItem('DefaultStableDiffusionWebUIConfig');
  if (!storedConfig) {
    localStorage.setItem('DefaultStableDiffusionWebUIConfig', JSON.stringify(DefaultStableDiffusionWebUIConfig))
    return DefaultStableDiffusionWebUIConfig;
  }
  try {
    return JSON.parse(storedConfig);
  } catch (error) {
    console.error('[Config-getOrInitConfig] parse stored config error: ', error);
    return DefaultStableDiffusionWebUIConfig;
  }
};
