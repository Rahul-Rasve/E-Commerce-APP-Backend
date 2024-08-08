const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/authProvider");
const JWT = require("jsonwebtoken");

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

		//hash the password
		const hashedPassword = await hashPassword(password);

		//save user to database
		const user = await userModel({
			name,
			email,
			password: hashedPassword,
		}).save();

		return res.status(201).send({
			success: true,
			message: "Registration successfull!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred in RegisterController",
			error,
		});
	}
};

const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		//validate data
		if (!email || !password) {
			return res.status(404).send({
				success: false,
				message: "Email and Password are required!",
			});
		}

		//serch user
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(500).send({
				success: false,
				message: "No user found with this email!",
			});
		}

		//decrypt password
		const matchPassword = await comparePassword(password, user.password);
		if (!matchPassword) {
			return res.status(500).send({
				success: false,
				message: "Invalid Password!",
			});
		}

		//create token
		const token = await JWT.sign({ _id: user._id }, "SDFSDLSDVSVSDVB23423K", {
			expiresIn: "7d",
		});

		//undefine password
		user.password = undefined;
		return res.status(200).send({
			success: true,
			message: "Login Successfull",
			token,
			user,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Some error occurred in LoginController",
			error,
		});
	}
};

module.exports = { registerController, loginController };
