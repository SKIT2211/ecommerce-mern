import React from 'react';
import { useCart } from '../contexts/CardContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
	const { cart, total } = useCart();

	const navigate = useNavigate();
	return (
		<>
			<Navbar />
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-bold mb-4">Checkout</h2>
					<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/cart')}>
						Go Back to Cart
					</button>
				</div>
				<p>This is a mock checkout page.</p>
				<div className="mt-4">
					{cart.map((item) => (
						<div key={item.product._id} className="flex justify-between mb-2">
							<span>
								{item.product.name} x {item.quantity}
							</span>
							<span>${(item.product.price * item.quantity).toFixed(2)}</span>
						</div>
					))}
					<div className="font-bold text-right text-xl mt-2">Total: ${total.toFixed(2)}</div>
				</div>
			</div>
		</>
	);
};

export default Checkout;
