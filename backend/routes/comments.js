const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware/authMiddleware");
const secretKey = "YourSecretKey";

const Comments = require("../models/commentsModel");
const Papers = require("../models/paperModel")
const axios = require("axios");

router.post("/add",withAuth, async (req, res) => {
  console.log("add api called!!");
    const {emailId, paperId, comment, category } = req.body;

    const categoryArray = category.split(" ");

    const newComment = await Comments.create({
      paperId: paperId,
      categories: categoryArray,
      emailId: emailId,
      comment: comment,
    });
    return res.status(200).json(newComment);
  
});


router.get("/get",withAuth, async (req, res) => {
    console.log("get api called!!");
    const token = req.cookies.token;
    var user;
          jwt.verify(token, secretKey, function (err, decoded) {
          if (err) {
              res.status(401).send("Unauthorized: Invalid token");
          } 
          else {
              console.log(decoded.user.emailId);
              user = decoded.user.emailId;
              console.log(user)
              
              // next();
          }
          });
    console.log("hiii")
  
    const { categories } = req.body;

    const categoryArray = categories.split(" ");
    console.log("hiii")
    var commentsList;
    
    Comments.find({ emailId: user, categories: { $in: categoryArray } })
    .then(comments => {
        commentsList = comments
      // If comments are found, you can retrieve their associated papers
      const paperIds = comments.map(comment => comment.paperId);
  
      // Search for the associated papers using the retrieved IDs
      return Papers.find({ id: { $in: paperIds } });
    })
    .then(papers => {
      // You now have the comments and associated papers
      return res.status(200).json({ commentsList, papers });
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    });
    
  });
  
module.exports = router;
