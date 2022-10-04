import React from 'react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import axios from 'axios';

axios.defaults.baseURL = 'https://magisterstrefaapi.azurewebsites.net/';
axios.defaults.headers = {"Access-Control-Allow-Origin": "*"};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
      <App /> 
  </StrictMode>,
);


