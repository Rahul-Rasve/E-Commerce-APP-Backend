const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please add a email"],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
			min: 6,
			max: 30,
		},
		role: {
			type: String,
			default: "user",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
