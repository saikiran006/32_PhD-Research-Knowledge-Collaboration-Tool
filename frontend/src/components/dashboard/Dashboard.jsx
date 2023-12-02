import React, { useState, useEffect } from 'react';
import './Dashboard.css'
import SearchResult from "./SearchResult";
import axios from 'axios';
import Bookmarks from '../bookmark/Bookmarks';
import DataGraph from '../data-graph/DataGraph';

const Dashboard = () => {
    const [objs, setObjs] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [clickedObj, setClickedObj] = useState({})
    const [open, setOpen] = useState(false);
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
    const getGraph=(event)=>{
        console.log(event)
    }
    const handleCallback = (childData) => {
        // Update the name in the component's state
        // this.setState({ name: childData });
        console.log({data:childData})
        setClickedObj(childData);
        setOpen(true)
    };
    return (<>
        <main>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="search_input"
              value={searchInput}
              placeholder='Search for papers'
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {/* <button type='submit'><img src="search.svg" alt="" /></button> */}
            <a><img className="bookmark_image" src="/icons/search.svg" alt="te" onClick={handleSearch} /></a>
          </form>


                <div className="papers">
                {Array.isArray(objs) ? (
                    objs.map((obj) => (
                        <SearchResult  obj={obj} bookmarks={false} parentCallback={handleCallback}/>
                    ))
                ) : (
                    <p>No history available.</p>
                )}
                </div>
                {/* <div>
                    {clickedObject && <DataGraph currentItem = {clickedObject}></DataGraph>}
                </div> */}
                {open ? <DataGraph currentItem = {clickedObj} closePopup={() => setOpen(false)} /> : null}
        </main> 
    </>);
};

export default Dashboard;