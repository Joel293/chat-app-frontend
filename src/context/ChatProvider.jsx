import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext();

const ChatProvider = ({children}) => {

    const [alert, setAlert] = useState({});
    const [users, setUsers] = useState([]);
    const [last10Messages, setLast10Messages] = useState([]);
    const [message, setMessage] = useState({});

    return (    
        <ChatContext.Provider
            value={{
                alert,
                setAlert,
                setUsers,
                users,
                message,
                setMessage,
                last10Messages,
                setLast10Messages,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export  {
    ChatProvider
}

export default ChatContext;
