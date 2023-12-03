import { builtinExtensions } from "@/builtin-extensions";
import { StableDiffusionWebUIConfig } from "@/types/config";

export const DefaultStableDiffusionWebUIConfig: StableDiffusionWebUIConfig = {
  generalConfig: {
    baseAPI: {
      tooltip: 'Stable Diffusion 地址',
      contentType: 'string',
      value: 'abc'
    }
  },
  builtinExtensions
};

export const getOrInitConfig = (): StableDiffusionWebUIConfig => {
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

export const saveConfig = (config: StableDiffusionWebUIConfig) => {
  localStorage.setItem('DefaultStableDiffusionWebUIConfig', JSON.stringify(config))
};

export const getSDBaseAPI = () => {
  const config = getOrInitConfig();
  return config?.generalConfig?.baseAPI?.value;
}