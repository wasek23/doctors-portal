import { useRef } from 'react';
import { format } from 'date-fns';

import Title from './Title';
import { inputClassName } from '../../utils/classNames';

const AvailableSlots = ({ selectedDate, appointmentServices, selectedService, selectedServiceSlot, setSelectedServiceSlot }) => {
	const modalRef = useRef(null);

	if (!selectedDate || !selectedService) {
		return;
	}

	const currentService = appointmentServices.find(s => s._id === selectedService);
	const { name, slots } = currentService;


	const onBookService = e => {
		e.preventDefault();

		const form = e.target;
		const name = form.name.value;
		const phone = form.phone.value;
		const email = form.email.value;

		const booking = {
			appointmentDate: selectedDate,
			service: selectedService,
			serviceSlot: selectedServiceSlot,
			name,
			phone,
			email
		}

		console.log(booking);
		// Reset
		form.reset();
		modalRef.current.checked = false;
	}

	return <section className='mt-24'>
		<div className='containerFluid'>
			<Title className='mb-14' title={`Available slots for ${name}.`} />

			{0 === slots?.length ?
				<p className='text-xl text-center text-red-500'>No slots available!</p> :

				<>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{slots?.map((slot, index) => {
							return <div key={index} className='text-center p-10 rounded-2xl shadow-lg cursor-pointer'>
								<h3 className='text-lg font-semibold'>{slot}</h3>

								<label htmlFor='bookingModal' className='btn mt-10' onClick={() => setSelectedServiceSlot(slot)}>Book Appointment</label>
							</div>
						})}
					</div>

					{/* Modal */}
					<input type='checkbox' id='bookingModal' className='modal-toggle' ref={modalRef} />
					<div className='modal'>
						<div className='modal-box relative'>
							<label htmlFor='bookingModal' className='btn gray close text-[#8391ad] absolute right-2 top-2'>✕</label>
							<h3 className='text-xl font-semibold mb-6'>{name}</h3>

							<form onSubmit={onBookService}>
								<div className='mb-5'>
									<input className={inputClassName} type='text' id='date' name='date' value={format(selectedDate, 'PP')} disabled />
								</div>

								<div className='mb-5'>
									<input className={inputClassName} type='text' id='serviceSlot' name='serviceSlot' value={selectedServiceSlot} disabled />
								</div>

								<div className='mb-5'>
									<input className={inputClassName} type='text' id='name' name='name' placeholder='Full Name' />
								</div>

								<div className='mb-5'>
									<input className={inputClassName} type='text' id='phone' name='phone' placeholder='Phone Number' />
								</div>

								<div className='mb-5'>
									<input className={inputClassName} type='email' id='email' name='email' placeholder='Email' />
								</div>

								<div className='text-center'>
									<button type='submit' className='btn gray full'>Submit</button>
								</div>
							</form>
						</div>
					</div>
				</>
			}
		</div>
	</section>
}
export default AvailableSlots;