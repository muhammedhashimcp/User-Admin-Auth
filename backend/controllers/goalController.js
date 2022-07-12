const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");



//@dec Get goals
//@route GET/api/goals
//@access private

const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({user:req.user.id});
	console.log(goals);

	res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
	console.log(req.body.text);
	if (!req.body.text) {
		res.status(400);
		throw new Error("please add a text field");
	}
	const goal = await Goal.create({
		text: req.body.text,
		user:req.user.id
	});

	res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}

	const user = await User.findById(req.user.id);
	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Make sure the logged in user matches the goal user
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Make sure the logged in user matches the goal user
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}
	
	await goal.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
