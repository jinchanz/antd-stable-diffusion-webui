import { default as CONTROL_TYPES } from './data/ControlTypes';


export async function listControlTypes(): Promise<Record<string, unknown>> {

  return Promise.resolve(CONTROL_TYPES);
}