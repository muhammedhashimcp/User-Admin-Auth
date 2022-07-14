const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const getAllUsers = asyncHandler(async (req, res) => {
	
	const users = await User.find({ role: { $nin: ["admin"] } });
	if (users) {
		res.status(201).json(users);
		
	} else {
		res.status(400);
		throw new Error("users are not registered");
	}
});


const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//Check for user email
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credential");
	}
	res.json({ message: "Login user" });
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

module.exports = {
	getAllUsers,
	loginUser,
	getMe,
};
