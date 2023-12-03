export default {
  "All": {
    "module_list": [
      "none",
      "invert (from white bg & black line)",
      "blur_gaussian",
      "canny",
      "depth_leres",
      "depth_leres++",
      "depth_midas",
      "depth_zoe",
      "dw_openpose_full",
      "inpaint_global_harmonious",
      "inpaint_only",
      "inpaint_only+lama",
      "ip-adapter_clip_sd15",
      "ip-adapter_clip_sdxl",
      "lineart_anime",
      "lineart_anime_denoise",
      "lineart_coarse",
      "lineart_realistic",
      "lineart_standard (from white bg & black line)",
      "mediapipe_face",
      "mlsd",
      "normal_bae",
      "normal_midas",
      "openpose",
      "openpose_face",
      "openpose_faceonly",
      "openpose_full",
      "openpose_hand",
      "recolor_intensity",
      "recolor_luminance",
      "reference_adain",
      "reference_adain+attn",
      "reference_only",
      "revision_clipvision",
      "revision_ignore_prompt",
      "scribble_hed",
      "scribble_pidinet",
      "scribble_xdog",
      "seg_ofade20k",
      "seg_ofcoco",
      "seg_ufade20k",
      "shuffle",
      "softedge_hed",
      "softedge_hedsafe",
      "softedge_pidinet",
      "softedge_pidisafe",
      "t2ia_color_grid",
      "t2ia_sketch_pidi",
      "t2ia_style_clipvision",
      "threshold",
      "tile_colorfix",
      "tile_colorfix+sharp",
      "tile_resample"
    ],
    "model_list": [
      "None",
      "control_canny-fp16 [e3fe7712]",
      "control_depth-fp16 [400750f6]",
      "control_depth [bda98948]",
      "control_hed-fp16 [13fee50b]",
      "control_hed [591190d3]",
      "control_mlsd-fp16 [e3705cfa]",
      "control_normal-fp16 [63f96f7c]",
      "control_openpose-fp16 [9ca67cc5]",
      "control_openpose [b46e25f5]",
      "control_scribble-fp16 [c508311e]",
      "control_seg-fp16 [b9c1cc12]",
      "control_v11e_sd15_ip2p [c4bb465c]",
      "control_v11e_sd15_shuffle [526bfdae]",
      "control_v11f1e_sd15_tile [a371b31b]",
      "control_v11f1p_sd15_depth [cfd03158]",
      "control_v11p_sd15_canny [d14c016b]",
      "control_v11p_sd15_inpaint [ebff9138]",
      "control_v11p_sd15_lineart [43d4be0d]",
      "control_v11p_sd15_mlsd [aca30ff0]",
      "control_v11p_sd15_normalbae [316696f1]",
      "control_v11p_sd15_openpose [cab727d4]",
      "control_v11p_sd15_seg [e1f51eb9]",
      "control_v11p_sd15_softedge [a8575a2a]",
      "control_v2p_sd15_mediapipe_face [9c7784a9]",
      "control_v2p_sd21_mediapipe_face [6e0c43ab]",
      "t2iadapter_canny-fp16 [f2e7f7cd]",
      "t2iadapter_color-fp16 [743b5c62]",
      "t2iadapter_depth-fp16 [2c829a81]",
      "t2iadapter_keypose-fp16 [e3943bb9]",
      "t2iadapter_openpose-fp16 [4286314e]",
      "t2iadapter_seg-fp16 [0e677718]",
      "t2iadapter_sketch-fp16 [75b15924]",
      "t2iadapter_style-fp16 [0e2e8330]"
    ],
    "default_option": "none",
    "default_model": "None"
  },
  "Canny": {
    "module_list": [
      "none",
      "canny",
      "invert (from white bg & black line)"
    ],
    "model_list": [
      "None",
      "control_canny-fp16 [e3fe7712]",
      "control_v11p_sd15_canny [d14c016b]",
      "t2iadapter_canny-fp16 [f2e7f7cd]"
    ],
    "default_option": "canny",
    "default_model": "control_v11p_sd15_canny [d14c016b]"
  },
  "Depth": {
    "module_list": [
      "none",
      "depth_leres",
      "depth_leres++",
      "depth_midas",
      "depth_zoe"
    ],
    "model_list": [
      "None",
      "control_depth-fp16 [400750f6]",
      "control_depth [bda98948]",
      "control_v11f1p_sd15_depth [cfd03158]",
      "t2iadapter_depth-fp16 [2c829a81]"
    ],
    "default_option": "depth_midas",
    "default_model": "control_v11f1p_sd15_depth [cfd03158]"
  },
  "NormalMap": {
    "module_list": [
      "none",
      "normal_bae",
      "normal_midas"
    ],
    "model_list": [
      "None",
      "control_normal-fp16 [63f96f7c]",
      "control_v11p_sd15_normalbae [316696f1]"
    ],
    "default_option": "normal_bae",
    "default_model": "control_v11p_sd15_normalbae [316696f1]"
  },
  "OpenPose": {
    "module_list": [
      "none",
      "dw_openpose_full",
      "openpose",
      "openpose_face",
      "openpose_faceonly",
      "openpose_full",
      "openpose_hand"
    ],
    "model_list": [
      "None",
      "control_openpose-fp16 [9ca67cc5]",
      "control_openpose [b46e25f5]",
      "control_v11p_sd15_openpose [cab727d4]",
      "t2iadapter_openpose-fp16 [4286314e]"
    ],
    "default_option": "openpose_full",
    "default_model": "control_v11p_sd15_openpose [cab727d4]"
  },
  "MLSD": {
    "module_list": [
      "none",
      "mlsd",
      "invert (from white bg & black line)"
    ],
    "model_list": [
      "None",
      "control_mlsd-fp16 [e3705cfa]",
      "control_v11p_sd15_mlsd [aca30ff0]"
    ],
    "default_option": "mlsd",
    "default_model": "control_v11p_sd15_mlsd [aca30ff0]"
  },
  "Lineart": {
    "module_list": [
      "none",
      "lineart_anime",
      "lineart_anime_denoise",
      "lineart_coarse",
      "lineart_realistic",
      "lineart_standard (from white bg & black line)",
      "invert (from white bg & black line)"
    ],
    "model_list": [
      "None",
      "control_v11p_sd15_lineart [43d4be0d]"
    ],
    "default_option": "lineart_standard (from white bg & black line)",
    "default_model": "control_v11p_sd15_lineart [43d4be0d]"
  },
  "SoftEdge": {
    "module_list": [
      "none",
      "softedge_hed",
      "softedge_hedsafe",
      "softedge_pidinet",
      "softedge_pidisafe"
    ],
    "model_list": [
      "None",
      "control_v11p_sd15_softedge [a8575a2a]"
    ],
    "default_option": "softedge_pidinet",
    "default_model": "control_v11p_sd15_softedge [a8575a2a]"
  },
  "Scribble/Sketch": {
    "module_list": [
      "none",
      "scribble_hed",
      "scribble_pidinet",
      "scribble_xdog",
      "t2ia_sketch_pidi",
      "invert (from white bg & black line)"
    ],
    "model_list": [
      "None",
      "control_scribble-fp16 [c508311e]",
      "t2iadapter_sketch-fp16 [75b15924]"
    ],
    "default_option": "scribble_pidinet",
    "default_model": "control_scribble-fp16 [c508311e]"
  },
  "Segmentation": {
    "module_list": [
      "none",
      "seg_ofade20k",
      "seg_ofcoco",
      "seg_ufade20k"
    ],
    "model_list": [
      "None",
      "control_seg-fp16 [b9c1cc12]",
      "control_v11p_sd15_seg [e1f51eb9]",
      "t2iadapter_seg-fp16 [0e677718]"
    ],
    "default_option": "seg_ofade20k",
    "default_model": "control_v11p_sd15_seg [e1f51eb9]"
  },
  "Shuffle": {
    "module_list": [
      "none",
      "shuffle"
    ],
    "model_list": [
      "None",
      "control_v11e_sd15_shuffle [526bfdae]"
    ],
    "default_option": "shuffle",
    "default_model": "control_v11e_sd15_shuffle [526bfdae]"
  },
  "Tile/Blur": {
    "module_list": [
      "none",
      "blur_gaussian",
      "tile_colorfix",
      "tile_colorfix+sharp",
      "tile_resample"
    ],
    "model_list": [
      "None",
      "control_v11f1e_sd15_tile [a371b31b]"
    ],
    "default_option": "tile_resample",
    "default_model": "control_v11f1e_sd15_tile [a371b31b]"
  },
  "Inpaint": {
    "module_list": [
      "none",
      "inpaint_global_harmonious",
      "inpaint_only",
      "inpaint_only+lama"
    ],
    "model_list": [
      "None",
      "control_v11p_sd15_inpaint [ebff9138]"
    ],
    "default_option": "inpaint_only",
    "default_model": "control_v11p_sd15_inpaint [ebff9138]"
  },
  "InstructP2P": {
    "module_list": [
      "none"
    ],
    "model_list": [
      "None",
      "control_v11e_sd15_ip2p [c4bb465c]"
    ],
    "default_option": "none",
    "default_model": "control_v11e_sd15_ip2p [c4bb465c]"
  },
  "Reference": {
    "module_list": [
      "none",
      "reference_adain",
      "reference_adain+attn",
      "reference_only"
    ],
    "model_list": [
      "None",
      "control_canny-fp16 [e3fe7712]",
      "control_depth-fp16 [400750f6]",
      "control_depth [bda98948]",
      "control_hed-fp16 [13fee50b]",
      "control_hed [591190d3]",
      "control_mlsd-fp16 [e3705cfa]",
      "control_normal-fp16 [63f96f7c]",
      "control_openpose-fp16 [9ca67cc5]",
      "control_openpose [b46e25f5]",
      "control_scribble-fp16 [c508311e]",
      "control_seg-fp16 [b9c1cc12]",
      "control_v11e_sd15_ip2p [c4bb465c]",
      "control_v11e_sd15_shuffle [526bfdae]",
      "control_v11f1e_sd15_tile [a371b31b]",
      "control_v11f1p_sd15_depth [cfd03158]",
      "control_v11p_sd15_canny [d14c016b]",
      "control_v11p_sd15_inpaint [ebff9138]",
      "control_v11p_sd15_lineart [43d4be0d]",
      "control_v11p_sd15_mlsd [aca30ff0]",
      "control_v11p_sd15_normalbae [316696f1]",
      "control_v11p_sd15_openpose [cab727d4]",
      "control_v11p_sd15_seg [e1f51eb9]",
      "control_v11p_sd15_softedge [a8575a2a]",
      "control_v2p_sd15_mediapipe_face [9c7784a9]",
      "control_v2p_sd21_mediapipe_face [6e0c43ab]",
      "t2iadapter_canny-fp16 [f2e7f7cd]",
      "t2iadapter_color-fp16 [743b5c62]",
      "t2iadapter_depth-fp16 [2c829a81]",
      "t2iadapter_keypose-fp16 [e3943bb9]",
      "t2iadapter_openpose-fp16 [4286314e]",
      "t2iadapter_seg-fp16 [0e677718]",
      "t2iadapter_sketch-fp16 [75b15924]",
      "t2iadapter_style-fp16 [0e2e8330]"
    ],
    "default_option": "reference_only",
    "default_model": "None"
  },
  "Recolor": {
    "module_list": [
      "none",
      "recolor_intensity",
      "recolor_luminance"
    ],
    "model_list": [
      "None",
      "control_canny-fp16 [e3fe7712]",
      "control_depth-fp16 [400750f6]",
      "control_depth [bda98948]",
      "control_hed-fp16 [13fee50b]",
      "control_hed [591190d3]",
      "control_mlsd-fp16 [e3705cfa]",
      "control_normal-fp16 [63f96f7c]",
      "control_openpose-fp16 [9ca67cc5]",
      "control_openpose [b46e25f5]",
      "control_scribble-fp16 [c508311e]",
      "control_seg-fp16 [b9c1cc12]",
      "control_v11e_sd15_ip2p [c4bb465c]",
      "control_v11e_sd15_shuffle [526bfdae]",
      "control_v11f1e_sd15_tile [a371b31b]",
      "control_v11f1p_sd15_depth [cfd03158]",
      "control_v11p_sd15_canny [d14c016b]",
      "control_v11p_sd15_inpaint [ebff9138]",
      "control_v11p_sd15_lineart [43d4be0d]",
      "control_v11p_sd15_mlsd [aca30ff0]",
      "control_v11p_sd15_normalbae [316696f1]",
      "control_v11p_sd15_openpose [cab727d4]",
      "control_v11p_sd15_seg [e1f51eb9]",
      "control_v11p_sd15_softedge [a8575a2a]",
      "control_v2p_sd15_mediapipe_face [9c7784a9]",
      "control_v2p_sd21_mediapipe_face [6e0c43ab]",
      "t2iadapter_canny-fp16 [f2e7f7cd]",
      "t2iadapter_color-fp16 [743b5c62]",
      "t2iadapter_depth-fp16 [2c829a81]",
      "t2iadapter_keypose-fp16 [e3943bb9]",
      "t2iadapter_openpose-fp16 [4286314e]",
      "t2iadapter_seg-fp16 [0e677718]",
      "t2iadapter_sketch-fp16 [75b15924]",
      "t2iadapter_style-fp16 [0e2e8330]"
    ],
    "default_option": "recolor_luminance",
    "default_model": "None"
  },
  "Revision": {
    "module_list": [
      "none",
      "revision_clipvision",
      "revision_ignore_prompt"
    ],
    "model_list": [
      "None",
      "control_canny-fp16 [e3fe7712]",
      "control_depth-fp16 [400750f6]",
      "control_depth [bda98948]",
      "control_hed-fp16 [13fee50b]",
      "control_hed [591190d3]",
      "control_mlsd-fp16 [e3705cfa]",
      "control_normal-fp16 [63f96f7c]",
      "control_openpose-fp16 [9ca67cc5]",
      "control_openpose [b46e25f5]",
      "control_scribble-fp16 [c508311e]",
      "control_seg-fp16 [b9c1cc12]",
      "control_v11e_sd15_ip2p [c4bb465c]",
      "control_v11e_sd15_shuffle [526bfdae]",
      "control_v11f1e_sd15_tile [a371b31b]",
      "control_v11f1p_sd15_depth [cfd03158]",
      "control_v11p_sd15_canny [d14c016b]",
      "control_v11p_sd15_inpaint [ebff9138]",
      "control_v11p_sd15_lineart [43d4be0d]",
      "control_v11p_sd15_mlsd [aca30ff0]",
      "control_v11p_sd15_normalbae [316696f1]",
      "control_v11p_sd15_openpose [cab727d4]",
      "control_v11p_sd15_seg [e1f51eb9]",
      "control_v11p_sd15_softedge [a8575a2a]",
      "control_v2p_sd15_mediapipe_face [9c7784a9]",
      "control_v2p_sd21_mediapipe_face [6e0c43ab]",
      "t2iadapter_canny-fp16 [f2e7f7cd]",
      "t2iadapter_color-fp16 [743b5c62]",
      "t2iadapter_depth-fp16 [2c829a81]",
      "t2iadapter_keypose-fp16 [e3943bb9]",
      "t2iadapter_openpose-fp16 [4286314e]",
      "t2iadapter_seg-fp16 [0e677718]",
      "t2iadapter_sketch-fp16 [75b15924]",
      "t2iadapter_style-fp16 [0e2e8330]"
    ],
    "default_option": "revision_clipvision",
    "default_model": "None"
  },
  "T2I-Adapter": {
    "module_list": [
      "none",
      "t2ia_color_grid",
      "t2ia_sketch_pidi",
      "t2ia_style_clipvision"
    ],
    "model_list": [
      "None",
      "t2iadapter_canny-fp16 [f2e7f7cd]",
      "t2iadapter_color-fp16 [743b5c62]",
      "t2iadapter_depth-fp16 [2c829a81]",
      "t2iadapter_keypose-fp16 [e3943bb9]",
      "t2iadapter_openpose-fp16 [4286314e]",
      "t2iadapter_seg-fp16 [0e677718]",
      "t2iadapter_sketch-fp16 [75b15924]",
      "t2iadapter_style-fp16 [0e2e8330]"
    ],
    "default_option": "none",
    "default_model": "t2iadapter_canny-fp16 [f2e7f7cd]"
  },
  "IP-Adapter": {
    "module_list": [
      "none",
      "ip-adapter_clip_sd15",
      "ip-adapter_clip_sdxl"
    ],
    "model_list": [
      "None",
      "control_canny-fp16 [e3fe7712]",
      "control_depth-fp16 [400750f6]",
      "control_depth [bda98948]",
      "control_hed-fp16 [13fee50b]",
      "control_hed [591190d3]",
      "control_mlsd-fp16 [e3705cfa]",
      "control_normal-fp16 [63f96f7c]",
      "control_openpose-fp16 [9ca67cc5]",
      "control_openpose [b46e25f5]",
      "control_scribble-fp16 [c508311e]",
      "control_seg-fp16 [b9c1cc12]",
      "control_v11e_sd15_ip2p [c4bb465c]",
      "control_v11e_sd15_shuffle [526bfdae]",
      "control_v11f1e_sd15_tile [a371b31b]",
      "control_v11f1p_sd15_depth [cfd03158]",
      "control_v11p_sd15_canny [d14c016b]",
      "control_v11p_sd15_inpaint [ebff9138]",
      "control_v11p_sd15_lineart [43d4be0d]",
      "control_v11p_sd15_mlsd [aca30ff0]",
      "control_v11p_sd15_normalbae [316696f1]",
      "control_v11p_sd15_openpose [cab727d4]",
      "control_v11p_sd15_seg [e1f51eb9]",
      "control_v11p_sd15_softedge [a8575a2a]",
      "control_v2p_sd15_mediapipe_face [9c7784a9]",
      "control_v2p_sd21_mediapipe_face [6e0c43ab]",
      "t2iadapter_canny-fp16 [f2e7f7cd]",
      "t2iadapter_color-fp16 [743b5c62]",
      "t2iadapter_depth-fp16 [2c829a81]",
      "t2iadapter_keypose-fp16 [e3943bb9]",
      "t2iadapter_openpose-fp16 [4286314e]",
      "t2iadapter_seg-fp16 [0e677718]",
      "t2iadapter_sketch-fp16 [75b15924]",
      "t2iadapter_style-fp16 [0e2e8330]"
    ],
    "default_option": "ip-adapter_clip_sd15",
    "default_model": "None"
  }
}