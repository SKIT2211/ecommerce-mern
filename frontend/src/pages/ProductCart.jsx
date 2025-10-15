import React, { useState } from 'react';
import { useCart } from '../contexts/CardContext';

const ProductCard = ({ product }) => {
	const { addToCart } = useCart();
	const [qty, setQty] = useState(1);

	return (
		<div className="border p-4 rounded shadow hover:shadow-lg">
			<img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover mb-2" />
			<h3 className="font-bold">{product.name}</h3>
			<p className="text-green-600 font-semibold">${product.price}</p>
			<p className="text-gray-500 text-sm">Stock: {product.stock}</p>
			<div className="flex mt-2 items-center">
				<input
					type="number"
					value={qty}
					min={1}
					max={product.stock}
					onChange={(e) => setQty(Number(e.target.value))}
					className="border rounded w-16 mr-2 p-1"
				/>
				<button
					onClick={() => addToCart(product, qty)}
					className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
