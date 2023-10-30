import React, { useState, useEffect } from 'react';
import './Bookmarks.css'
import SearchResult from '../dashboard/SearchResult';
import axios from 'axios';

const Bookmarks = () => {
    const [objs, setObjs] = useState([])
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        var emailId = sessionStorage.getItem("userLoggedIn")
        console.log(emailId)
        var baseURL = `http://localhost:8080/bookmark/get/${emailId}`;
        axios.get(baseURL).then(res => {
            console.log(res)
            setObjs(res.data)
        })

    }, [])
    const handleSearch = async () => {
        setObjs('')
        console.log("hi")
        // console.log("searched:" + searchInput);
        // var baseURL = `http://localhost:8080/search/` + searchInput;
        // axios.get(baseURL).
        // then(response=>{
        //     console.log(response)
        //     setObjs(response.data.papers)

        // }).catch(err=>console.log(err));
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
            <div className="papers">
                {Array.isArray(objs) ? (
                    objs.map((obj) => (
                        <SearchResult key={obj._id} obj={obj} bookmarks={true} />
                    ))
                ) : (
                    <p>No Bookmarks.</p>
                )}
            </div>
        </main>
    </>);
};

export default Bookmarks;