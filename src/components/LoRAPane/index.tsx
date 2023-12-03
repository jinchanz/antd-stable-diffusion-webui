import moment from 'moment';
import { useEffect, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Empty, Input, InputNumber, Space } from 'antd';

import styles from './index.module.scss';

export interface LoRAPaneProps {
  data: unknown[];
  value: unknown[];
  hideUploader?: boolean;
  onChange: (value: unknown[]) => void;
  onLoRAUploaded: (value: unknown[]) => void;
}


export const MAX_FILE_SIZE_LIMIT = 200 * 1024 * 1024;

function LoRACard({ data, checked: propsChecked, onChange }) {

  const [checked, setChecked] = useState(propsChecked);
  
  return <div className={styles.sdFileCardWrapper} onClick={() => {
    setChecked(!checked);
    onChange?.(!checked, data)
  }}>
    <div className={styles.sdFileCard}>
      <div className={styles.imgWrapper} >
        <img src={data.cover || 'https://i.ablula.tech/sd-online/assets/no-preview.png!xs'} alt={data.name} />
      </div>
      <div className={checked ? styles.checkedCard : styles.mask}>

      </div>
      { checked ? <div className={styles.checked}>
        <CheckOutlined style={{ color: 'white' }} />
      </div> : null }
      { checked ? <div className={styles.loraWeight} onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      } }>
        <Space><InputNumber defaultValue={data.loraWeight || 1} onChange={(value) => {
          data.loraWeight = value;
          onChange?.(true, {...data, loraWeight: value});
        }} step={0.01} min={0} max={1} /></Space>
      </div> : null }
    </div>
    <div className={styles.sdFileDescription}>
      <div className={styles.titleWrapper}>
          {data.name?.replace?.('.safetensors', '') || 'Untitled'}
      </div>
      <div className={styles.subTitleWrapper}>
        {/* <Avatar size={16} src={`/profile/avatar/${item.userId}`} /> */}
        <span className={styles.sdFileDescriptionTime}>
          modified {moment(data.updatedAt).fromNow()}
        </span>
      </div>
    </div>
  </div>;
}

function LoRAPane(props: LoRAPaneProps) {
  const { data: propsData, value, onChange } = props;

  const [data, setData] = useState<unknown[]>(propsData);
  const [checkedMap, setCheckedMap] = useState({});
  const [keyword, setKeyword] = useState('');


  useEffect(() => {
    if (keyword) {
      setData(propsData?.filter?.(item => item?.name?.includes(keyword)));
    } else {
      setData(propsData);
    }
    if (value) {
      const newMap = {};
      value.forEach(item => {
        newMap[item.path] = item;
      });
      setCheckedMap(newMap);
    }
  }, [keyword, propsData, value]);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    if (!keyword) {
      setData(propsData);
      return;
    }
    const _data = propsData?.filter(item => item?.name?.includes(keyword));
    setData(_data);
  }

  return (
    <div className={styles.loraPane}>
      <div className={styles.actionSection}>
        <Input.Search allowClear onChange={handleSearch} />
      </div>
      { data?.length ? <div className={styles.content}><div className={styles.loraGrid}>
        { data.map(item => {
          return <LoRACard
            key={`${item.path}`} 
            data={value.find(i => i.path === item.path) || item} 
            checked={value.find(i => i.path === item.path)} 
            onChange={(checkStatus, currentValue) => {
              if (checkStatus) {
                checkedMap[currentValue.path] = currentValue;
              } else {
                delete checkedMap[currentValue.path];
              }
              onChange?.(Object.values(checkedMap));
            }} 
          />
        })}
      </div></div>
      : <div className={styles.emptyWrapper}><Empty description={false} /></div>}
    </div>
  );
}

export default LoRAPane;
