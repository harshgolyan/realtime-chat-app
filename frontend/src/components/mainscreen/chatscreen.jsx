import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { chatState } from '../context/chatProvider';

function Chatscreen({ currChat, chats }) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const socket = useRef();
  const { user } = chatState();

  const ENDPOINT = "http://localhost:3000";

  useEffect(() => {
    if (user) {
      socket.current = io(ENDPOINT);
      socket.current.emit("setup", user);
      socket.current.on("connected", () => setSocketConnected(true));
      
      socket.current.on("message received", (newMessageReceived) => {
        if (newMessageReceived.chat._id === chats) {
          setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        }
      });
    }

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [user, chats]);

  useEffect(() => {
    if (chats && user) {
      const chatId = chats;
      axios.get(`http://localhost:3000/all-chat/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        setMessages(response.data.messages);
        socket.current.emit("join chat", chatId);  // Emit to join chat room
      })
      .catch(error => {
        console.error("Error fetching chat messages:", error.message);
      });
    }
  }, [chats, user]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      e.preventDefault();
      axios.post("http://localhost:3000/send-message", {
        content: newMessage, chatId: chats
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        setNewMessage("");
        socket.current.emit("new message", response.data.message);
        setMessages([...messages, response.data.message]);
      })
      .catch(error => {
        console.error("Error sending message:", error);
      });
    }
  };

  return (
    currChat && chats ? (
      <div className='w-[91.6%] bg-white mt-3 p-2 rounded-lg flex flex-col h-[88.5vh] m-2'>
        <div className='w-[100%] bg-slate-500 h-10 rounded-lg text-white font-bold flex'>
          <img 
            src={currChat.pic} 
            style={{ width: '25px', height: '25px', borderRadius: '50%' }} 
            className='my-auto ml-2' 
            alt='profile-pic'
          />
          <div className='ml-4 my-auto'>{currChat.name}</div>
        </div>
        <div className='flex flex-col overflow-y-auto max-h-[75vh]'>
        {messages && messages.map((message, idx) => (
            <div 
              key={idx} 
              className={`flex ${message.sender && message.sender._id !== currChat.userId ? 'justify-end' : 'justify-start'}`}
            >
              <span 
                className={`px-3 py-2 m-1 max-w-[60%] break-words rounded-lg opacity-100 ${
                  message.sender && message.sender._id !== currChat.userId ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                }`}
              > 
                {message.content}
              </span>
            </div>
          ))}
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
      <div className='w-[91.6%] bg-slate-200 mt-3 p-2 ml-2 mr-2 rounded-lg flex justify-center items-center h-[88.5vh]'>
        <p className='text-gray-500 font-bold text-[2.5rem]'>Start the chat</p>
      </div>
    )
  );
}

export default Chatscreen;
