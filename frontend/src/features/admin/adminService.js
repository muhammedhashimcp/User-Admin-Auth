import axios from "axios";

const API_URL = "/api/admin/";

// Create new user
const createUser = async (userData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, userData, config);
console.log(response.data);
	return response.data;
};

// Get all users details
const getAllUsers = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
    console.log("hello get all user data");
console.log(response.data);
	return response.data;

};

// Edit user data
const editUser = async (userData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, userData, config);

	return response.data;
};


// Delete user 
const deleteUser = async (userId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + userId, config);

	return response.data;
};


// Block/ unblock user
const blockUser = async (userId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL + userId, config);

	return response.data;
};

const adminService = {
	createUser,
	getAllUsers,
    editUser,
	deleteUser,
	blockUser,
};

export default adminService;
