import { ExtensionConfig } from "./extension";
import { GeneralConfig } from "./general";

export interface StableDiffusionWebUIConfig {
  generalConfig: GeneralConfig;
  builtinExtensions?: ExtensionConfig[];
  extensions?: ExtensionConfig[];
}