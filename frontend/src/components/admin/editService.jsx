import React, { useState, useEffect } from "react";
import { useServiceProdctContext } from "../../context/productAndServicecomtext";
import { API_BASE_URL } from '../../config';

function EditService() {
	const { service } = useServiceProdctContext();
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

	useEffect(() => {
		if (service) {
			setFormData({
				serviceName: service.serviceName || "",
				serviceDescription: service.serviceDescription || "",
				servicePrice: service.servicePrice || "",
				serviceHour: service.serviceHour || "",
				serviceImage: null
			});
		}
	}, [service]);

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

		if (!serviceName || !serviceDescription || !servicePrice || !serviceHour) {
			setError("All fields except image are required");
			setIsLoading(false);
			return;
		}

		try {
			const formDataToSend = new FormData();
			formDataToSend.append("serviceName", serviceName);
			formDataToSend.append("serviceDescription", serviceDescription);
			formDataToSend.append("servicePrice", servicePrice);
			formDataToSend.append("serviceHour", serviceHour);
			if (serviceImage) {
				formDataToSend.append("serviceImage", serviceImage);
			}

			const response = await fetch(`${API_BASE_URL}/service/${service.id}`, {
				method: "PUT",
				body: formDataToSend,
			});

			if (response.ok) {
				setSuccess("Service updated successfully!");
				if (serviceImage) {
					document.getElementById("serviceImage").value = "";
				}
			} else {
				const data = await response.json();
				setError(data.error || "Failed to update service");
			}
		} catch (err) {
			setError("An error occurred while updating the service");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	if (!service) {
		return (
			<div className="container mt-4">
				<div className="alert alert-info">
					Please select a service to edit from the services list.
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Edit Service</h2>
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
										Service Image (optional)
									</label>
									<input
										type="file"
										className="form-control"
										id="serviceImage"
										name="serviceImage"
										onChange={handleChange}
										accept="image/*"
									/>
								</div>
								<div className="text-center">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isLoading}
									>
										{isLoading ? "Updating..." : "Update Service"}
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

export default EditService;
