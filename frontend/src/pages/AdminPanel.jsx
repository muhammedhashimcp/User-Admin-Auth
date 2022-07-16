import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUsers, deleteUser, reset, toggleUserStatus } from "../features/admin/adminSlice";
import Spinner from "../components/Spinner";

function AdminPanel() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { users, isLoading, isError, message } = useSelector((state) => state.users);
	console.log(users);

	useEffect(() => {
		console.log("admin panel use effect");
		if (isError) {
			console.log(message);
			toast.error(message);
		}

		if (user.role === "admin") {
			dispatch(getAllUsers());
		}

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	

	return (
		<div>
			AdminPanel
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">USER ID</TableCell>
							<TableCell align="center">NAME</TableCell>
							<TableCell align="center">EMAIL</TableCell>
							<TableCell align="center"> ROLE</TableCell>
							<TableCell align="center"> EDIT</TableCell>
							<TableCell align="center"> DELETE</TableCell>
							<TableCell align="center">STATUS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((userData) => (
							<TableRow key={userData.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell align="right">{userData._id}</TableCell>
								<TableCell component="th" scope="userData">
									{userData.name}
								</TableCell>
								<TableCell align="right">{userData.email}</TableCell>
								<TableCell align="right">{userData.role}</TableCell>

								<TableCell align="right">
									<Button variant="contained" color="success">
										Edit
									</Button>
								</TableCell>
								<TableCell align="right">
									<Button
										variant="contained"
										color="error"
										onClick={() => dispatch(deleteUser(userData._id))}
									>
										Delete
									</Button>
								</TableCell>
								<TableCell align="right">
									<Button
										onClick={() => dispatch(toggleUserStatus(userData._id))}
										variant="contained"
										color={userData.status ? "error" : "success"}
									>
										{userData.status ? "Unblock" : "Block"}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default AdminPanel;
