import React from 'react';
import './App.css';
import { store } from './store/reducer/store';

import { AppRoutes } from './routes/app.routes';
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <AppRoutes/>
        </Provider>
    )
}

export default App;
