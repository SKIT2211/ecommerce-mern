import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
	const { isAuthenticated, authChecked, isLoading } = useAuth();
	if (isLoading) return <div>Loading....</div>;
	if (!authChecked) return null;
	if (!isAuthenticated) return <Navigate to="/login" replace />;
	return children;
}
