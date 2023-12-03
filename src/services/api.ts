import request from '@/utils/request';


export async function listSDModels(): Promise<unknown> {
  const sdBaseUrl = localStorage.getItem("SD_BASE_URL");
  if (!sdBaseUrl) {
    return;
  }
  const response = await request.get(`${sdBaseUrl}/sdapi/v1/sd-models`);
  return response;
}

export async function listLoras(): Promise<unknown> {
  const sdBaseUrl = localStorage.getItem("SD_BASE_URL");
  if (!sdBaseUrl) {
    return;
  }
  const response = await request.get(`${sdBaseUrl}/sdapi/v1/loras`);
  return response;
}

export async function listSDVAEs(): Promise<unknown> {
  const sdBaseUrl = localStorage.getItem("SD_BASE_URL");
  if (!sdBaseUrl) {
    return;
  }
  const response = await request.get(`${sdBaseUrl}/sdapi/v1/sd-vae`);
  return response;
}

export async function txt2img(params: Record<string, unknown>): Promise<unknown> {
  const sdBaseUrl = localStorage.getItem("SD_BASE_URL");
  if (!sdBaseUrl) {
    return;
  }
  const response = await request.post(`${sdBaseUrl}/sdapi/v1/txt2img`, {
    ...params
  });
  return response;
}

