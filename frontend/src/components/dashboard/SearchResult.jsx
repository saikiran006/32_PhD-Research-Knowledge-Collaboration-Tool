import React, { useState,useEffect } from "react";
import './SearchResult.css'
import axios from "axios";

const SearchResult = ({ obj,bookmarks,parentCallback }) => {

    const [newComment, setNewComment] = React.useState("")
    const [cardComments, setCardComments] = React.useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

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

    const clicked=(event)=>{
      parentCallback(
        obj
    );
    event.preventDefault();
    }

    return (
      <div className="paper-detail" onClick={clicked}>
        <div className="title-parent">
          <h6 class="title">Title: {obj.title}</h6> &nbsp;
          {!bookmarks && (
            // <button
            //   type="button"
            //   onClick={addBookMark}
            //   className={"child-btn btn-dark"}
            // >
            //   B
            // </button>
            <img className="bookmark_image" src={isBookmarked ? "/icons/filled_bookmark.svg" : "/icons/hollow_bookmark.svg"} alt="bookmark" onClick={isBookmarked ? removeBookMark : addBookMark} />
            
          )}
          {bookmarks && (
            // <button
            //   type="button"
            //   onClick={removeBookMark}
            //   className={"child-btn btn-light"}
            // >
            //   B
            // </button>
            <img className="bookmark_image" src="/icons/filled_bookmark.svg" alt="bookmark" onClick={isBookmarked ?  addBookMark : removeBookMark } />
            
          )}
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

// import React from "react";
// import './SearchResult.css';
// import axios from "axios";

// const SearchResult = ({ obj, bookmarks }) => {
//   const [newComment, setNewComment] = React.useState("");
//   const [cardComments, setCardComments] = React.useState([]);

//   const addComment = () => {
//     if (newComment) {
//       console.log({ paperObj: obj });
//       axios
//         .post(
//           "http://localhost:8080/comment/add",
//           {
//             emailId: sessionStorage.getItem("userLoggedIn"),
//             paperId: obj.id,
//             comment: newComment,
//             category: obj.categories,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//           }
//         )
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
//       setCardComments([...cardComments, newComment]);
//       setNewComment('');
//     }

//     console.log(newComment);
//   };

//   const addBookMark = () => {
//     axios
//       .post("http://localhost:8080/bookmark/add", {
//         emailId: sessionStorage.getItem("userLoggedIn"),
//         paperId: obj.id,
//       })
//       .then((res) => {
//         alert("page Bookmarked!");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     console.log("Add Bookmark");
//   };

//   const removeBookMark = () => {
//     console.log(sessionStorage.getItem("userLoggedIn"), obj.id);
//     axios
//       .post("http://localhost:8080/bookmark/delete", {
//         emailId: sessionStorage.getItem("userLoggedIn"),
//         paperId: obj.id,
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     console.log("Delete Bookmark");
//   };

//   const clicked = () => {
//     console.log("clicked");
//   };

//   return (
//     <div className="paper-detail" onClick={clicked}>
//       <div className="title-parent">
//         <h6>Title: {obj.title}</h6> &nbsp;
//         {!bookmarks && (
//           <button
//             type="button"
//             onClick={addBookMark}
//             className={"child-btn btn-dark"}
//           >
//             B
//           </button>
//         )}
//         {bookmarks && (
//           <button
//             type="button"
//             onClick={removeBookMark}
//             className={"child-btn btn-light"}
//           >
//             B
//           </button>
//         )}
//       </div>
//       <hr />
//       <div className="author-doi-container">
//         <p className="authors">
//           <strong>Authors: </strong>
//           {obj.authors}
//         </p>
//         <p className="doi">
//           <strong>DOI: </strong>
//           <a href={`https://www.doi.org/${obj.doi}`} target="_blank">
//             {obj.doi}
//           </a>
//         </p>
//       </div>
//       <div className="abstract-container">
//         <p className="abstract">
//           <strong>Abstract:</strong>
//           {obj.abstract}
//         </p>
//         <div className="comments">
//           {cardComments.map((comment, index) => (
//             <p className="single-comment" key={index}>
//               {comment}
//             </p>
//           ))}
//         </div>
//       </div>
//       <hr />
//       <div className="comment-input">
//         <textarea
//           name="comment"
//           id="comment"
//           cols="20"
//           rows="2"
//           placeholder="Add a comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         ></textarea>
//         <button type="button" onClick={addComment}>
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;
