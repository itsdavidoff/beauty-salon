import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/Autcontext";
import { useCartContext } from "../context/cartcontext";

function Header() {
	const { token, userType, userName, logout } = useAuthContext();
	const { items } = useCartContext();

	return (
		<header>
			<div className="header-container">
				<div>
					<span className="logo">GLOW CITY</span>
				</div>
				<nav>
					<ul className="navigation">
						<li>
							<Link to="/" className="navigation-link">
								Home
							</Link>
						</li>

						<li>
							<Link to="/makeup" className="navigation-link">
								Service
							</Link>
						</li>

						<li>
							<Link to="/about" className="navigation-link">
								About
							</Link>
						</li>

						{!token && (
							<li>
								<Link to="/login" className="navigation-link join">
									Login
								</Link>
							</li>
						)}

						{token && userType === "user" && (
							<li>
								<Link className="navigation-link join" to="/cart">
									cart {items?.length ?? 0}
								</Link>
							</li>
						)}
						{token && userType === "user" && (
							<li>
								<Link
									className="navigation-link join"
									to="/customerappointment">
									appointment
								</Link>
							</li>
						)}
						{token && userType === "profesional" && (
							<li>
								<Link className="navigation-link join" to="/Professionalappoin">
									Dasheboard
								</Link>
							</li>
						)}
						{token && userType === "admin" && (
							<li>
								<Link className="navigation-link join" to="/admin">
									Dasheboard
								</Link>
							</li>
						)}

						{token && userType !== "admin" && (
							<>
								<li>
									<div class="dropdown">
										<button class="dropbtn">
											<p className="userProfile">Hello,{userName}</p>
											<p className="userProfile">Account &#9660;</p>
										</button>
										<div class="dropdown-content">
											<button onClick={logout}>sign out</button>
										</div>
									</div>
								</li>
							</>
						)}

						{token && userType === "admin" && (
							<>
								<li>
									<div class="dropdown">
										<button class="dropbtn">
											<p className="userProfile">Hello,Admin</p>
											<p className="userProfile">Account &#9660;</p>
										</button>
										<div class="dropdown-content">
											<button onClick={logout}>sign out</button>
										</div>
									</div>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
