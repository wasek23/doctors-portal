import { createBrowserRouter } from 'react-router-dom';

import Main from '../layouts/Main';
import Admin from '../layouts/Admin';
import Home from '../Pages/Home/Home';
import Appointment from '../Pages/Appointment/Appointment';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import PrivateRoute from './PrivateRoute';

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
		path: '/',
		element: <Admin />,
		children: [
			{
				path: '/dashboard',
				element: <PrivateRoute>
					<Dashboard />
				</PrivateRoute>
			}
		]
	}
]);
export default router;