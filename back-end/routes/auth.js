const express = require('express');
const { registerUser, loginUser, logoutUser, getUserProfile, updatePassword, updateProfile } = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/profile').get(isAuthenticatedUser,getUserProfile);
router.route('/changepassword').post(isAuthenticatedUser,updatePassword);
router.route('/updateprofile').post(isAuthenticatedUser,updateProfile);


module.exports = router;