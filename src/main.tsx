import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import './global.css';

const theme = {
  token: {
    colorPrimary: '#026BFF',
  },
  components: {
    Select: {
      colorPrimary: '#fff',
      colorIconHover: '#fff',
      controlItemBgActive: '#eee',
      controlOutline: '#fff',
      colorText: 'rgba(0, 0, 0, 0.88)',
    },
  },
};

const basename = document.getElementsByTagName('base')[0]?.getAttribute('href') || '';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
