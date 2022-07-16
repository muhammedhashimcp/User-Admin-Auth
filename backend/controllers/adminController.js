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

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}
	await user.remove();
	res.status(200).json({ id: req.params.id });
});

const toggleUserStatus = asyncHandler(async (req, res) => {
	console.log(req.params.id);
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}
	User.findOneAndUpdate({ _id: req.params.id }, [{ $set: { status: { $eq: [false, "$status"] } } }]);
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getAllUsers,
	deleteUser,
	toggleUserStatus,
};
