import React, { useState,useEffect } from 'react';
import './Dashboard.css'
import SearchResult from "./SearchResult";
import axios from 'axios';
import DataGraph from '../data-graph/DataGraph';

const Dashboard = () => {
    const [objs, setObjs] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [clickedObj, setClickedObj] = useState({})
    const [open, setOpen] = useState(false);

    useEffect(() => {
        var key = sessionStorage.getItem("searchKey");
        console.log({key:key})
        if(key && key.length>0){
          // setSearchInput(key);
          handleSearch();
        }
      }, [])

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
    var searchKey = "";
    var key = sessionStorage.getItem("searchKey");
    console.log({key: key});
    searchKey = key ? key : searchInput;
  
    setObjs('')
    console.log("hi")
    console.log("searched:" + searchKey);
    var baseURL = `http://localhost:8080/search/` + searchKey;
    axios.get(baseURL, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    }).
    then(response=>{
        console.log(response)
        setObjs(response.data.papers)

    }).catch(err=>console.log(err));
  }

    const handleCallback = (childData) => {
        // Update the name in the component's state
        // this.setState({ name: childData });
        console.log({data:childData})
        setClickedObj(childData);
        setOpen(true)
    };
    return (<div>
        <main>
        <div id='search-div-2'>

        <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="search-input-2"
              value={searchInput}
              placeholder='Search for papers'
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {/* <button type='submit'><img src="search.svg" alt="" /></button> */}
            <a><img className="bookmark_image" src="/icons/search.svg" alt="te" onClick={handleSearch} /></a>
          </form>
</div>

                <div className="papers">
                {Array.isArray(objs) ? (
                    objs.map((obj) => (
                        <SearchResult key={obj.id}  obj={obj} bookmarks={false} parentCallback={handleCallback}/>
                    ))
                ) : (
                    <p>No history available.</p>
                )}
                </div>
                {open ? <DataGraph currentItem = {clickedObj} closePopup={() => setOpen(false)} /> : null}
        </main> 
    </div>);
};

export default Dashboard;