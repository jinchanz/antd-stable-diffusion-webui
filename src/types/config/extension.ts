
export interface ExtensionOption {

  contentType: string;
  value: unknown;
  datasource?: unknown[];
  tooltip?: string;

}


export interface ExtensionConfig {

  name: string;
  title?: string;
  alwaysOn: boolean;
  options: Record<string, ExtensionOption>;
  componentName?: string;
  
}
