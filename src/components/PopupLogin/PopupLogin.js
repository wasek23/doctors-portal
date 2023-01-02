import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import { saveUserToDB } from '../../utils/functions';
const googleProvider = new GoogleAuthProvider();

const PopupLogin = ({ setError }) => {
	const { popupLogin } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from?.pathname || '/';
	const [createdUserEmail, setCreatedUserEmail] = useState();
	const token = useToken(createdUserEmail);

	useEffect(() => {
		if (token) {
			navigate(from, { replace: true });
		}
	}, [token, navigate, from])

	const onPopupLogin = () => {
		popupLogin(googleProvider)
			.then(res => {
				const user = res.user;

				setError('');
				toast('User logged in!');

				// Save user to database
				saveUserToDB(user?.displayName, user?.email).then(() => {
					setCreatedUserEmail(user?.email);
				});

			})
			.catch(err => setError(err?.message));
	}

	return <>
		<p className='text-center text-[var(--gray)] uppercase mt-4'>OR</p>

		<button className='btn gray alt full uppercase mt-6' onClick={onPopupLogin}>Continue with Google</button>
	</>
}
export default PopupLogin;