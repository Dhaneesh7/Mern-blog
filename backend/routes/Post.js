import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // public route: get all posts
  const posts = await Post.find();
  res.json(posts);
});

router.post("/", protect, async (req, res) => {
  // protected: create post
  const { title, content } = req.body;
  const post = new Post({ title, content, user: req.user.id });
  await post.save();
  res.status(201).json(post);
});

// other routes...

export default router;
