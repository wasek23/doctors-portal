import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts/AuthProvider';
import PopupLogin from '../../components/PopupLogin/PopupLogin';
import { inputClassName } from '../../utils/classNames';
import { toast } from 'react-hot-toast';

const Register = () => {
	const { register, formState: { errors }, handleSubmit } = useForm();
	const { createUser, updateUser } = useContext(AuthContext);

	const [error, setError] = useState('');

	const onRegister = data => {
		const { name, email, password } = data;

		createUser(email, password)
			.then(() => {
				updateUser({ displayName: name })
					.then(res => {
						setError('');
						toast('User created successfully!');
					})
					.catch(err => setError(err?.message));
			})
			.catch(err => setError(err?.message));
	}

	return <main className='page loginPage flex flex-col items-center justify-center pt-32 pb-16' style={{ minHeight: 'calc(100vh - 64px)' }}>
		<div className='p-8 rounded-xl shadow-lg w-full max-w-sm -mt-16'>
			<h1 className='text-xl text-center mb-8'>Register</h1>

			<form onSubmit={handleSubmit(onRegister)}>
				<div>
					<label htmlFor='name' className='inline-block pl-1 mb-1'>Name</label>

					<input type='name' id='name' className={inputClassName} {...register('name', { required: 'Name is required' })} />
					{errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
				</div>

				<div className='mt-3'>
					<label htmlFor='email' className='inline-block pl-1 mb-1'>Email</label>

					<input type='email' id='email' className={inputClassName} {...register('email', { required: 'Email is required' })} />
					{errors?.email && <ErrorMessage>{errors?.email?.message}</ErrorMessage>}
				</div>

				<div className='mt-3'>
					<label htmlFor='password' className='inline-block pl-1 mb-1'>Password</label>

					<input type='password' id='password' className={inputClassName} {...register('password', {
						required: 'Password is required',
						minLength: { value: 6, message: 'Password must be at least 6 characters' },
						pattern: { value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, lowercase letter, special character and digit' }
					})} />
					{errors?.password && <ErrorMessage>{errors?.password?.message}</ErrorMessage>}
				</div>

				<button type='submit' className='btn gray full uppercase mt-5'>Register</button>
			</form>

			{error && <p className='text-sm text-center text-red-600 mt-3'>{error}</p>}

			<p className='text-center text-sm mt-4'>Already have an account? <Link to='/login' className='text-[var(--green)]'>Login</Link></p>

			<PopupLogin setError={setError} />
		</div>
	</main>
}
export default Register;

const ErrorMessage = ({ children }) => <p className='text-xs text-red-600 pl-1 mt-1'>{children}</p>