import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Avatar, Breadcrumb, Button, ConfigProvider, Dropdown, Layout, Menu, Modal, Space, theme } from 'antd';
import DashboardMenu from './menu';
import { ZhIcon, EnIcon } from '@/components/Icon/locale'

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import customLocale from '@/locales';

import styles from './index.module.scss';
import { MenuOutlined } from '@ant-design/icons';


const me = INIT_STATE.me;

const { Header, Content, Footer } = Layout;

let modalRef;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [modal, contextHolder] = Modal.useModal();
  const [locale, setLocale] = useState('zhCN');
  const toggleLocale = () => {
    setLocale(locale === 'zhCN' ? 'enUS' : 'zhCN');
  };

  const localeData = {
    zhCN: {
     ...zhCN,
    },
    enUS: {
     ...enUS,
    },
  }[locale]

  console.log('localeData: ', localeData)
  return (
    <ConfigProvider
      locale={localeData}
      theme={{
        components: {
          Layout: {
            headerBg: 'white',
            bodyBg: 'white',
          }
        },
        // algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
        token: {
          // // Seed Token，影响范围大
          colorPrimary: '#8a5df6',
          // borderRadius: 2,

          // // 派生变量，影响范围小
          colorBgContainer: 'white',
        },
      }}
    ><Layout className="layout">
        {contextHolder}
        <Content style={{ height: '100vh', overflowY: 'scroll' }}>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;