import api from './api';

export const fetchProductsService = async (filters = {}) => {
	try {
		const params = new URLSearchParams();
		if (filters.category) params.append('category', filters.category);
		if (filters.search) params.append('search', filters.search);

		const res = await api.get(`/products?${params.toString()}`);
		return { success: true, data: res.data.data || [] };
	} catch (error) {
		console.error('Fetch products error:', error);
		return { success: false, data: [], message: error.response?.data?.message || 'Failed to fetch products' };
	}
};

export const fetchProductByIdService = async (id) => {
	try {
		const res = await api.get(`/products/${id}`);
		return { success: true, data: res.data.data };
	} catch (error) {
		console.error('Fetch product error:', error);
		return { success: false, data: null, message: error.response?.data?.message || 'Failed to fetch product' };
	}
};
