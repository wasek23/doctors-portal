import { createBrowserRouter } from 'react-router-dom';

import Main from '../layouts/Main';
import Home from '../Pages/Home/Home';
import Appointment from '../Pages/Appointment/Appointment';
import Login from '../Pages/Login/Login';

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
				path: '/login',
				element: <Login />
			}
		]
	}
]);
export default router;