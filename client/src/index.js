import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DemoUpload from './components/demoupolad';
import Clog from './components/client_log';
import Creg from './components/client_reg';
import Navbare from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Caro from './components/caroluses';
import ProductsForm from './components/productform';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbare />
    <Caro />
    <ProductsForm />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
