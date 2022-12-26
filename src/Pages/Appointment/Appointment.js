import { useEffect, useState } from 'react';

import PageHero from './PageHero';
import AvailableServices from './AvailableServices';
import AvailableSlots from './AvailableSlots';

const Appointment = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [appointmentServices, setAppointmentServices] = useState([]);
	const [selectedService, setSelectedService] = useState(null);
	const [selectedServiceSlot, setSelectedServiceSlot] = useState('');

	useEffect(() => {
		fetch(`appointmentServices.json`)
			.then(res => res.json())
			.then(data => setAppointmentServices(data));
	}, []);

	return <main className='page appointmentPage'>
		<PageHero selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

		<AvailableServices selectedDate={selectedDate} appointmentServices={appointmentServices} setSelectedService={setSelectedService} setSelectedServiceSlot={setSelectedServiceSlot} />

		<AvailableSlots selectedDate={selectedDate} appointmentServices={appointmentServices} selectedService={selectedService} selectedServiceSlot={selectedServiceSlot} setSelectedServiceSlot={setSelectedServiceSlot} />
	</main>
}
export default Appointment;