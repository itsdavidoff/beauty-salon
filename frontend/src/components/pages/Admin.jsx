import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Autcontext";
import AddEmployee from "../admin/addEmployee";
import AddService from "../admin/addService";
import AddProduct from "../admin/addProduct";
import EditEmployee from "../admin/editEmployee";
import EditService from "../admin/editService";
import EditProduct from "../admin/editProduct";
import Order from "../admin/order";
import ViewAppointment from "../admin/viewAppointment";
import ManageEmployee from "../admin/manageEmployeeAndCustomer";
import ManageProduct from "../admin/manageServiceAndProduct";
import FeedBack from "../admin/viewFeedBack";

function Admin() {
	const navigate = useNavigate();
	const { token } = useAuthContext();
	const [isEmployee, setEmployee] = useState(true);
	const [isService, setService] = useState(false);
	const [isProduct, setProduct] = useState(false);
	const [isEditEmployee, setEditEmployee] = useState(false);
	const [isEditService, setEditService] = useState(false);
	const [isEditProduct, setEditProduct] = useState(false);
	const [isViewOrder, setViewOrder] = useState(false);
	const [isViewAppointment, setViewAppointment] = useState(false);
	const [isManageEmployee, setManageEmployee] = useState(false);
	const [isManageProduct, setManageProduct] = useState(false);
	const [isViewFeedBack, setViewFeedBack] = useState(false);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	const handleNavClick = (section) => {
		// Reset all states
		setEmployee(false);
		setService(false);
		setProduct(false);
		setEditEmployee(false);
		setEditService(false);
		setEditProduct(false);
		setViewOrder(false);
		setViewAppointment(false);
		setManageEmployee(false);
		setManageProduct(false);
		setViewFeedBack(false);

		// Set the clicked section to true
		switch(section) {
			case 'employee':
				setEmployee(true);
				break;
			case 'service':
				setService(true);
				break;
			case 'product':
				setProduct(true);
				break;
			case 'editEmployee':
				setEditEmployee(true);
				break;
			case 'editService':
				setEditService(true);
				break;
			case 'editProduct':
				setEditProduct(true);
				break;
			case 'viewOrder':
				setViewOrder(true);
				break;
			case 'viewAppointment':
				setViewAppointment(true);
				break;
			case 'manageEmployee':
				setManageEmployee(true);
				break;
			case 'manageProduct':
				setManageProduct(true);
				break;
			case 'viewFeedBack':
				setViewFeedBack(true);
				break;
			default:
				setEmployee(true);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<nav className="col-md-2 d-none d-md-block bg-light sidebar">
					<div className="sidebar-sticky">
						<ul className="nav flex-column">
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isEmployee ? 'active' : ''}`}
									onClick={() => handleNavClick('employee')}
								>
									Add Employee
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isService ? 'active' : ''}`}
									onClick={() => handleNavClick('service')}
								>
									Add Service
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isProduct ? 'active' : ''}`}
									onClick={() => handleNavClick('product')}
								>
									Add Product
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isEditEmployee ? 'active' : ''}`}
									onClick={() => handleNavClick('editEmployee')}
								>
									Edit Employee
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isEditService ? 'active' : ''}`}
									onClick={() => handleNavClick('editService')}
								>
									Edit Service
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isEditProduct ? 'active' : ''}`}
									onClick={() => handleNavClick('editProduct')}
								>
									Edit Product
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isViewOrder ? 'active' : ''}`}
									onClick={() => handleNavClick('viewOrder')}
								>
									View Orders
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isViewAppointment ? 'active' : ''}`}
									onClick={() => handleNavClick('viewAppointment')}
								>
									View Appointments
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isManageEmployee ? 'active' : ''}`}
									onClick={() => handleNavClick('manageEmployee')}
								>
									Manage Employees
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isManageProduct ? 'active' : ''}`}
									onClick={() => handleNavClick('manageProduct')}
								>
									Manage Products
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn btn-link ${isViewFeedBack ? 'active' : ''}`}
									onClick={() => handleNavClick('viewFeedBack')}
								>
									View Feedback
								</button>
							</li>
							<li className="nav-item">
								<button
									className="nav-link btn btn-link"
									onClick={handleLogout}
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</nav>

				<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
					<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
						<h1 className="h2">Admin Dashboard</h1>
					</div>

					{isEmployee && <AddEmployee />}
					{isService && <AddService />}
					{isProduct && <AddProduct />}
					{isEditEmployee && <EditEmployee />}
					{isEditService && <EditService />}
					{isEditProduct && <EditProduct />}
					{isViewOrder && <Order />}
					{isViewAppointment && <ViewAppointment />}
					{isManageEmployee && <ManageEmployee />}
					{isManageProduct && <ManageProduct />}
					{isViewFeedBack && <FeedBack />}
				</main>
			</div>
		</div>
	);
}

export default Admin;
