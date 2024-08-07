const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//DOTEN Config
dotenv.config();

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

//PORT
const PORT = process.env.PORT || 8080;

//LISTENERS
app.listen(PORT, (req, res) => {
	console.log(`Server listening on ${PORT}`.bgGreen.white);
});
