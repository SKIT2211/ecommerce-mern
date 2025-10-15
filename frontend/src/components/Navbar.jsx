import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CarTaxiFront } from 'lucide-react';
import { useCart } from '../contexts/CardContext';

export default function Navbar() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const { cart } = useCart();
	return (
		<header className="bg-white shadow">
			<div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
				<div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
					<div>
						<div className="font-semibold">E-commerce Web App</div>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<button className="px-3 py-1 border rounded cursor-pointer" onClick={() => navigate('/cart')}>
						Cart ({cart.length})
					</button>
					<button
						onClick={() => {
							logout();
							navigate('/login');
						}}
						className="px-3 py-1 border rounded cursor-pointer"
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	);
}
