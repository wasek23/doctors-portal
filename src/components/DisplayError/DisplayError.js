import { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logoutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onLogout = () => {
        logoutUser()
            .then(() => {
                toast('User logged out!');
                localStorage.removeItem('accessToken');
                navigate('/login');
            });
    }

    return <main className='page displayErrorPage'>
        <div className='container text-center'>
            <h1 className='text-4xl text-red-500'>Something went wrong</h1>
            <p className='text-xl text-red-500'>{error?.statusText || error?.message}</p>
            <p>Please <button className='btn white hover:gray' onClick={onLogout}>Logout</button></p>
        </div>
    </main>
}
export default DisplayError;