import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../config';
import { useAuthContext } from "../context/Autcontext";

function Product() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const { userId } = useAuthContext();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/product`);
			if (response.ok) {
				const data = await response.json();
				setProducts(data);
			} else {
				setError("Failed to fetch products");
			}
		} catch (err) {
			setError("Error loading products");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleBuy = async (productId) => {
		if (!userId) {
			setError("Please login to purchase products");
			return;
		}

		try {
			const response = await fetch(`${API_BASE_URL}/order`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					productId,
					quantity
				}),
			});

			if (response.ok) {
				setSelectedProduct(null);
				setQuantity(1);
				alert("Order placed successfully!");
			} else {
				const data = await response.json();
				setError(data.error || "Failed to place order");
			}
		} catch (err) {
			setError("Error placing order");
			console.error(err);
		}
	};

	if (loading) {
		return (
			<div className="container mt-5">
				<div className="text-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mt-5">
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4">Our Products</h2>
			<div className="row row-cols-1 row-cols-md-3 g-4">
				{products.map((product) => (
					<div key={product.id} className="col">
						<div className="card h-100">
							<img
								src={product.productImage}
								className="card-img-top"
								alt={product.productName}
								style={{ height: "200px", objectFit: "cover" }}
							/>
							<div className="card-body">
								<h5 className="card-title">{product.productName}</h5>
								<p className="card-text">{product.productDescription}</p>
								<p className="card-text">
									<strong>Price: ${product.productPrice}</strong>
								</p>
								{selectedProduct?.id === product.id ? (
									<div>
										<div className="mb-3">
											<label htmlFor="quantity" className="form-label">
												Quantity:
											</label>
											<input
												type="number"
												className="form-control"
												id="quantity"
												value={quantity}
												onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
												min="1"
											/>
										</div>
										<div className="d-flex gap-2">
											<button
												className="btn btn-primary"
												onClick={() => handleBuy(product.id)}
											>
												Confirm Purchase
											</button>
											<button
												className="btn btn-secondary"
												onClick={() => setSelectedProduct(null)}
											>
												Cancel
											</button>
										</div>
									</div>
								) : (
									<button
										className="btn btn-primary"
										onClick={() => setSelectedProduct(product)}
									>
										Buy Now
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Product;
