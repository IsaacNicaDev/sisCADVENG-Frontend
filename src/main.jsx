import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

// third party
import { BrowserRouter } from 'react-router-dom';

// project imports
import App from './App'


// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </React.StrictMode>
)
