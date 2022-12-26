import { format } from 'date-fns';

import Title from './Title';

const AvailableServices = ({ selectedDate, appointmentServices, setSelectedService, setSelectedServiceSlot }) => {

	if (!selectedDate) {
		return;
	}

	const onSelectService = service => {
		setSelectedService(service._id);
		setSelectedServiceSlot(service?.slots?.[0] || '');
	}

	return <section className='mt-16'>
		<div className='containerFluid'>
			<Title className='mb-14' title={`Available Services on ${format(selectedDate, 'PP')}`} description='Please select a service.' />

			{0 === appointmentServices?.length ?
				<p className='text-xl text-center text-red-500'>No appointment services available! Please select another day</p> :

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{appointmentServices?.map(service => {
						const { _id, name, slots } = service;
						return <div key={_id} className='text-center p-10 rounded-2xl shadow-lg cursor-pointer' onClick={() => onSelectService(service)}>
							<h3 className={`text-xl font-semibold text-[var(${slots?.length ? '--green' : '--gray'})]`}>{name}</h3>
						</div>
					})}
				</div>
			}
		</div>
	</section>
}
export default AvailableServices;