import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import useServiceData from '../../../hooks/useServiceData';
import Loading from '../../../components/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripePK);

const Payment = () => {
	const booking = useLoaderData();
	const { appointmentDate, serviceId, serviceName, serviceSlot } = booking;

	const { service, isLoading } = useServiceData(serviceId);

	const navigation = useNavigation();

	if (isLoading || 'loading' === navigation.state) {
		return <Loading />
	}

	const { price } = service;

	return <main className='page paymentPage my-12'>
		<div className='container'>
			<div>
				<h1 className='text-2xl'>Payment for <span className='font-bold text-[var(--green)]'>{serviceName}</span></h1>

				<p className='mt-4'>Please pay <span className='font-bold text-[var(--green)]'>${price}</span> for your appointment on <strong>{appointmentDate}</strong> at <strong>{serviceSlot}</strong></p>
			</div>

			<div className='max-w-xl bg-white p-12 rounded-lg mt-12'>
				<Elements stripe={stripePromise}>
					<CheckoutForm booking={{ ...booking, price }} />
				</Elements>
			</div>
		</div>
	</main>
}
export default Payment;