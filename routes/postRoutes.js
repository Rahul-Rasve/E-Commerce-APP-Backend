const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
	createPostController,
	getAllPostsController,
	getUserPostsController,
	updatePostController,
	deletePostController,
} = require("../controllers/postController");

//router object
const router = express.Router();

//CREATE POST request
router.post("/create-post", requireSignIn, createPostController);

// GET ALL POSTS
router.get("/get-posts", getAllPostsController);

// GET ALL POSTS
router.get("/get-user-posts", requireSignIn, getUserPostsController);

//UPDATE POST
router.put("/update-post/:id", requireSignIn, updatePostController);

//DELETE POST
router.delete("/delete-post/:id", requireSignIn, deletePostController);

//export
module.exports = router;
