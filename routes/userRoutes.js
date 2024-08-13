const express = require("express");
const {
	registerController,
	loginController,
	updateUserController,
} = require("../controllers/userController");

//ROUTER Object
const router = express.Router();

/*ROUTES*/
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/update-user", updateUserController);

//EXPORT ROUTER
module.exports = router;
