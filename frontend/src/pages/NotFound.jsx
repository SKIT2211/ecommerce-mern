import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-100">
			<div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center max-w-md">
				<div className="flex justify-center mb-4">
					<AlertTriangle className="text-sky-600" size={50} />
				</div>

				<h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
				<h2 className="text-lg font-semibold text-gray-700 mb-3">Page Not Found</h2>
				<p className="text-gray-500 mb-6">Oops! The page you’re looking for doesn’t exist or has been moved.</p>

				<button
					onClick={() => navigate('/')}
					className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all active:scale-[.98]"
				>
					<Home size={18} />
					Go Back Home
				</button>
			</div>
		</div>
	);
}
