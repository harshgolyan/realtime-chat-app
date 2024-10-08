import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ChatBar = ({ searchResult, setSearchResult, chatUser, setChatUser, setCurrChat, setChats}) => {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!searchResult || searchResult.length === 0) {
      axios.get("https://chatify-1cxv.onrender.com/fetchchat", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        const combinedData = response?.data?.map(item => {
          const otherUser = item.users.find(user => user._id !== userId);
          if (otherUser) {
            return { chatId: item._id, name: otherUser.name, pic: otherUser.pic, userId: otherUser._id };
          } else {
            return null;
          }
        }).filter(user => user !== null);
  
        if (combinedData) {
          setChatUser(combinedData);
        }
      })
      .catch(error => {
        console.error("Error fetching chat data:", error);
      });
    }
  }, [searchResult, userId, setChatUser]);

  const usersToDisplay = (searchResult && searchResult.length > 0) ? searchResult : chatUser;

  const createChatHandler = (user) => {
    const id = user.userId || user._id
    axios.post("https://chatify-1cxv.onrender.com/createchat", {
        userId: id
    }, {
        headers: {
            "Authorization": localStorage.getItem("jwt"),
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        setChats(user.chatId)
        setCurrChat(user)
        setSearchResult([]);
    })
    .catch(error => {
        console.error("There was an error creating the chat!", error);
    });
  };

  const notify = () => {
    toast("group button")
  }

  return (
    <div>
      <div className="w-[25rem] mt-3 bg-slate-200 p-2 rounded-lg m-2 h-[88.5vh]">
        <div className="flex justify-between">
          <div className="p-2 font-bold text-[20px] mt-3">My Chats</div>
          <button className="p-3 m-3 border-3 rounded-md text-white bg-slate-600 font-semibold" onClick={notify}>Create Group Chat +</button>
        </div>
        {usersToDisplay && usersToDisplay.map((user, index) => {
          return (
            <div key={index} className="bg-white m-2 rounded-lg flex flex-row p-2 cursor-pointer border-2 border-slate-400" onClick={() => createChatHandler(user)}>
              <img src={user.pic} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <p className="font-bold my-auto ml-4">{user.name}</p>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default ChatBar;
