import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../services/authService';

export default function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [validationErrors, setValidationErrors] = useState({});
	const navigate = useNavigate();

	const validateForm = () => {
		const errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!formData.name.trim()) errors.name = 'Name is required';
		if (!formData.email.trim()) errors.email = 'Email is required';
		else if (!emailRegex.test(formData.email)) errors.email = 'Enter a valid email address';

		if (!formData.password.trim()) errors.password = 'Password is required';
		else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		setError(null);

		try {
			const res = await registerUser(formData);
			if (res?.status === 201 || res?.status === 200) {
				navigate('/login');
			} else {
				setError(res?.data?.message || 'Registration failed');
			}
		} catch (err) {
			setError(err?.response?.data?.message || 'Registration failed');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-100">
			<div className="w-[420px] bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
				<h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">Create an Account</h2>
				<p className="text-sm text-gray-500 text-center mb-6">Register to get started</p>

				{error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
						<div className="relative">
							<User className="absolute left-3 top-2.5 text-gray-400" size={18} />
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none ${
									validationErrors.name ? 'border-red-400' : 'border-gray-300'
								}`}
								placeholder="Enter name"
							/>
						</div>
						{validationErrors.name && <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
						<div className="relative">
							<Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none ${
									validationErrors.email ? 'border-red-400' : 'border-gray-300'
								}`}
								placeholder="Enter email"
							/>
						</div>
						{validationErrors.email && <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
						<div className="relative">
							<Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
							<input
								type={showPassword ? 'text' : 'password'}
								name="password"
								value={formData.password}
								onChange={handleChange}
								className={`w-full pl-9 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none ${
									validationErrors.password ? 'border-red-400' : 'border-gray-300'
								}`}
								placeholder="Enter password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
						{validationErrors.password && <p className="text-xs text-red-500 mt-1">{validationErrors.password}</p>}
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`w-full py-2.5 text-white font-medium rounded-lg transition-all ${
							loading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 active:scale-[.98]'
						}`}
					>
						{loading ? 'Creating account...' : 'Register'}
					</button>

					<p className="text-sm text-center text-gray-600">
						Already have an account?{' '}
						<span
							onClick={() => navigate('/login')}
							className="text-sky-600 font-medium cursor-pointer hover:underline"
						>
							Login
						</span>
					</p>
				</form>
			</div>
		</div>
	);
}
