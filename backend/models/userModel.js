const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
		role: {
			type: String,
			ennum:["user","admin"],
			default:"user"

		},
	},
	{
		timestamps: true,
	}
);
 
userSchema.pre("save", async function (next) {
	console.log("adminnnnnnnnnnn");

	if (this.email == "admin123@gmail.com") {
		this.role = "admin";
		console.log("adminnnnnnnnnnn+++++++++++++++++++++");
	}
	next();
});

module.exports = mongoose.model("User", userSchema);
 