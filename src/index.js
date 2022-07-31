import React from 'react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import axios from 'axios';

import ProviderWrapper from './features/ProviderWrapper';

axios.defaults.baseURL = 'https://localhost:44363/';
axios.defaults.headers = {"Access-Control-Allow-Origin": "*"};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ProviderWrapper>
      <App /> 
    </ProviderWrapper>
  </StrictMode>,
);


