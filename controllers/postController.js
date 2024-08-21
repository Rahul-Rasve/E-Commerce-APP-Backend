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

module.exports = { createPostController };
