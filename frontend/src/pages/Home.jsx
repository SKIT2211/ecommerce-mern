import React from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CardContext';
import { Link } from 'react-router-dom';

export default function Home() {
	const { cart } = useCart();
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			Home Page
			<Link to="/products" className="ml-4 caret-blue-600 underline">
				Cart ({cart.length}) view products
			</Link>
		</div>
	);
}
