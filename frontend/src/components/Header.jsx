import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};
	return (
		<header className="header">
			<div className="logo">
				<Link to="/">GoalSetter</Link>
			</div>
			<section className="form">
				<div className="form-group">
					<input
						type="text"
						className="form-control "
						id="search"
						name="search"
						// value={search}
						placeholder="Search Here"
						// onChange={onChange}
					/>
				</div>
			</section>
			<ul>
				{user ? (
					<>
						<li>
							<Link to="/profile">
								<FaUser />
								{user.name}
							</Link>
						</li>
						<li>
							<button className="btn" onClick={onLogout}>
								<FaSignInAlt />
								Logout
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">
								<FaSignInAlt />
								Login
							</Link>
						</li>

						<li>
							<Link to="/register">
								<FaUser />
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default Header;
