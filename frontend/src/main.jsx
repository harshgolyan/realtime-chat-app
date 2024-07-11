import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatProvider from './components/context/chatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
        <ChatProvider>   
            <App />
        </ChatProvider>

)
