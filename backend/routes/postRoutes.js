import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user.id,
      content: req.body.content,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", async (req, res) => {
  const posts = await Post.find()
  .populate("user", "name _id") 
  .populate("comments.user", "name _id")
  .sort({ createdAt: -1 });
res.json(posts);
});


router.put("/like/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(req.user.id);
    if (liked) {
      post.likes = post.likes.filter((uid) => uid.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/comment/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();
    const updated = await post.populate("comments.user", "name _id"); 
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    post.content = req.body.content || post.content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/user/:userId", async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
  .populate("user", "name _id") 
  .populate("comments.user", "name _id") 
  .sort({ createdAt: -1 });
res.json(posts);
});

export default router;
