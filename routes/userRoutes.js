const express = require("express");
const {
	registerController,
	loginController,
} = require("../controllers/userController");

//ROUTER Object
const router = express.Router();

/*ROUTES*/
router.post("/register", registerController);
router.post("/login", loginController);

//EXPORT ROUTER
module.exports = router;
