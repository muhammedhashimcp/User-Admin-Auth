
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
import { getAllUsers,reset} from "../features/admin/adminSlice";
import Spinner from "../components/Spinner";

// import { getAllUsers} from "../features/admin/adminSlice";

function AdminPanel() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const {users} = useSelector((state) => state.users);
	// const users = [];
	const { user } = useSelector((state) => state.auth);
	const { users, isLoading, isError, message } = useSelector((state) => state.users);
	console.log(users);

	useEffect(() => {
    console.log('admin panel use effect');
    // dispatch(getAllUsers());
		if (isError) {
			console.log(message);
			toast.error(message);
		}

		if (user.role==="admin") {
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
						{users.map((user) => (
							<TableRow key={user.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell align="right">{user._id}</TableCell>
								<TableCell component="th" scope="user">
									{user.name}
								</TableCell>
								<TableCell align="right">{user.email}</TableCell>
								<TableCell align="right">{user.role}</TableCell>

								<TableCell align="right">
									<Button variant="contained" color="success">
										Edit
									</Button>
								</TableCell>
								<TableCell align="right">
									<Button variant="contained" color="error">
										Delete
									</Button>
								</TableCell>
								<TableCell align="right">
								{
                  user.status?():()
                }
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
