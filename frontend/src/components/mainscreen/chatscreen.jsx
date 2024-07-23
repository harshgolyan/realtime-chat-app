import React, { useEffect } from 'react';
import axios from 'axios';

function Chatscreen({ chatUser, currChat }) {
  // console.log("chatuser", chatUser)
  // console.log("currChat", currChat.name)
  const chatId = localStorage.getItem("userId")

  useEffect(() => {
    axios.get(`http://localhost:3000/all-chat/${chatId}`, {
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt") 
      }
    })
    .then(response => {
      console.log(response)
    })
  },[currChat])

  return (
    <div className='w-[91.6%] bg-white mt-3 p-2 ml-3 rounded-lg'>
      {currChat && (
        <div className='w-[100%] bg-slate-500 h-10 rounded-lg text-white font-bold flex'>
          <img src={currChat.pic} style={{ width: '25px', height: '25px', borderRadius: '50%' }} className='my-auto ml-2' />
          <div className='ml-4 my-auto'>{currChat.name}</div>
        </div>
      )}
      
    </div>
  )
}

export default Chatscreen;
