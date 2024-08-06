const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

//DOTEN Config
dotenv.config();

//REST Object
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.get("", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to full stack app by Rahul Rasve",
	});
});

//PORT
const PORT = process.env.PORT || 8080;

//LISTENERS
app.listen(PORT, (req, res) => {
	console.log(`Server listening on ${PORT}`.bgGreen.white);
});
