import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Suras from './components/Suras';
import Setting from './components/Setting';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './redux/reducers';

const store = createStore(allReducers)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement

);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<Suras />} />
        <Route path='page/:pageNumber' element={<App />} />
        <Route path='setting' element={<Setting />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
