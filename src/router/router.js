import { createBrowserRouter } from 'react-router-dom';

import Main from '../layouts/Main';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminRoute from './AdminRoute';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../Pages/Home/Home';
import Appointment from '../Pages/Appointment/Appointment';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import MyAppointments from '../Pages/Dashboard/MyAppointments/MyAppointments';
import Admin from '../Pages/Admin/Admin';
import AllUsers from '../Pages/Admin/AllUsers/AllUsers';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/appointment',
				element: <Appointment />
			},
			{
				path: '/register',
				element: <Register />
			},
			{
				path: '/login',
				element: <Login />
			}
		]
	},
	{
		path: '/dashboard',
		element: <PrivateRoute>
			<DashboardLayout />
		</PrivateRoute>,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />
			},
			{
				path: '/dashboard/my-appointments',
				element: <MyAppointments />,
			},
		]
	},
	{
		path: '/admin',
		element: <AdminRoute>
			<AdminLayout />
		</AdminRoute>,
		children: [
			{
				path: '/admin',
				element: <Admin />
			},
			{
				path: '/admin/all-users',
				element: <AllUsers />,
			},
		]
	}
]);
export default router;