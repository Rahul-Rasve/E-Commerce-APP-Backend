const userModel = require("../models/userModel");

const registerController = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		//validate data
		if (!name || !email || !password) {
			return res.status(404).send({
				success: false,
				message: "All fields are required!",
			});
		}

		//check for existing user
		const existingUser = await userModel.findOne({ email: email });

		if (existingUser) {
			return res.status(500).send({
				success: false,
				message: "User with this email already exists!",
			});
		}

		//save user to database
		const user = await userModel({ name, email, password }).save();

		return res.status(201).send({
			success: true,
			message: "Registration successfull!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred",
			error,
		});
	}
};

module.exports = { registerController };
