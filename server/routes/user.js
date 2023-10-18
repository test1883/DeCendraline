const user = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/add", user.addUser);

router.post("/new-challenge", user.newChallenge);

router.post("/new-post", user.newPost);

router.post("/user-details", user.getUserDetails);

router.post("/get-challenge", user.getCurrentChallenge);

router.post("/like", user.likePost);

router.post("/unlike", user.unlikePost);

router.post("/approve", user.approvePost);

router.post("/decline", user.declinePost);

router.get("/get-posts", user.getPosts);

router.post("/get-unapproved-posts", user.getUnApprovedPosts);

module.exports = router;
