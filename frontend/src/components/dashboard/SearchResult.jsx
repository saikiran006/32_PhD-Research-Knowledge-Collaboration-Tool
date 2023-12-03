import React, { useState,useEffect } from "react";
import './SearchResult.css'
import axios from "axios";

const SearchResult = ({ obj,bookmarks,parentCallback }) => {

    const [newComment, setNewComment] = React.useState("")
    const [cardComments, setCardComments] = React.useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [updatedComment, setUpdatedComment] = useState('');

    useEffect(() => {
      var comments = []
      var emailId = sessionStorage.getItem('userLoggedIn')
      // console.log(emailId)
      // console.log(obj.id);
      var baseURL = `http://localhost:8080/bookmark/get/${emailId}/${obj.id}`;
      axios.get(baseURL,  { givenId: obj.id }).then(res => {
          console.log(res.data);
          if(res.data.comments.length != 0){
            var ans = res.data.comments;
            console.log(ans);
            for (const comment of ans) {
              setCardComments(prevComments => [...prevComments, comment]);
            }
          }
        
         
      })

  }, [])

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
      }).then(res=>{})
      .catch(err=>{console.log(err)})
      console.log("Add Bookmark");
      setIsBookmarked(true);
    }

    const removeBookMark=()=>{
      console.log(sessionStorage.getItem("userLoggedIn"),obj.id)
      axios.post("http://localhost:8080/bookmark/delete",{
        'emailId':sessionStorage.getItem("userLoggedIn"),
        'paperId':obj.id
      }).then(res=>{console.log(res)})
      .catch(err=>{console.log(err)})
      console.log("Delete Bookmark");
      setIsBookmarked(false);
    }

    const showGraph = (event) => {
      parentCallback(
        obj
      );
      event.preventDefault();
    }

    const handleDeleteComment = async (index) => {
      // Get the comment to be deleted
    const deletedComment = cardComments[index];
    var emailId = sessionStorage.getItem('userLoggedIn')

    try {
      // Make a DELETE request to your API
      const response = await fetch('http://localhost:8080/comment/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // Add any additional headers you need, such as authentication headers
        },
        body: JSON.stringify({emailId: emailId , commentText: deletedComment }),
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        // Update the state with the modified array
        const updatedComments = [...cardComments];
        updatedComments.splice(index, 1)
        
        setCardComments(updatedComments);
      } 
      else {
        // Handle error cases, e.g., display an error message
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error:', error.message);
    }
    };

    const handleUpdateComment = async (index) => {
      const emailId = sessionStorage.getItem('userLoggedIn');
      const commentText = cardComments[index];
  
      try {
        const response = await fetch('http://localhost:8080/comment/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailId: emailId,
            commentText: commentText,
            updatedCommentText: updatedComment,
          }),
        });
  
        if (response.ok) {
          console.log("updated");
          // Optionally, you can update the local state with the updated comment
          const updatedComments = [...cardComments];
          updatedComments[index] = updatedComment;
          setCardComments(updatedComments);
          // Clear the input field after update
          setUpdatedComment('');
        } else {
          console.error('Failed to update comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    return (
      <div className="paper-detail">
        <div className="title-parent">
          <h6 class="title">Title: {obj.title}</h6> &nbsp;
          <div class="image-container">
        <img  src="/icons/network1.png" className="graph_image" alt="graph" onClick={showGraph} />

        {!bookmarks && (
          <img className="bookmark_image" src={isBookmarked ? "/icons/filled_bookmark.svg" : "/icons/hollow_bookmark.svg"} alt="bookmark" onClick={isBookmarked ? removeBookMark : addBookMark} />

        )}
        {bookmarks && (
          <img className="bookmark_image" src="/icons/filled_bookmark.svg" alt="bookmark" onClick={isBookmarked ? addBookMark : removeBookMark} />

        )}
        </div>
        </div>
        <hr />
        <div className="author-doi-container">
          <p className="authors">
            <strong>Authors: </strong>
            {obj.authors}
          </p>
          <p className="doi">
            <strong>DOI: </strong>
            <a href={`https://www.doi.org/${obj.doi}`} target="_blank">
              {obj.doi}
            </a>
          </p>
        </div>
        <div className="abstract-container"  style={bookmarks ? { height: '300px' } : { height: '400px' }}>
          <p className="abstract">
            <strong>Abstract:</strong>
            {obj.abstract}
          </p>
          <hr />
          <div className="comments">
            {/* <p>Comments :</p> */}
            {cardComments.map((comment, index) => (
              <p className="single-comment" key={index}>
                <li>{comment}</li>
                <img
                  src="delete.png" // Replace with the path to your delete icon image
                  alt="Delete"
                  onClick={() => handleDeleteComment(index)}
                  className="delete-icon"
                />      
                 <input
                  type="text"
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                  placeholder="New Comment"
                />
                <button onClick={() => handleUpdateComment(index)}>Update</button>        
          </p>
            ))}
          </div>
        </div>
        {/* abstract container ended */}
        {/* <hr /> */}

        <div className="comment-input">
          <textarea
            name="comment"
            id="comment"
            cols="20"
            rows="2"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="button" onClick={addComment}>
            Add
          </button>
        </div>
      </div>
    );
}
export default SearchResult

