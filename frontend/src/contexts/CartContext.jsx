import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCartService, addToCartService, updateCartService, removeFromCartService } from '../services/cartService';
import { AuthContext } from './AuthProvider';

const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const { isAuthenticated, authChecked } = useContext(AuthContext);

	const fetchCart = async () => {
		const res = await fetchCartService();
		if (res.success) setCart(res.data);
		else setCart([]);
	};
	useEffect(() => {
		if (authChecked && isAuthenticated) {
			fetchCart();
		} else if (authChecked && !isAuthenticated) {
			setCart([]);
		}
	}, [authChecked, isAuthenticated]);

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

export { CartProvider, CartContext };
