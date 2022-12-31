import { useEffect, useState } from 'react';
import { serverLink } from '../utils/links';

const useToken = email => {
	const [token, setToken] = useState('');

	useEffect(() => {
		if (email) {
			fetch(`${serverLink}/jwt?email=${email}`)
				.then(res => res.json())
				.then(data => {
					if (data.accessToken) {
						localStorage.setItem('accessToken', data.accessToken);
						setToken(data.accessToken);
					}
				});
		}
	}, [email]);

	return token;
}
export default useToken;