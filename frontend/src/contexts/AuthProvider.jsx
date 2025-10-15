import { createContext, useEffect, useState } from 'react';
import { verifyAuth, loginUser } from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');

	useEffect(() => {
		const verify = async () => {
			try {
				if (accessToken) {
					setIsLoading(true);
					const response = await verifyAuth();
					if (response?.status === 200) {
						setIsLoading(false);
						setIsAuthenticated(true);
						setUser(response.data?.user);
					} else {
						handleLogout();
					}
				}
			} catch (err) {
				setIsLoading(false);
				console.error('Auth verification failed', err);
				handleLogout();
			} finally {
				setAuthChecked(true);
			}
		};
		verify();
	}, [accessToken]);

	const handleLogin = async (credentials) => {
		const res = await loginUser(credentials);
		if (res.success) {
			const { access_token, refresh_token, user } = res.data;
			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('refreshToken', refresh_token);
			setIsAuthenticated(true);
			setUser(user || null);
			return { ok: true };
		}
		return { ok: false, message: res.message };
	};

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				authChecked,
				user,
				isLoading,
				login: handleLogin,
				logout: handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
