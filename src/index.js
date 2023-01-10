import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"
import {store} from './redux/store';
import { useSelector } from 'react-redux';
import { StreamChat } from "stream-chat"
import { Chat } from "stream-chat-react"


const STREAM_KEY= "2td7qmsrgf92"
  
const client= StreamChat.getInstance(STREAM_KEY)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Chat client={client} >
        <App />
    </Chat>
</Provider>
);

