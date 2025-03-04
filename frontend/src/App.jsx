import React, { useState, useEffect } from "react";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Appointment from "./components/pages/Appointment";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/pages/Cart";
import About from "./components/pages/About";
import Makeup from "./components/pages/Makeup";
import Professionalappoin from "./components/pages/Professionalappoin";
import EmailForResetPassword from "./components/pages/EmailForResetPassword";
import ResetPassword from "./components/pages/resetPassword";
import DetailProduct from "./components/pages/DetailProduct";
import { useAuthContext } from "./context/Autcontext";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/cartcontext";
import CustomerAppointment from "./components/CustomerAppointment";
import PayementForm from "./components/pages/PaymentForm";
import Rating from "./components/pages/profesionalRating";
import Confirmation from "./components/pages/confirmationForPayment";
import ConfirmationAppointment from "./components/pages/conifermationForAppointment";
import Cashier from "./components/pages/cashier";
import ErrorPage from "./components/pages/404";

function App() {
	const [serviceHour, setServiceHour] = useState("");
	const [servicePrice, setServicePrice] = useState("");
	const [serviceId, setServiceID] = useState("");
	const { token, userType } = useAuthContext();
	const [email, setEmail] = useState("");
	const [cart, setCart] = useState([]);
	const addtocart = (product) => {
		setCart(product);
	};

	useEffect(() => {
		if (token && userType) {
			console.log("User authenticated:", userType);
		}
		if (cart) {
			console.log("Cart items:", cart.length);
		}
	}, [token, userType, cart]);

	return (
		<Router>
			<UserProvider>
				<CartProvider>
					<Routes>
						<Route path="/" element={<Home />} />

						<Route
							path="/login"
							element={
								<Login />
							}
						/>
						<Route
							path="/professionalappoin"
							element={
								<Professionalappoin />
							}
						/>
						<Route
							path="/customerappointment"
							element={<CustomerAppointment />}
						/>
						<Route path="/paymentconfirmarion" element={<Confirmation />} />
						<Route
							path="/appointmentpaymentconfirmarion"
							element={<ConfirmationAppointment />}
						/>
						<Route path="/paymenform" element={<PayementForm />} />
						<Route path="/rating" element={<Rating />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/admin" element={<Admin />} />
						<Route
							path="/appointment"
							element={
								<Appointment
									serviceHour={serviceHour}
									serviceId={serviceId}
									servicePrice={servicePrice}
								/>
							}
						/>
						<Route path="/cart" element={<Cart />} />
						<Route path="/about" element={<About />} />

						<Route
							path="/resetemail"
							element={
								<EmailForResetPassword email={email} setEmail={setEmail} />
							}
						/>

						<Route
							path="/productdetails"
							element={<DetailProduct addtocart={addtocart} />}
						/>

						<Route
							path="/resetpassword/:expiration/:email"
							element={<ResetPassword email={email} />}
						/>
						<Route
							path="/makeup"
							element={
								<Makeup
									setServiceHour={setServiceHour}
									setServiceID={setServiceID}
									setServicePrice={setServicePrice}
								/>
							}
						/>

						<Route path="/cashier" element={<Cashier />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</CartProvider>
			</UserProvider>
		</Router>
	);
}

export default App;
