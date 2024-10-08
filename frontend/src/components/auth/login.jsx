import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageCircleMore } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("https://chatify-1cxv.onrender.com/login", {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
        if (response.data.msg === 'user login successfully') {
            localStorage.setItem('jwt',response.data.token)
            localStorage.setItem('userId',response.data.uid)
            localStorage.setItem("userName",response.data.name)
            response.data.msg ? toast.success(response.data.msg) : ""
            navigate('/mainscreen');
        }
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast.error(error.response.data.error)
        });
    }

    return(
        <>
            <form onSubmit={onSubmitHandler}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="h-[25rem] w-[40rem] rounded-lg flex">
                        <div className="bg-slate-500 flex-col rounded-l-lg w-[50%] flex justify-center items-center">
                        <MessageCircleMore size={250} color="white"/>
                        </div>
                        <div className="bg-white flex-col rounded-r-lg w-[50%]">
                            <div className="font-extrabold ml-[30%] text-[2rem]">Log In</div>
                            <div className="mx-3 flex flex-col mt-6">
                                <label className="pl-1 font-semibold" htmlFor="name">Email</label>
                                <input className="border-2 rounded-md border-black pl-2" type="email" placeholder="enter your email..." onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mx-3 flex flex-col mt-6">
                                <label className="pl-1 font-semibold" htmlFor="name">Password</label>
                                <input className="border-2 rounded-md border-black pl-2" type="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="mx-3 mt-6 text-blue-700 underline ml-[10.5rem]"><a href="/">Create an Account !</a></div>
                            <div className="mx-3 mt-[3rem]">
                                <input className="" type="checkbox" />
                                <label className="ml-1 font-medium" htmlFor="checkbox">I accept all terms & conditions.</label>
                            </div>
                            <div className="mx-3">
                                <button className="bg-slate-700 mt-2 w-[100%] rounded-md p-2 text-white font-bold text-[1rem]">Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;