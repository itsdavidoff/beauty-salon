import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/Autcontext";

function Header() {
	const { isAuthenticated, user, logout } = useAuthContext();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="container-fluid bg-white sticky-top">
			<div className="container">
				<nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
					<Link to="/" className="navbar-brand">
						<img
							className="img-fluid"
							src="img/logo.png"
							alt="Logo"
							style={{ maxHeight: "50px" }}
						/>
					</Link>
					<button
						type="button"
						className="navbar-toggler ms-auto me-0"
						data-bs-toggle="collapse"
						data-bs-target="#navbarCollapse"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav ms-auto">
							<Link to="/" className="nav-item nav-link">
								Home
							</Link>
							<Link to="/about" className="nav-item nav-link">
								About
							</Link>
							<Link to="/service" className="nav-item nav-link">
								Services
							</Link>
							<Link to="/product" className="nav-item nav-link">
								Products
							</Link>
							<Link to="/contact" className="nav-item nav-link">
								Contact
							</Link>
							{user?.role === 'admin' && (
								<Link to="/admin" className="nav-item nav-link">
									Admin Panel
								</Link>
							)}
							{!isAuthenticated ? (
								<>
									<Link to="/login" className="nav-item nav-link">
										Login
									</Link>
									<Link to="/register" className="nav-item nav-link">
										Register
									</Link>
								</>
							) : (
								<>
									<span className="nav-item nav-link">
										Welcome, {user?.fname || 'User'}
									</span>
									<Link to="/appointment" className="nav-item nav-link">
										My Appointments
									</Link>
									<button
										className="nav-item nav-link btn btn-link"
										onClick={handleLogout}
										style={{ 
											border: "none", 
											background: "none", 
											padding: "8px 15px",
											cursor: "pointer" 
										}}
									>
										Logout
									</button>
								</>
							)}
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Header;
