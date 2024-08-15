import React, { useState } from "react";
import ChatBar from "./chatbar";
import Navbar from "./navBar";
import Chatscreen from "./chatscreen";

const MainScreen = () =>  {
    const [chatUser, setChatUser] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [currChat, setCurrChat] = useState();
    const [chats, setChats] = useState([]);

    return (
        <>
            <Navbar searchResult={searchResult} setSearchResult={setSearchResult} />
            <div className="flex">
                <ChatBar searchResult={searchResult} setSearchResult={setSearchResult} chatUser={chatUser} setChatUser={setChatUser} setCurrChat={setCurrChat} setChats={setChats}/>
                <Chatscreen currChat={currChat} chats={chats}/>
            </div>
        </>
    );
}

export default MainScreen;