import React, {createContext, useContext, useEffect, useState } from 'react';


const chatContext = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        setUser(userId)
    },[])

    return <chatContext.Provider value={{user, setUser}}>{children}</chatContext.Provider>
}

export const chatState = () => {
    return useContext(chatContext);

}

export default ChatProvider;
