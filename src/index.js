import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import App from './components/App/App';
import { Provider } from 'react-redux';
import './index.scss';

if (module.hot) {
    module.hot.accept();
};

const app = (
    <Provider store={store}>
        <App></App>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));