import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../../contexts/AuthProvider';
import { serverLink } from '../../../utils/links';

const AllUsers = () => {
	const { user } = useContext(AuthContext);

	const { data: users = [], refetch } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const res = await fetch(`${serverLink}/users?email=${user?.email}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});
			const data = res.json();
			return data;
		}
	});

	const onMakeAdmin = id => {
		fetch(`${serverLink}/users/admin/${id}?email=${user?.email}`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data) {
					toast.success('Making admin successful');
					refetch();
				}
			});
	}

	return <main className='page allUsersPage my-12'>
		<div className='container'>
			<h1 className='text-2xl font-bold'>All Users: {users?.length}</h1>

			<div className='mt-5 overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th className='text-sm font-semibold bg-[#e6e6e6]'></th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Name</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Email</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Role</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Action</th>
						</tr>
					</thead>
					<tbody>
						{users?.length ? users?.map((user, index) => {
							const { _id, name, email, role = '' } = user;

							return <tr key={_id}>
								<th>{index + 1}</th>
								<td>{name}</td>
								<td>{email}</td>
								<td>
									{'admin' !== role && <button className='btn gray' onClick={() => onMakeAdmin(_id)}>Make Admin</button>}
								</td>
								<td><button className='btn red'>Delete</button></td>
							</tr>
						}) : <tr />}
					</tbody>
				</table>
			</div>
		</div>
	</main>
}
export default AllUsers;