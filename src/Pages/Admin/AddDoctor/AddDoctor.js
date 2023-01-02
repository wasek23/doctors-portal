import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../../components/Loading/Loading';
import { serverLink } from '../../../utils/links';
import { inputClassName } from '../../../utils/classNames';

const AddDoctor = () => {
	const { user } = useContext(AuthContext);

	const { register, formState: { errors }, handleSubmit } = useForm();

	const navigate = useNavigate();

	const { data: specialties = [], isLoading } = useQuery({
		queryKey: ['specialties'],
		queryFn: async () => {
			const res = await fetch(`${serverLink}/appointmentSpecialty`);
			const data = await res.json();
			return data;
		}
	});

	const onAddDoctor = data => {
		const { name, email, specialty, photo } = data;

		const formData = new FormData();
		formData.append('image', photo?.[0]);

		const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBBKey}`;
		fetch(url, {
			method: 'POST',
			body: formData
		})
			.then(res => res.json())
			.then(imgData => {
				if (imgData.success) {
					const doctorInfo = { name, email, specialty, photo: imgData.data.url }

					// Save doctor info to the database
					fetch(`${serverLink}/doctors?email=${user?.email}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer ${localStorage.getItem('accessToken')}`
						},
						body: JSON.stringify(doctorInfo)
					})
						.then(res => res.json())
						.then(data => {
							if (data.acknowledged) {
								toast.success(`Doctor ${name} added successfully!`);

								navigate('/admin/manage-doctors')
							}
						})
				}
			});

	}

	if (isLoading) {
		return <Loading />
	}

	return <main className='page addDoctorPage my-12'>
		<div className='container'>
			<h1 className='text-2xl font-bold mb-8'>Add a new Doctor</h1>

			<form onSubmit={handleSubmit(onAddDoctor)} className='max-w-xl bg-white p-12 rounded-lg'>
				<div>
					<label htmlFor='name' className='inline-block pl-1 mb-1'>Name</label>

					<input type='name' id='name' className={inputClassName} {...register('name', { required: 'Name is required' })} />
					{errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
				</div>

				<div className='mt-3'>
					<label htmlFor='email' className='inline-block pl-1 mb-1'>Email</label>

					<input type='email' id='email' className={inputClassName} {...register('email', { required: 'Email is required' })} />
					{errors?.email && <ErrorMessage>{errors?.email?.message}</ErrorMessage>}
				</div>

				<div className='mt-3'>
					<label htmlFor='specialty' className='inline-block pl-1 mb-1'>Specialty</label>
					<br />

					<select id='specialty' className='select w-full border border-[#cfcfcf] focus:outline-none'{...register('specialty', { required: 'Specialty is required' })} >
						{specialties?.map(sp => <option key={sp._id} value={sp.name}>{sp.name}</option>)}
					</select>
					{errors?.specialty && <ErrorMessage>{errors?.specialty?.message}</ErrorMessage>}
				</div>

				<div className='mt-3'>
					<label htmlFor='photo' className='inline-block pl-1 mb-1'>Upload Doctor Photo</label>

					<input type='file' id='photo' className={inputClassName} {...register('photo')} />
					{errors?.photo && <ErrorMessage>{errors?.photo?.message}</ErrorMessage>}
				</div>

				<button type='submit' className='btn gray full uppercase mt-5'>Add Doctor</button>
			</form>
		</div>
	</main>
}
export default AddDoctor;

const ErrorMessage = ({ children }) => <p className='text-xs text-red-600 pl-1 mt-1'>{children}</p>