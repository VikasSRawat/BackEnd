import express from 'express';
import { createPost, getAllPosts,getPostById, updatePost, deletePost, getPostByPage} from '../controllers/blog.controller.js';


const router = express.Router();

router.get("/posts",getAllPosts);

router.get("/postByPage",getPostByPage);

router.get("/post/:id",getPostById);

router.post("/addPost",createPost);

router.put("/posts/:id",updatePost);

router.delete("/posts/:id",deletePost);


export const blogRoutes = router;