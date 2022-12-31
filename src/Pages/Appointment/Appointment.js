import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import PageHero from './PageHero';
import AvailableServices from './AvailableServices';
import AvailableSlots from './AvailableSlots';
import Loading from '../../components/Loading/Loading';
import { serverLink } from '../../utils/links';

const Appointment = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedService, setSelectedService] = useState(null);
	const [selectedServiceSlot, setSelectedServiceSlot] = useState('');

	const { data: appointmentServices = [], isLoading, refetch } = useQuery({
		queryKey: ['appointmentServices', selectedDate],
		queryFn: () => fetch(`${serverLink}/appointmentServices?date=${format(selectedDate, 'PP')}`).then(res => res.json())
	});

	if (isLoading) {
		return <Loading />
	}

	return <main className='page appointmentPage'>
		<PageHero selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

		<AvailableServices selectedDate={selectedDate} appointmentServices={appointmentServices} setSelectedService={setSelectedService} setSelectedServiceSlot={setSelectedServiceSlot} />

		<AvailableSlots selectedDate={selectedDate} appointmentServices={appointmentServices} selectedService={selectedService} selectedServiceSlot={selectedServiceSlot} setSelectedServiceSlot={setSelectedServiceSlot} refetch={refetch} />
	</main>
}
export default Appointment;