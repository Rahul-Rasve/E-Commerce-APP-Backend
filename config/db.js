const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://admin:abcd1234@cluster0.l4r3w.mongodb.net/react-native-app`);
		console.log(
			`Database Connection established: ${mongoose.connection.host}`.bgCyan
				.white
		);
	} catch (error) {
		console.error(`ERROR: ${error}`.bgRed.white);
	}
};

module.exports = connectDB;
