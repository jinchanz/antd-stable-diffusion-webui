import moment from "moment";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { UploadProps, Spin, message } from "antd";
import React, { useCallback, useEffect, useState } from 'react';

import { readFile, uuid } from "@/utils";

import styles from './index.module.scss';

export const MAX_FILE_SIZE_LIMIT = 10 * 1024 * 1024;

async function getFileWidthAndHeight (file) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height,
      })
    }
    img.src = `https://i.ablula.tech/${file.url}!medium`
  });
  
}

function ImageUploader(props: { onUploaded: (file: unknown) => void }) {
  const { onUploaded, ...propsUploadProps } = props;
  const [spinning, setSpinning] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  
  const beforeUpload = async (file) => {
    if (file.size > MAX_FILE_SIZE_LIMIT) {
      messageApi.error(`文件超过限制 ${MAX_FILE_SIZE_LIMIT/(1024*1024)}MB`);
      return;
    }
    // setSpinning(true);
    return file;
  };

  const handleLoRAUploaded = useCallback(async (info) => {
    const res = await readFile(info.file);
    console.log('res: ', res);
    // const imgInfo = await getFileWidthAndHeight(info.file.originFileObj);
    // try {
    //   onUploaded?.({
    //     ...info.file,
    //     ...imgInfo,
    //     fileList: info.fileList
    //   })
    // } catch (e) {
    //   console.error(`出现问题: ${e?.message}`);
    //   console.log('e instanceof Error: ', e instanceof Error)
    //   if (e instanceof Error) {
    //     messageApi.error(`出现问题: ${e?.message}`)
    //   }
    // } finally {
    //   setSpinning(false);
    // }
  }, [messageApi, onUploaded])

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.jpg,.png,jpeg',
    beforeUpload,
    onChange: handleLoRAUploaded,
    customRequest: async (info) => {
      const res = await readFile(info.file);
      console.log('res: ', res);
      onUploaded(res);
    },
    itemRender() {
      return null;
    },
  };

  return (
    <div style={{ height: '100%' }}>
      {/* {contextHolder} */}
      <Spin spinning={spinning}><Dragger
        className={styles.loraUploader}
        {...uploadProps}
        {...(propsUploadProps || {})}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag image to this area to upload</p>
      </Dragger></Spin>
    </div>
  );
}


export default ImageUploader;