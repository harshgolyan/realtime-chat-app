import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MessageCircleMore } from 'lucide-react';



const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('https://chatify-1cxv.onrender.com/signup', {
        name,
        email,
        password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.data.msg === 'new user added successfully') {
            response.data.msg ? toast.success(response.data.msg) : ""
            navigate('/login');
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
        toast.error(error.response.data.error)
    });
};
3   

    return(
        <>
            <form onSubmit={onSubmitHandler}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="h-[25rem] w-[40rem] rounded-lg flex">
                        <div className="bg-slate-500 flex-col rounded-l-lg w-[50%] flex justify-center items-center">
                            <MessageCircleMore size={250} color="white"/>
                        </div>
                        <div className="bg-white flex-col rounded-r-lg w-[50%]">
                            <div className="font-extrabold ml-[30%] text-[2rem]">Sign Up</div>
                            <div className="mx-3 flex flex-col mt-4">
                                <label className="pl-1 font-semibold" htmlFor="name">Name</label>
                                <input className="border-2 rounded-md border-black pl-2" type="text" placeholder="enter your name..." onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="mx-3 flex flex-col mt-4">
                                <label className="pl-1 font-semibold" htmlFor="name">Email</label>
                                <input className="border-2 rounded-md border-black pl-2" type="email" placeholder="enter your email..." onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mx-3 flex flex-col mt-4">
                                <label className="pl-1 font-semibold" htmlFor="name">Password</label>
                                <input className="border-2 rounded-md border-black pl-2" type="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="mx-3 mt-4 text-blue-700 underline ml-[7.5rem]"><a href="/login">Already have an account ?</a></div>
                            <div className="mx-3 mt-8">
                                <button className="bg-slate-700 w-[100%] rounded-md p-2 text-white font-bold text-[1rem]">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUp;