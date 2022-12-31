import { serverLink } from './links';

export const getUserToken = email => {
	return fetch(`${serverLink}/jwt?email=${email}`)
		.then(res => res.json());
}

export const saveUserToDB = (name, email) => {
	return fetch(`${serverLink}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email })
	})
		.then(res => res.json());
}