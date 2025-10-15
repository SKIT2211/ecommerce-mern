import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
	return (
		<div className="border rounded p-4 flex flex-col">
			<img
				src={product.imageUrl || 'https://via.placeholder.com/150'}
				alt={product.name}
				className="w-full h-40 object-cover mb-2 rounded"
			/>
			<h3 className="font-semibold">{product.name}</h3>
			<p className="text-gray-600">${product.price.toFixed(2)}</p>
			<button onClick={onAddToCart} className="mt-auto bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
				Add to Cart
			</button>
		</div>
	);
};

export default ProductCard;
