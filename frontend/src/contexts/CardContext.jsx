import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCartService, addToCartService, updateCartService, removeFromCartService } from '../services/cartService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const fetchCart = async () => {
		const res = await fetchCartService();
		if (res.success) setCart(res.data);
		else setCart([]);
	};

	useEffect(() => {
		fetchCart();
	}, []);

	const addToCart = async (product, quantity = 1) => {
		const res = await addToCartService(product._id, quantity);
		if (res.success) setCart(res.data);
		else console.error(res.message);
	};

	const updateCart = async (productId, quantity) => {
		const res = await updateCartService(productId, quantity);
		if (res.success) setCart(res.data);
		else console.error(res.message);
	};

	const removeFromCart = async (productId) => {
		const res = await removeFromCartService(productId);
		if (res.success) setCart(res.data);
		else console.error(res.message);
	};

	const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateCart,
				removeFromCart,
				total,
				reloadCart: fetchCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
