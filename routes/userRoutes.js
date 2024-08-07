const express = require('express');
const { registerController } = require('../controllers/userController');

//ROUTER Object
const router = express.Router();

//ROUTES
router.post('/register', registerController)


//EXPORT ROUTER
module.exports = router;