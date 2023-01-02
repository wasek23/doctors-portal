import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';

import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../../components/Loading/Loading';
import { serverLink } from '../../../utils/links';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
	const { user } = useContext(AuthContext);

	const [deletingDoctor, setDeletingDoctor] = useState(null);

	const { data: doctors = [], isLoading, refetch } = useQuery({
		queryKey: ['doctors'],
		queryFn: async () => {
			const res = await fetch(`${serverLink}/doctors?email=${user?.email}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});
			const data = await res.json();
			return data;
		}
	});

	if (isLoading) {
		return <Loading />
	}

	const onDeleteDoctor = id => {
		fetch(`${serverLink}/doctors/${id}?email=${user?.email}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.deletedCount > 0) {
					toast.success('Doctor deleted successfully!');
					refetch();
				}
			});
	}

	return <main className='page ManagePage my-12'>
		<div className='container'>
			<h1 className='text-2xl font-bold'>Doctors: {doctors?.length}</h1>

			<div className='mt-5 overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th className='text-sm font-semibold bg-[#e6e6e6]'></th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Photo</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Name</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Specialty</th>
							<th className='text-sm font-semibold bg-[#e6e6e6]'>Action</th>
						</tr>
					</thead>
					<tbody>
						{doctors?.length ? doctors?.map((doctor, index) => {
							const { _id, photo, name, specialty } = doctor;

							return <tr key={_id} className='text-[#898989] font-semibold'>
								<th>{index + 1}</th>
								<td><img src={photo} className='w-10 h-10 rounded-full' alt={name} /></td>
								<td>{name}</td>
								<td>{specialty}</td>
								<td><label htmlFor='confirmationModal' className='btn red' onClick={() => setDeletingDoctor(doctor)}>Delete</label></td>
							</tr>
						}) : <tr />}
					</tbody>
				</table>
			</div>
		</div>

		{deletingDoctor && <ConfirmationModal
			title='Are you sure you want to delete this doctor!'
			body={`If you delete ${deletingDoctor.name}. It cannot be undone!`}
			onConfirm={() => onDeleteDoctor(deletingDoctor._id)}
		/>}
	</main>
}
export default ManageDoctors;