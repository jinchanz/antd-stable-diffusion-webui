export enum ControlNetModule {
  "none" = "none",
  "canny" = "canny",
  "depth" = "depth",
  "depth_leres" = "depth_leres",
  "depth_leres++" = "depth_leres++",
  "hed" = "hed",
  "hed_safe" = "hed_safe",
  "mediapipe_face" = "mediapipe_face",
  "mlsd" = "mlsd",
  "normal_map" = "normal_map",
  "openpose" = "openpose",
  "openpose_hand" = "openpose_hand",
  "openpose_face" = "openpose_face",
  "openpose_faceonly" = "openpose_faceonly",
  "openpose_full" = "openpose_full",
  "dw_openpose_full" = "dw_openpose_full",
  "clip_vision" = "clip_vision",
  "revision_clipvision" = "revision_clipvision",
  "revision_ignore_prompt" = "revision_ignore_prompt",
  "ip-adapter_clip_sd15" = "ip-adapter_clip_sd15",
  "ip-adapter_clip_sdxl" = "ip-adapter_clip_sdxl",
  "color" = "color",
  "pidinet" = "pidinet",
  "pidinet_safe" = "pidinet_safe",
  "pidinet_sketch" = "pidinet_sketch",
  "pidinet_scribble" = "pidinet_scribble",
  "scribble_xdog" = "scribble_xdog",
  "scribble_hed" = "scribble_hed",
  "segmentation" = "segmentation",
  "threshold" = "threshold",
  "depth_zoe" = "depth_zoe",
  "normal_bae" = "normal_bae",
  "oneformer_coco" = "oneformer_coco",
  "oneformer_ade20k" = "oneformer_ade20k",
  "lineart" = "lineart",
  "lineart_coarse" = "lineart_coarse",
  "lineart_anime" = "lineart_anime",
  "lineart_standard" = "lineart_standard",
  "shuffle" = "shuffle",
  "tile_resample" = "tile_resample",
  "invert" = "invert",
  "lineart_anime_denoise" = "lineart_anime_denoise",
  "reference_only" = "reference_only",
  "reference_adain" = "reference_adain",
  "reference_adain+attn" = "reference_adain+attn",
  "inpaint" = "inpaint",
  "inpaint_only" = "inpaint_only",
  "inpaint_only+lama" = "inpaint_only+lama",
  "tile_colorfix" = "tile_colorfix",
  "tile_colorfix+sharp" = "tile_colorfix+sharp",
  "recolor_luminance" = "recolor_luminance",
  "recolor_intensity" = "recolor_intensity",
  "blur_gaussian" = "blur_gaussian",
}

export enum ControlNetModel {
  control_v11f1e_sd15_tile = 'control_v11f1e_sd15_tile',
}

const enum ControlMode {
  Normal = 0,
  Guide = 1,
}

const enum ResizeMode {
  None = 0,
  Resize = 1,
  ResizeKeepRatio = 2,
}

export interface ControlNetUnit {
  enabled: boolean;
  low_vram?: boolean;
  pixel_perfect?: boolean;

  // 用于界面展示，无需传递给算法
  allowPreview?: boolean;
  controlType?: string;

  module?: ControlNetModule; // 页面展示为 Processor
  model?: ControlNetModel;
  weight?: number;

  guidance_start?: number;
  guidance_end?: number;

  control_mode?: ControlMode;
  resize_mode?: ResizeMode;

  threshold_a?: number;
  threshold_b?: number;
  processor_res?: number;

  // 传递给算法的是 image 参数，内容为 base64 编码字符串，db 存储和接口流转的为 image_path
  input_image?: string;
  image_path?: string;

  loopback?: boolean;
}
