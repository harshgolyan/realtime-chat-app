import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/auth/signup";
import Login from "./components/auth/login";
import MainScreen from "./components/mainscreen/mainscreen";

const App = () => {
  return(
    <>
      <div className="bg-[#eaa7f8] h-screen">
        <BrowserRouter>
          <Routes>
            <Route exact path = "/" element={<SignUp />}/>
            <Route path = "/login" element={<Login />}/>
            <Route path = "/mainscreen" element={<MainScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;