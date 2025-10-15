import api from './api';

export const fetchCartService = async () => {
	try {
		const res = await api.get('/cart');
		return { success: true, data: res.data.data.items || [] };
	} catch (error) {
		console.error('Fetch cart error:', error);
		return { success: false, data: [] };
	}
};

export const addToCartService = async (productId, quantity = 1) => {
	try {
		const res = await api.post('/cart', { productId, quantity });
		return { success: true, data: res.data.data.items };
	} catch (error) {
		console.error('Add to cart error:', error);
		return { success: false, message: error.response?.data?.message || 'Failed to add to cart' };
	}
};

export const updateCartService = async (productId, quantity) => {
	try {
		const res = await api.patch(`/cart/${productId}`, { quantity });
		return { success: true, data: res.data.data.items };
	} catch (error) {
		console.error('Update cart error:', error);
		return { success: false, message: error.response?.data?.message || 'Failed to update cart' };
	}
};

export const removeFromCartService = async (productId) => {
	try {
		const res = await api.delete(`/cart/${productId}`);
		return { success: true, data: res.data.data.items };
	} catch (error) {
		console.error('Remove from cart error:', error);
		return { success: false, message: error.response?.data?.message || 'Failed to remove from cart' };
	}
};
