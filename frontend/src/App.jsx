import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import { CartProvider } from './contexts/CartContext';
import CartPage from './pages/CartPage';

export default function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/products"
						element={
							<ProtectedRoute>
								<ProductList />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/cart"
						element={
							<ProtectedRoute>
								<CartPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/checkout"
						element={
							<ProtectedRoute>
								<Checkout />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</CartProvider>
		</AuthProvider>
	);
}
