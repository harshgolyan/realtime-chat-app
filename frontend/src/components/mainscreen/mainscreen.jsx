import React, { useState } from "react";
import ChatBar from "./chatbar";
import Navbar from "./navBar";
import { chatState } from "../context/chatProvider";

const MainScreen = () =>  {
    const [searchResult, setSearchResult] = useState([])
    const { user } = chatState();
    console.log("user",user)
    return (
        <>
            <Navbar searchResult={searchResult} setSearchResult={setSearchResult} />
            <ChatBar searchResult={searchResult} />
        </>
    );
}

export default MainScreen;