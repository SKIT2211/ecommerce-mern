import React, { useEffect, useState } from 'react';
import { fetchProductsService } from '../services/productService';
import { useCart } from '../contexts/CardContext';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState('');
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { addToCart } = useCart();

	const fetchProducts = async () => {
		setLoading(true);
		setError('');
		const res = await fetchProductsService({ category, search });
		if (res.success) setProducts(res.data);
		else setError(res.message);
		setLoading(false);
	};

	useEffect(() => {
		fetchProducts();
	}, [category, search]);

	return (
		<>
			<Navbar />
			<div className="p-4">
				<div className="flex mb-4 gap-2">
					<input
						type="text"
						placeholder="Search products..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="border p-2 rounded flex-1"
					/>
					<select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
						<option value="">All Categories</option>
						<option value="Mobile">Mobile</option>
						<option value="Laptop">Laptop</option>
						<option value="Accessories">Accessories</option>
						<option value="Tablet">Tablet</option>
						<option value="Others">Others</option>
					</select>
				</div>

				{loading ? (
					<p>Loading products...</p>
				) : error ? (
					<p className="text-red-600">{error}</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{products.map((product) => (
							<ProductCard key={product._id} product={product} onAddToCart={() => addToCart(product, 1)} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default ProductList;
