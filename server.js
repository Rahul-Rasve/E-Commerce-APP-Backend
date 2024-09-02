const express = require("express");
const cors = require("cors");
require("dotenv").config();
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//DOTEN Config
// dotenv.config();

//MONGODB Connection
connectDB();

//REST Object
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/post", require("./routes/postRoutes"));

//home
app.get("/", (req, res) => {
	res.status(200).send({
		success: true,
		message: "Node Server Running...",
	});
});

//PORT
const PORT = process.env.PORT || 8080;

//LISTENERS
app.listen(PORT, (req, res) => {
	console.log(`Server listening`.bgGreen.white);
});
