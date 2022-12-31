import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import 'react-day-picker/dist/style.css';

import './App.scss';
import router from './router/router';
import AuthProvider from './contexts/AuthProvider';

const queryClient = new QueryClient();

const App = () => {
	return <QueryClientProvider client={queryClient}>
		<AuthProvider>
			<RouterProvider router={router} />;
			<Toaster />
		</AuthProvider>
	</QueryClientProvider>
}
export default App;
