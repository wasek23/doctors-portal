import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import PopupLogin from '../../components/PopupLogin/PopupLogin';
import { inputClassName } from '../../utils/classNames';
import { toast } from 'react-hot-toast';

const Login = () => {
	const { register, formState: { errors }, handleSubmit } = useForm();
	const { loginUser, passwordReset } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [createdUserEmail, setCreatedUserEmail] = useState('');
	const token = useToken(createdUserEmail);
	const [error, setError] = useState('');

	const from = location.state?.from?.pathname || '/';

	if (token) {
		navigate(from, { replace: true });
	}

	const onLogin = data => {
		const { email, password } = data;

		loginUser(email, password)
			.then(res => {
				// if (res?.user?.emailVerified) {

				setError('');
				toast('User logged in!');
				setCreatedUserEmail(email);

				// } else {
				// 	logout();
				// 	setError('Please verify your email address!');
				// }
			})
			.catch(err => setError(err?.message));
	}

	const onForgotPassword = () => {
		if (email) {
			passwordReset(email)
				.then(() => {
					setError('');
					toast('Password reset email sended!');
				})
				.catch(err => setError(err?.message));
		}
	}

	return <main className='page loginPage flex flex-col items-center justify-center pt-32 pb-16' style={{ minHeight: 'calc(100vh - 64px)' }}>
		<div className='p-8 rounded-xl shadow-lg w-full max-w-sm -mt-16'>
			<h1 className='text-xl text-center mb-8'>Login</h1>

			<form onSubmit={handleSubmit(onLogin)}>
				<div>
					<label htmlFor='email' className='inline-block pl-1 mb-1'>Email</label>

					<input type='email' id='email' className={inputClassName} {...register('email', { required: 'Email is required' })} onChange={e => setEmail(e.target.value)} />
					{errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
				</div>

				<div className='mt-3'>
					<label htmlFor='password' className='inline-block pl-1 mb-1'>Password</label>

					<input type='password' id='password' className={inputClassName} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} />
					{errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
				</div>

				<p className='text-xs cursor-pointer hover:text-[var(--green)] mt-1' onClick={onForgotPassword}>Forgot Password ?</p>

				<button type='submit' className='btn gray full uppercase mt-5'>Login</button>
			</form>

			{error && <p className='text-sm text-center text-red-600 mt-3'>{error}</p>}

			<p className='text-center text-sm mt-4'>New in Doctors Portal? <Link to='/register' className='text-[var(--green)]'>Register</Link></p>

			<PopupLogin setError={setError} />
		</div>
	</main>
}
export default Login;

const ErrorMessage = ({ children }) => <p className='text-xs text-red-600 pl-1 mt-1'>{children}</p>