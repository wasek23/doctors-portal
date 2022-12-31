import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '../../../contexts/AuthProvider';
import { serverLink } from '../../../utils/links';

const MyAppointments = () => {
	const { user } = useContext(AuthContext);

	const { data: bookings = [] } = useQuery({
		queryKey: ['bookings', user?.email],
		queryFn: async () => {
			const res = await fetch(`${serverLink}/bookings?email=${user?.email}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});
			const data = res.json();
			return data;
		}
	});

	return <main className='page myAppointmentsPage my-12'>
		<div className='container'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl'>My Appointments</h1>
			</div>

			<div className='mt-5 overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th className='text-sm font-semibold bg-[#e6e6e6]'></th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Name</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Service</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Date</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Time</th>
						</tr>
					</thead>
					<tbody>
						{bookings?.length ? bookings?.map((booking, index) => {
							const { _id, appointmentDate, serviceName, serviceSlot, name } = booking;

							return <tr key={_id}>
								<th>{index + 1}</th>
								<td>{name}</td>
								<td>{serviceName}</td>
								<td>{appointmentDate}</td>
								<td>{serviceSlot}</td>
							</tr>
						}) : <tr></tr>}
					</tbody>
				</table>
			</div>
		</div>
	</main>
}
export default MyAppointments;