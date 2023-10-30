const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware/authMiddleware");
const usersBookmark = require("../models/usersBookmark");
const papers = require("../models/paperModel");

router.post("/add", async (req, res) => {

  const {emailId, paperId } = req.body;
  console.log(paperId);

  usersBookmark
    .findOne({ emailId: emailId })
    .then((foundUser) => {
      if (foundUser) {
        // User exists, append the paperId to their paperId array
        foundUser.paperId.push(paperId);
        return foundUser.save();
      } else {
        // User doesn't exist, create a new entry
        const newBookmark = new usersBookmark({
          emailId: emailId,
          paperId: [paperId],
        });
        return newBookmark.save();
      }
    })
    .then((savedUser) => {
      // Handle success
      console.log("User bookmarked paper:", savedUser);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });

  // console.log(newComment);

  return res.status(200).json({ msg: "bookmark added!" });
});

router.get("/get/:emailId", async (req, res) => {
  console.log("email:",req.params.emailId);
  usersBookmark
    .findOne({ emailId: req.params.emailId })
    .then((foundUser) => {
      console.log(foundUser);
      if (foundUser) {
        console.log("in if");
        // User exists, retrieve the paper details for bookmarked paperIds
        return papers.find({ id: { $in: foundUser.paperId } });
      } else {
        // User doesn't exist
        return [];
      }
    })
    .then((papersArray) => {
      console.log("in return ");
      // 'papers' will contain an array of paper details for the bookmarked paperIds
      console.log(papersArray);
      res.status(200).json(papersArray);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

router.post("/delete", async (req, res) => {
  console.log("delete api called!!");
  const {emailId, paperId } = req.body;
  console.log(emailId,paperId)
  usersBookmark.updateOne({ "emailId": emailId }, { $pull: { "paperId": paperId } })
  .then((result) => {
    console.log(result)
    if (result.modifiedCount > 0) {
      // The paperId was successfully removed from the user's bookmarks
      console.log(`Paper with ID ${paperId} was removed from bookmarks.`);
      res.status(200).json({ message: 'Paper removed from bookmarks' });
    } 
    else {
      // Handle the case where the paperId was not found in the user's bookmarks
      console.log(`Paper with ID ${paperId} was not found in the user's bookmarks.`);
      res.status(404).json({ message: 'Paper not found in bookmarks' });
    }
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  });
});

module.exports = router;
