import { useEffect, useState } from 'react';
import { serverLink } from '../utils/links';

const useAdmin = email => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAdminLoading, setIsAdminLoading] = useState(true);

	useEffect(() => {
		if (email) {
			fetch(`${serverLink}/users/admin/${email}`)
				.then(res => res.json())
				.then(data => {
					if (data.isAdmin) {
						setIsAdmin(data.isAdmin);
						setIsAdminLoading(false);
					}
				})
		}
	}, [email])

	return { isAdmin, isAdminLoading }
}
export default useAdmin;