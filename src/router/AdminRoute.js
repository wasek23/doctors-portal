import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../components/Loading/Loading';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const { isAdmin, isAdminLoading } = useAdmin(user?.email);

	const location = useLocation();

	if (loading || isAdminLoading) {
		return <Loading />;
	}

	return user && isAdmin ? children : <Navigate to='/login' state={{ from: location }} replace />;
}
export default AdminRoute;