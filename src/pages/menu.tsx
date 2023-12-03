import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Button, Menu, Modal } from 'antd';

import customLocale from '@/locales';

import styles from './index.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  disabled?: boolean,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled
  } as MenuItem;
}

const items = (locale: string) : MenuItem[] => {

  return [
    getItem(customLocale[locale || 'zhCN']['Home'], ''),
    getItem(customLocale[locale || 'zhCN']['Design'], 'design'),
    // getItem(customLocale[locale || 'zhCN']['DigitalTwin'], 'digital-twin', false),
    getItem(customLocale[locale || 'zhCN']['Train'], 'train', false),
    getItem(customLocale[locale || 'zhCN']['ToolBox'], 'toolbox', false, '', [
      getItem(customLocale[locale || 'zhCN']['Resample'], 'tool-resample', false),
      getItem(customLocale[locale || 'zhCN']['Rembg'], 'tool-rembg', false),
    ]),
    getItem(customLocale[locale || 'zhCN']['Contact'], 'contact', false),
  ];
};

function DashboardMenu( props: any) {
  const { locale, mode } = props || {};
  const [key, setKey] = useState(window.location.pathname.split('/')[1]);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonInfo, setComingSoonInfo] = useState({});
  const [showContactInfo, setShowContactInfo] = useState(false);
  const negative = useNavigate();
  const onSelect = ({ key }) => {
    setShowComingSoon(false);
    setShowContactInfo(false);
    if (key === 'train') {
      setShowComingSoon(true);
      setComingSoonInfo({
        title: customLocale[locale || 'zhCN']['Train'],
        content: customLocale[locale || 'zhCN']['ComingSoon'],
      })
    } else if (key === 'contact') {
      setShowContactInfo(true);
    } else {
      negative(key);
      setKey(key);
    }

  };
  useEffect(() => {
    const key = window.location.pathname.split('/')[1];
    setKey(key);
  }, [key])
  return (
    <div className={styles.dashboardMenu}>
      <Menu
        style={{ borderInlineEnd: 'none' }}
        onSelect={onSelect}
        theme="light"
        mode={mode}
        defaultSelectedKeys={['']}
        selectedKeys={[key]}
        items={items(locale)}
      />
      <Modal title={
        <h1>{comingSoonInfo?.title}</h1>
      } footer={false} centered open={showComingSoon} onCancel={setShowComingSoon.bind(null, false)}>
        <span>{customLocale[locale || 'zhCN']['ComingSoon']}</span>
      </Modal>
      <Modal footer={false} title={
        <h1>{customLocale[locale || 'zhCN']['Contact']}</h1>
      } centered open={showContactInfo} onCancel={setShowContactInfo.bind(null, false)}>
        <div>
          <div className={styles.contactSection} style={{ display: 'flex', flexDirection: 'column', fontSize: 20, fontWeight: 400 }}>
            <span className={styles.contactLabel}>
              {customLocale[locale || 'zhCN']['Email']} 
            </span>
            <span className={styles.contactContent}>
              june@junemark.tech
            </span>
            <span className={styles.contactContent}>
              mark@junemark.tech
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DashboardMenu;
