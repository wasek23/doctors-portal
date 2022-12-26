import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../contexts/AuthProvider';
const googleProvider = new GoogleAuthProvider();

const PopupLogin = ({ setError }) => {
    const { popupLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const onPopupLogin = () => {
        popupLogin(googleProvider)
            .then(res => {
                setError('');
                toast('User logged in!');

                navigate(from, { replace: true });
            })
            .catch(err => setError(err?.message));
    }

    return <>
        <p className='text-center text-[var(--gray)] uppercase mt-4'>OR</p>

        <button className='btn gray alt full uppercase mt-6' onClick={onPopupLogin}>Continue with Google</button>
    </>
}
export default PopupLogin;