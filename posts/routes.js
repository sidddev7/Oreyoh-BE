import express from "express";
import { CreateNewPost, DeletePostById, GetAllPostWithFilter, GetPostByID, UpdatePostById } from "./controllers.js";
const PostRouter = express.Router();

// Create New Post
PostRouter.post('create',CreateNewPost);

// Update Post By ID
PostRouter.put('update/:id',UpdatePostById);

// Delete Post By ID
PostRouter.delete('delete/:id',DeletePostById);

// Get Post With Filter
PostRouter.get('all',GetAllPostWithFilter);

// Get Post By ID
PostRouter.get(':id',GetPostByID);

export default PostRouter;