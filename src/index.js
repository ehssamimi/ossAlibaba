import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { config as AmapConfig } from "@amap/amap-react";
AmapConfig.key = "styles/afdd93fc70e330480ae6a54d3d8d4e79"
AmapConfig.key = "8faf092bfa96e5b6748ea7e0a2d6ac9c"
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
    <App />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
