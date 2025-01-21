import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Autcontext";
import { useCartContext } from "../../context/cartcontext";
import { API_BASE_URL } from '../../config';

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { setToken, setUserType } = useAuthContext();
	const { setCartLength } = useCartContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${API_BASE_URL}/login`, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			});

			const json = await response.json();

			if (response.ok) {
				localStorage.setItem("token", json.token);
				localStorage.setItem("userType", json.userType);
				localStorage.setItem("userid", json.id);
				localStorage.setItem("userName", json.fname);
				localStorage.setItem("userLName", json.lname);
				localStorage.setItem("email", json.email);
				localStorage.setItem("phone", json.phone);

				setToken(json.token);
				setUserType(json.userType);
				setCartLength(0);

				if (json.userType === "admin") {
					navigate("/admin");
				} else if (json.userType === "professional") {
					navigate("/professionalappoin");
				} else if (json.userType === "cashier") {
					navigate("/cashier");
				} else {
					navigate("/");
				}
			} else {
				setError(json.error);
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("An error occurred during login");
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Login</h2>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								{error && <div className="alert alert-danger">{error}</div>}
								<button type="submit" className="btn btn-primary w-100">
									Login
								</button>
								<div className="mt-3 text-center">
									<Link to="/resetemail">Forgot Password?</Link>
								</div>
								<div className="mt-2 text-center">
									Don't have an account? <Link to="/signup">Sign Up</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
