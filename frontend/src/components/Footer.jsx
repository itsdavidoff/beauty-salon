import "../assets/styles/footer.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import React from "react";
import { Link } from "react-router-dom";

// import Flaticon from "flaticon-react";

function Footer() {
	return (
		<div className="footer-container">
			<div className="footer">
				<div className="mm">
					<h3 className="footer-h3">Follow us</h3>
					<h5></h5>
					<ul>
						<li>
							<a href="https://www.instagram.com/">
								<FaInstagram /> instagram
							</a>
						</li>
						<li>
							<a href="https://www.facebook.com/">
								<FaFacebook /> FaceBook
							</a>
						</li>
						<li>
							<a href="https://www.tiktok.com/">
								<FaTiktok /> TikTok
							</a>
						</li>
					</ul>
				</div>
				<div className="mm">
					<h3 className="footer-h3">Company</h3>
					<h5></h5>
					<ul>
						<li>
							<Link to="/services">Services</Link>
						</li>
						<li>
							<Link to="/product">Product</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
					</ul>
				</div>

				<div className="mm">
					<h3 className="footer-h3">Services</h3>
					<h5></h5>
					<ul>
						<li>
							<Link to="/makeup">Makeup</Link>
						</li>
						<li>
							<Link to="/hair">Hair Styling</Link>
						</li>
						<li>
							<Link to="/spa">Spa & Massage</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="footer-h3">Who We are?</h3>
					<h5></h5>
					<p>
						We use only high-quality hair products and employ the latest
						techniques to ensure that your hair stays healthy and vibrant
					</p>
				</div>
			</div>
			<div className="copyright-container">
				<p>
					Copyright &copy; <span className="year">2024</span> by GlowCity.All
					right reserved
				</p>
			</div>
		</div>
	);
}
export default Footer;
