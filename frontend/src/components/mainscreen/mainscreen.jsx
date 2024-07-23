import React, { useState } from "react";
import ChatBar from "./chatbar";
import Navbar from "./navBar";
import Chatscreen from "./chatscreen";
import { chatState } from "../context/chatProvider";

const MainScreen = () =>  {
    const [chatUser, setChatUser] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [currChat, setCurrChat] = useState();
    const { user } = chatState();
    console.log("user",user)
    return (
        <>
            <Navbar searchResult={searchResult} setSearchResult={setSearchResult} />
            <div className="flex">
                <ChatBar searchResult={searchResult} setSearchResult={setSearchResult} chatUser={chatUser} setChatUser={setChatUser} currChat={currChat} setCurrChat={setCurrChat} />
                <Chatscreen chatUser={chatUser} currChat={currChat} />
            </div>
        </>
    );
}

export default MainScreen;