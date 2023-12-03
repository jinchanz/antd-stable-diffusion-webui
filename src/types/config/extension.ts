export interface ExtensionConfig {

  name: string;
  title?: string;
  alwaysOn: boolean;
  options: Record<string, unknown>;
  
}
