const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
	try {
		const { title, description } = req.body;

		if (!title || !description) {
			return res.status(500).send({
				success: false,
				message: "Please provide all details",
			});
		}

		const post = await postModel({
			title,
			description,
			postedBy: req.auth._id,
		}).save();

		return res.status(200).send({
			success: true,
			message: "Post created successfully",
			post,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred in CreatePostController",
			error,
		});
	}
};

const getAllPostsController = async (req, res) => {
	try {
		const posts = await postModel
			.find()
			.populate("postedBy", "_id name")
			.sort({ createdAt: -1 });

		return res.status(200).send({
			success: true,
			message: "All posts fetched successfully",
			posts,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred in GetAllPostsController",
			error,
		});
	}
};

const getUserPostsController = async (req, res) => {
	try {
		const userPosts = await postModel
			.find({ postedBy: req.auth._id })
			.sort({ updatedAt: -1 });

		return res.status(200).send({
			success: true,
			message: "User posts fetched successfully",
			userPosts,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred in GetUserPostsController",
			error,
		});
	}
};

const updatePostController = async (req, res) => {
	try {
		const { _id, title, description } = req.body;

		//find the post
		const post = await postModel.findOne({ _id: _id });

		const updatedPost = await postModel.findOneAndUpdate(
			{ _id: _id },
			{ title: title || post.title, description: description || post.description },
			{ new: true }
		);

		return res.status(200).send({
			success: true,
			message: "Post updated successfully",
			updatedPost,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred in UpdatePostController",
			error,
		});
	}
};

//TODO: not working!
const deletePostController = async (req, res) => {
	try {
		const { _id } = req.body;

		//find the post
		const post = await postModel.findOneAndDelete({ _id: _id });

		return res.status(200).send({
			success: true,
			message: "Post deleted successfully",
			updatedPost,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred in DeletePostController",
			error,
		});
	}
};

module.exports = {
	createPostController,
	getAllPostsController,
	getUserPostsController,
	updatePostController,
	deletePostController,
};
