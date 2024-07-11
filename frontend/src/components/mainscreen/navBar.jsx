import React, { useState } from 'react';
import axios from 'axios';

function Navbar({searchResult ,setSearchResult }) {
  const [search, setSearch] = useState('');

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

  return (
    <div className="bg-white p-3"> 
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
        <button className='px-2 ml-3 border-2 border-gray-500 rounded-2xl' onClick={searchHandler}>Search</button>
      </div>
    </div>
  );
}

export default Navbar;
