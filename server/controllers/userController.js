const User = require("../models/userModel.js");
const Post = require("../models/postModel.js");

const addUser = async (req, res) => {
  const body = await req.body;
  try {
    await User.create({ ...body });
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  const { address, userId } = await req.body;
  try {
    let user;
    if (address) {
      user = await User.findOne({ address });
      res.status(200).json(user);
    } else if (userId) {
      user = await User.findById(userId);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const newChallenge = async (req, res) => {
  const { userId, challenge } = await req.body;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        currentChallenge: challenge,
      }
    );
    res.status(200).json({ message: "New challenge created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const newPost = async (req, res) => {
  const { post } = await req.body;
  try {
    await Post.create({ ...post });
    const user = await User.findById(post.userId);
    await User.findOneAndUpdate(
      { _id: post.userId },
      {
        points: user.points + post.points,
      }
    );
    res.status(200).json({ message: "New post added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCurrentChallenge = async (req, res) => {
  const { userId } = await req.body;
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ challenge: user.currentChallenge });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  const { postId, userId } = await req.body;
  try {
    const post = await Post.findOne({ _id: postId });
    if (userId in post.likes) {
      res.status(400).json({ message: "Already liked" });
    } else {
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          likes: [...post.likes, userId],
        }
      );
    }
    res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unlikePost = async (req, res) => {
  const { postId, userId } = await req.body;
  try {
    const post = await Post.findOne({ _id: postId });
    const likes = post.likes.filter((e) => e !== userId);
    await Post.findOneAndUpdate(
      { _id: postId },
      {
        likes: likes,
      }
    );
    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const approvePost = async (req, res) => {
  const { address, postId } = await req.body;
  try {
    if (address === process.env.ADMIN) {
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          isApproved: true,
        }
      );
      res.status(200).json({ message: "Post approved" });
    } else {
      res.status(400).json({ error: "Not authorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const declinePost = async (req, res) => {
  const { address, postId } = await req.body;
  try {
    if (address === process.env.ADMIN) {
      await Post.findOneAndDelete({ _id: postId });
      res.status(200).json({ message: "Post removed" });
    } else {
      res.status(400).json({ error: "Not authorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWinner = async (req, res) => {
  try {
    const user = await User.find().sort({ points: -1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const redeemPoints = async (req, res) => {
  const { userId } = await req.body;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        points: 0,
      }
    );
    res.status(200).json({ message: "Rewards redeemed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUnApprovedPosts = async (req, res) => {
  const { address } = await req.body;
  try {
    if (address === process.env.ADMIN) {
      const posts = await Post.find({ isApproved: false });
      res.status(200).json(posts);
    } else {
      res.status(400).json({ error: "Not Authorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  getUserDetails,
  newChallenge,
  newPost,
  getCurrentChallenge,
  likePost,
  unlikePost,
  approvePost,
  declinePost,
  getPosts,
  getUnApprovedPosts,
  getWinner,
  redeemPoints,
};
