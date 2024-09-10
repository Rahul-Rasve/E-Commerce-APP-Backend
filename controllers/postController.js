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
		const page = parseInt(req.params.page) || 1;
		const limit = 15;
		const skip = (page - 1) * limit;

		let isLastPageFetched = false;

		const posts = await postModel
			.find()
			.skip(skip)
			.limit(limit)
			.populate("postedBy", "_id name")
			.sort({ updatedAt: -1 });

		if (posts.length < limit) {
			isLastPageFetched = true;
		}

		return res.status(200).send({
			success: true,
			message: "All posts fetched successfully",
			posts,
			isLastPageFetched,
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
		const page = parseInt(req.params.page) || 1;
		const limit = 15;
		const skip = (page - 1) * limit;

		let isLastPageFetched = false;

		const userPosts = await postModel
			.find({ postedBy: req.auth._id })
			.skip(skip)
			.limit(limit)
			.sort({ updatedAt: -1 });

		if (userPosts.length < limit) {
			isLastPageFetched = true;
		}

		return res.status(200).send({
			success: true,
			message: "User posts fetched successfully",
			userPosts,
			isLastPageFetched,
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
		const { title, description } = req.body;

		//find the post
		const post = await postModel.findById({ _id: req.params.id });

		const updatedPost = await postModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				title: title || post.title,
				description: description || post.description,
			},
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

const deletePostController = async (req, res) => {
	try {
		const { id } = req.params;

		//find the post
		const post = await postModel.findByIdAndDelete({ _id: id });

		return res.status(200).send({
			success: true,
			message: "Post deleted successfully",
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
