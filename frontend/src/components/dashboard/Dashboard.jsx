import React, { useState, useEffect } from 'react';
import './Dashboard.css'
import SearchResult from "./SearchResult";
import axios from 'axios';
import Bookmarks from '../bookmark/Bookmarks';

const Dashboard = () => {
    const [objs, setObjs] = useState([])
    const [searchInput, setSearchInput] = useState('');

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
        // const response = await fetch(`http://localhost:8080/search/${searchInput}`, {
        //     method: 'GET'
        // // })
        // const jsonObj = await response.json();
        // console.log(jsonObj)
        // if(response.ok){
        //     setObjs(jsonObj.papers)
        // }
        // else{
        //     setObjs('')
        // }

    }

    // useEffect(() => {
    //     const fetchPapers = async () => {
    //         const searchParam = 'graph';
    //         const response = await fetch(`http://localhost:8080/search/${searchParam}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-type': 'application/json',
    //             }
    //         })
        
    //         const jsonObj = await response.json();
 
    //         console.log(jsonObj);

    //         if(response.ok){
    //             setObjs(jsonObj.papers)
    //             // console.log(objs)
    //             // console.log(jsonObj)
    //         }
    //         else{
    //             return 
    //         }
    //     }
    //     fetchPapers()
    // }, [])
    return (<>
        <main>
             <form>
             <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch} type='button'>Search</button>
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