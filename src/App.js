import { RouterProvider } from 'react-router-dom';
import 'react-day-picker/dist/style.css';

import './App.scss';
import router from './router/router';
import AuthProvider from './contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';

const App = () => {
	return <AuthProvider>
		<RouterProvider router={router} />;
		<Toaster />
	</AuthProvider>
}
export default App;
