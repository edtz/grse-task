import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {UserPage} from './pages/users';
import {guid} from "./utils/helpers";
    
const clientID = guid();
ReactDOM.render(<UserPage client={clientID} />, document.getElementById('root'));
