const asyncHandler=require("express-async-handler")

//@dec Get goals
//@route GET/api/goals
//@access private

const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Get Goals" });
});

const setGoals = asyncHandler(async (req, res) => {
	console.log(req.body.text);
	if (!req.body.text) {
		res.status(400);
		throw new Error("please add a text field");
	}
	res.status(200).json({ message: "Set Goals" });
});

const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete Goal  ${req.params.id}` });
});

module.exports = { getGoals, setGoals, updateGoal, deleteGoal };
