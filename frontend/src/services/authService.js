import axios from 'axios';
import api from './api';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const loginUser = async (data) => {
	try {
		const response = await axios.post(`${baseURL}/auth/login`, data);

		if (response?.data?.access_token) {
			return {
				success: true,
				data: response.data,
			};
		}

		return {
			success: false,
			message: response?.data?.message || 'Invalid credentials',
		};
	} catch (error) {
		const message = error.response?.data?.error || error.message || 'Failed to login. Please try again.';
		console.error('Login failed:', message);
		return { success: false, message };
	}
};

export const verifyAuth = async () => {
	try {
		const res = await api.get('/auth/me');
		return res;
	} catch (err) {
		console.error('Auth verification failed:', err);
		throw err;
	}
};

export const registerUser = async (data) => {
	try {
		const res = await api.post('auth/register', data);
		return res;
	} catch (error) {
		const message = error.response?.data?.message || error.message || 'Registration failed.';
		return { success: false, message };
	}
};
