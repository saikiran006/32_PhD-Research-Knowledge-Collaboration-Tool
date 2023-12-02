import React, { useState, useEffect } from 'react';
import './Dashboard.css'
import SearchResult from "./SearchResult";
import axios from 'axios';
import Bookmarks from '../bookmark/Bookmarks';

const Dashboard = () => {
    const [objs, setObjs] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault(); 
        handleSearch();
      };
      
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); 
          handleSearch(); 
        }
      };
    const handleSearch = async () => {
        setObjs('')
        console.log("hi")
        console.log("searched:" + searchInput);
        var baseURL = `http://localhost:8080/search/` + searchInput;
        axios.get(baseURL, {
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
        }).
        then(response=>{
            console.log(response)
            setObjs(response.data.papers)

        }).catch(err=>console.log(err));
        return false


    }
    return (<>
        <main>
        <form onSubmit={handleSubmit}>
  <input
    type="text"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onKeyDown={handleKeyPress}
  />
  <button type='submit'>Search</button>
</form>


                <div className="papers">
                {Array.isArray(objs) ? (
                    objs.map((obj) => (
                        <SearchResult key={obj._id} obj={obj} bookmarks={false}/>
                    ))
                ) : (
                    <p>No history available.</p>
                )}
                </div>
        </main> 
    </>);
};

export default Dashboard;