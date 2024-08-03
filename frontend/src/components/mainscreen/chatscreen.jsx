import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Chatscreen({ chatUser, currChat }) {
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currChat && currChat._id) {
      const chatId = currChat._id;
      axios.get(`http://localhost:3000/all-chat/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        console.log(response);
        response.data.messages.forEach(item => {
          console.log("item", item.content);
        });
      })
      .catch(error => {
        console.error("Error fetching chat messages:", error);
      });
    }
  }, [currChat]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newMessage.trim()) {
        axios.post("http://localhost:3000/send-message", {
            content:newMessage, chatId: currChat
          }, {
          headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
        })
        console.log(newMessage);
        setNewMessage("");
      }
    }
  }

  return (
    currChat ? (
      <div className='w-[91.6%] bg-white mt-3 p-2 ml-3 rounded-lg flex flex-col h-[88.5vh]'>
        <div className='w-[100%] bg-slate-500 h-10 rounded-lg text-white font-bold flex'>
          <img 
            src={currChat.pic} 
            style={{ width: '25px', height: '25px', borderRadius: '50%' }} 
            className='my-auto ml-2' 
            alt='profile-pic'
          />
          <div className='ml-4 my-auto'>{currChat.name}</div>
        </div>
        <div className='flex-grow overflow-auto'>
          {/* Chat messages will go here */}
        </div>
          <div className='mt-auto'>
            <input 
              type="text" 
              placeholder='Enter the message'
              className='border-2 border-black rounded-lg w-[100%] p-1 text-black'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
      </div>
    ) : (
      <div className='w-[91.6%] bg-white mt-3 p-2 ml-3 rounded-lg flex justify-center items-center h-[88.5vh]'>
        <p className='text-gray-500 font-bold text-[2.5rem]'>Start the chat</p>
      </div>
    )
  );
}

export default Chatscreen;
