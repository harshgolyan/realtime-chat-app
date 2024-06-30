import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/auth/signup";
import Login from "./components/auth/login";

const App = () => {
  return(
    <>
      <div className="bg-[#eaa7f8] h-screen">
        <BrowserRouter>
          <Routes>
            <Route exact path = "/" element={<SignUp />}/>
            <Route path = "/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;