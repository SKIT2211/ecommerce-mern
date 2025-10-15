import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem('refreshToken');
				if (!refreshToken) throw new Error('No refresh token found');

				const refreshResponse = await axios.post(
					`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/auth/refresh`,
					{ refreshToken }
				);

				const newAccessToken = refreshResponse.data?.access_token;
				if (newAccessToken) {
					localStorage.setItem('accessToken', newAccessToken);
					api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return api(originalRequest);
				}
			} catch (refreshError) {
				console.error('Token refresh failed:', refreshError);
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export default api;
