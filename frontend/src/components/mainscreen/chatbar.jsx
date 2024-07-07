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
                return otherUser ? {name: otherUser.name, pic: otherUser.pic} : null;
            })
            setChatUser(users);
        })

    },[])

    return(
        <>
            <div>
                <div className="w-[25rem] mt-3 bg-slate-300 p-2 rounded-lg h-[89.5vh]">
                    {chatUser.map((user, index) => (
                <div key={index} className="bg-white m-2 rounded-lg flex flex-row p-2">
                    <img src={user.pic} style={{ width: '50px', height: '50px' }} />
                    <p className="font-bold my-auto ml-4">{user.name}</p>
                </div>
            ))}
                </div>
            </div>
        </>
    );
}

export default ChatBar;