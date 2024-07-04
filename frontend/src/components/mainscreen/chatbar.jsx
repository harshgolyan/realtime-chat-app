import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatBar = () => {
    const [chatUser, setChatUser] = useState([])
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        axios.get("http://localhost:3000/fetchchat", {
            headers: {
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        })
        .then(response => {
            const users = response.data.map(item => {
                const otherUser = item.users.find(user => user._id !== userId);
                return otherUser ? otherUser.name : null;
            })
            setChatUser(users);
        })

    },[])

    return(
        <>
            <div>
                <div className="w-[25rem] mt-5 bg-slate-600 h-[100vh] rounded-lg">
                    {chatUser.map((user, index) => (
                        <div key={index} className="bg-slate-100 p-5 rounded-lg mt-2 m-2">{user}</div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ChatBar;