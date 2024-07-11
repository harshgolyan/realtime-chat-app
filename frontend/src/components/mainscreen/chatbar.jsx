import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatBar = ({ searchResult }) => {
  const [chatUser, setChatUser] = useState([]);
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    if (!searchResult || searchResult.length === 0) {
      axios.get("http://localhost:3000/fetchchat", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        const users = response.data.map(item => {
          const otherUser = item.users.find(user => user._id !== userId);
          return otherUser ? { name: otherUser.name, pic: otherUser.pic } : null;
        }).filter(Boolean);
        setChatUser(users);
      });
    }
  }, [searchResult, userId]);

  const usersToDisplay = (searchResult && searchResult.length > 0) ? searchResult : chatUser;

  return (
    <div>
      <div className="w-[25rem] mt-3 bg-slate-300 p-2 rounded-lg h-[89.5vh]">
        <div className="flex justify-between">
          <div className="p-2 font-bold text-[20px] mt-3">My Chats</div>
          <button className="p-3 m-3 border-3 rounded-md text-white bg-slate-600 font-semibold">Create Group Chat +</button>
        </div>
        {usersToDisplay.map((user, index) => (
          <div key={index} className="bg-white m-2 rounded-lg flex flex-row p-2">
            <img src={user.pic} style={{ width: '50px', height: '50px' }} />
            <p className="font-bold my-auto ml-4">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBar;
