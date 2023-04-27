import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

// third party
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';

// project imports
//import * as serviceWorker from '../src/serviceWorker';
import App from './App'
import { store } from './app/store';
//import { store } from '../src/store';

// style + assets
//import config from './config';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
