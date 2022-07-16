import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
	users: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// // Create new User
// export const createUser = createAsyncThunk("admin/getallusers", async (userData, thunkAPI) => {
// 	try {
// 		const token = thunkAPI.getState().auth.user.token;
// 		return await adminService.createUser(UserData, token);
// 	} catch (error) {
// 		const message =
// 			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
// 		return thunkAPI.rejectWithValue(message);
// 	}
// });

// Get all users
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await adminService.getAllUsers(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await adminService.deleteUser(id, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Toggle user status 
export const toggleUserStatus = createAsyncThunk("admin/toggleUserStatus", async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		console.log("user token ;", token);
		return await adminService.toggleUserStatus(id, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const adminSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder

			.addCase(getAllUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users = action.payload;
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users = state.users.filter((user) => user._id !== action.payload.id);
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
