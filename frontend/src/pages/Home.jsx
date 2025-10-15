import React from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

export default function Home() {
	const { cart } = useCart();

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<div className="max-w-4xl mx-auto py-12 px-4 text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Store</h1>
				<p className="text-gray-600 mb-6">Explore a wide range of products and enjoy seamless shopping.</p>
				<Link
					to="/products"
					className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
				>
					View Products ({cart.length})
				</Link>
			</div>
		</div>
	);
}
