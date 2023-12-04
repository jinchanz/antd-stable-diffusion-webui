# Antd Stable Diffusion web UI
![image](https://github.com/jinchanz/antd-stable-diffusion-webui/assets/44559440/07b4ab4e-5c96-42c5-8ec7-04335526eb4a)

## 介绍
Antd Stable Diffusion web UI 是一个纯前端的项目，它通过配置的方式调用 Stable Diffusion web UI 提供的 API。
![image](https://github.com/jinchanz/antd-stable-diffusion-webui/assets/44559440/316a52eb-7d3d-4798-a4ba-ab6a234561ec)

尽管 Stable Diffusion web UI 很出色，但由于它使用的是Gradio框架，因此在前端和后端方面都比较难以进行扩展。刚好，最近我正在开发一个在线的 Stable Diffusion 项目叫做 [Malette.Art](https://malette.art)。该项目可以保存用户所有生成图像的参数，可用作固定工作流程或历史回溯。为了实现这个项目，我使用了常规的前端框架（与Gradio进行对比），通过API和MQ的方式与图像生成算法进行交互。为了分享这项工作并促进更多的贡献，我决定将该项目的前端部分开源。


## 使用方式

首先要启动 Stable Diffusion web UI 项目，具体操作详见 https://github.com/AUTOMATIC1111/stable-diffusion-webui 
注意启动参数要带上 --api ，这样默认就会在 7861 端口提供 API 服务，当然也可以用远程服务器上启动的 Stable Diffusion web UI，在下面的配置界面填入正确的 url 就行。

### 启动项目
```bash
$ npm install

$ npm start
```
### 配置 API
浏览器访问 http://127.0.0.1:3000
填写正确可访问的 Stable Diffusion web UI API 地址：
![image](https://github.com/jinchanz/antd-stable-diffusion-webui/assets/44559440/316a52eb-7d3d-4798-a4ba-ab6a234561ec)

## 项目概览

```md
.
├── README.md
├── package.json
├── .browserslistrc                 # Browsers that we support
├── public
│   ├── favicon.ico   
├── src
|  ├── App.tsx                      # App entry
|  ├── assets
|  ├── builtin-extensions           # 内置插件
|  ├── components                   # 组件
|  ├── configs                      # 配置
|  ├── global.css                   # Global style
|  ├── pages                        # Pages directory
|  ├── services
|  └── types
└── tsconfig.json
```
