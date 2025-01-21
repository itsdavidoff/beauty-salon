import React, { useState } from "react";
import { API_BASE_URL } from '../../config';

function AddService() {
	const [formData, setFormData] = useState({
		serviceName: "",
		serviceDescription: "",
		servicePrice: "",
		serviceHour: "",
		serviceImage: null
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: files ? files[0] : value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess("");

		const { serviceName, serviceDescription, servicePrice, serviceHour, serviceImage } = formData;

		if (!serviceName || !serviceDescription || !servicePrice || !serviceHour || !serviceImage) {
			setError("All fields are required");
			setIsLoading(false);
			return;
		}

		try {
			const formDataToSend = new FormData();
			formDataToSend.append("serviceName", serviceName);
			formDataToSend.append("serviceDescription", serviceDescription);
			formDataToSend.append("servicePrice", servicePrice);
			formDataToSend.append("serviceHour", serviceHour);
			formDataToSend.append("serviceImage", serviceImage);

			const response = await fetch(`${API_BASE_URL}/service`, {
				method: "POST",
				body: formDataToSend,
			});

			if (response.ok) {
				setSuccess("Service added successfully!");
				setFormData({
					serviceName: "",
					serviceDescription: "",
					servicePrice: "",
					serviceHour: "",
					serviceImage: null
				});
				document.getElementById("serviceImage").value = "";
			} else {
				const data = await response.json();
				setError(data.error || "Failed to add service");
			}
		} catch (err) {
			setError("An error occurred while adding the service");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Add New Service</h2>
							{error && (
								<div className="alert alert-danger" role="alert">
									{error}
								</div>
							)}
							{success && (
								<div className="alert alert-success" role="alert">
									{success}
								</div>
							)}
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="serviceName" className="form-label">
										Service Name
									</label>
									<input
										type="text"
										className="form-control"
										id="serviceName"
										name="serviceName"
										value={formData.serviceName}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="serviceDescription" className="form-label">
										Description
									</label>
									<textarea
										className="form-control"
										id="serviceDescription"
										name="serviceDescription"
										value={formData.serviceDescription}
										onChange={handleChange}
										rows="3"
										required
									></textarea>
								</div>
								<div className="mb-3">
									<label htmlFor="servicePrice" className="form-label">
										Price
									</label>
									<input
										type="number"
										className="form-control"
										id="servicePrice"
										name="servicePrice"
										value={formData.servicePrice}
										onChange={handleChange}
										min="0"
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="serviceHour" className="form-label">
										Duration (hours)
									</label>
									<input
										type="number"
										className="form-control"
										id="serviceHour"
										name="serviceHour"
										value={formData.serviceHour}
										onChange={handleChange}
										min="0"
										step="0.5"
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="serviceImage" className="form-label">
										Service Image
									</label>
									<input
										type="file"
										className="form-control"
										id="serviceImage"
										name="serviceImage"
										onChange={handleChange}
										accept="image/*"
										required
									/>
								</div>
								<div className="text-center">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isLoading}
									>
										{isLoading ? "Adding..." : "Add Service"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddService;
