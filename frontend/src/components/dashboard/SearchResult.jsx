import React from "react"
import './SearchResult.css'
import axios from "axios";

const SearchResult = ({ obj,bookmarks }) => {

    const [newComment, setNewComment] = React.useState("")
    const [cardComments, setCardComments] = React.useState([]);
    const addComment=()=>{
        if (newComment) {
          console.log({paperObj:obj})
            axios.post("http://localhost:8080/comment/add",{
              'emailId':sessionStorage.getItem('userLoggedIn'),
              'paperId':obj.id,
              'comment':newComment,
              'category':obj.categories
            },{
              headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
          })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            setCardComments([...cardComments, newComment]);
            setNewComment('');
          }
      
        console.log(newComment)
    }
    const addBookMark = ()=>{
      axios.post("http://localhost:8080/bookmark/add",{
        'emailId':sessionStorage.getItem("userLoggedIn"),
        'paperId':obj.id
      }).then(res=>{alert("page Bookmarked!")})
      .catch(err=>{console.log(err)})
      console.log("Add Bookmark");
    }

    const removeBookMark=()=>{
      console.log(sessionStorage.getItem("userLoggedIn"),obj.id)
      axios.post("http://localhost:8080/bookmark/delete",{
        'emailId':sessionStorage.getItem("userLoggedIn"),
        'paperId':obj.id
      }).then(res=>{console.log(res)})
      .catch(err=>{console.log(err)})
      console.log("Delete Bookmark");
    }

    const clicked=()=>{
      console.log("clicked")
    }


    return(
        <div className="paper-detail" onClick={clicked}>
          <div className="title-parent"> 
           <h6>Title: {obj.title}</h6> &nbsp;
            {!bookmarks && <button type="button" onClick={addBookMark} className={"child-btn btn-dark"}>B</button>}
            {bookmarks && <button type="button" onClick={removeBookMark} className={"child-btn btn-light"}>B</button>}
            </div>
            <hr />
            <p><strong>Authors: </strong>{obj.authors}</p>
            <p><strong>DOI: </strong><a href={`https://www.doi.org/${obj.doi}`} target="_blank">{obj.doi}</a></p>
            <p><strong>Abstract:</strong>{obj.abstract}</p>
            <hr />
            <div className="comment-input">
                <textarea name="comment" id="comment" cols="20" rows="2" placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}></textarea>
          {/* <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          /> */}
          <button type="button" onClick={addComment}>Add</button>
          
        </div>
        <div className="comments">
          {cardComments.map((comment, index) => (
            <p className="single-comment" key={index}>{comment}</p>
          ))}
        </div>
        </div>
    )
}
export default SearchResult