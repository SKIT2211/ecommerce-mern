import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CardContext';
import Navbar from '../components/Navbar';

export default function CartPage() {
	const { cart, updateCart, removeFromCart, total } = useCart();
	const navigate = useNavigate();

	if (!cart || cart.length === 0) {
		return (
			<div className="p-6 text-center">
				<h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
				<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/products')}>
					Browse Products
				</button>
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<div className="p-6 max-w-4xl mx-auto">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
					<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/products')}>
						Browse Products
					</button>
				</div>
				<div className="space-y-4">
					{cart.map((item) => (
						<div key={item.product._id} className="flex items-center justify-between border p-4 rounded shadow">
							<div className="flex items-center space-x-4">
								<img
									src={item.product.imageUrl || 'https://via.placeholder.com/100'}
									alt={item.product.name}
									className="w-20 h-20 object-cover rounded"
								/>
								<div>
									<h2 className="text-lg font-semibold">{item.product.name}</h2>
									<p className="text-gray-600">${item.product.price}</p>
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<input
									type="number"
									min={1}
									value={item.quantity}
									onChange={(e) => updateCart(item.product._id, Number(e.target.value))}
									className="w-16 border rounded px-2 py-1 text-center"
								/>
								<button
									onClick={() => removeFromCart(item.product._id)}
									className="bg-red-600 text-white px-3 py-1 rounded"
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="mt-6 text-right">
					<p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
					<button className="bg-green-600 text-white px-6 py-2 rounded" onClick={() => navigate('/checkout')}>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</>
	);
}
