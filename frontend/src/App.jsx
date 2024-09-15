import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/auth/signup";
import Login from "./components/auth/login";
import MainScreen from "./components/mainscreen/mainscreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return(
    <>
      <div className="h-full bg-slate-400">
          <BrowserRouter>
            <Routes>
              <Route exact path = "/" element={<SignUp />}/>
              <Route path = "/login" element={<Login />}/>
              <Route path = "/mainscreen" element={<MainScreen />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
      </div>
    </>
  )
}

export default App;