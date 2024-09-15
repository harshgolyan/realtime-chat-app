import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar({ searchResult, setSearchResult }) {

  const navigate = useNavigate();
  const myProfile = localStorage.getItem("userName")

  const [search, setSearch] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      setSearchResult([]);
      return;
    }
    axios.get(`http://localhost:3000/alluser?search=${search}`, {
      headers: {
        "Authorization": localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setSearchResult(response.data);
      console.log(response.data);
    });
  };

  const options = [
    { value: 'profile', label: myProfile },
    { value: 'logout', label: 'Logout' }
  ];

  const handleDropdownSelect = (option) => {
    if (option.value === 'profile') {
      console.log('Navigate to profile');
    } else if (option.value === 'logout') {
      console.log('Handle logout');
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      localStorage.removeItem("userName")
      navigate("/login")
    }
  };

  return (
    <div className="bg-white p-3 flex justify-between">
      <div>
        <input
          className="border-2 border-slate-600 rounded-2xl px-2 w-[19rem]"
          type="text"
          placeholder="Search User ..."
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.trim() === '') {
              setSearchResult([]);
            }
          }}
        />
        <button className="px-2 ml-3 border-2 border-gray-500 rounded-2xl" onClick={searchHandler}>Search</button>
      </div>
      <div className='font-bold text-2xl'>
        Chatify
      </div>
      <div className="relative">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
          className="h-[35px] w-[35px] rounded-2xl cursor-pointer"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        />
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {options?.map(option => (
              <div
                key={option.value}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleDropdownSelect(option);
                  setDropdownVisible(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
