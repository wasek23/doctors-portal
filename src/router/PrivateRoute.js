import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return <Loading />;
	}

	return user ? children : <Navigate to='/login' state={{ from: location }} replace />;
}
export default PrivateRoute;