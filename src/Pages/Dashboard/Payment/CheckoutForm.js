import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { serverLink } from '../../../utils/links';

const CheckoutForm = ({ booking }) => {
	const { _id, name, email, price } = booking;

	const stripe = useStripe();
	const elements = useElements();

	const [clientSecret, setClientSecret] = useState('');
	const [success, setSuccess] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState('');
	const [cardError, setCardError] = useState('');

	useEffect(() => {
		fetch(`${serverLink}/create-payment-intent`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authentication: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({ price })
		})
			.then(res => res.json())
			.then(data => setClientSecret(data?.clientSecret));
	}, [price]);


	const onCheckout = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (null === card) {
			return;
		}

		const { error } = await stripe.createPaymentMethod({
			type: 'card',
			card
		});

		if (error) {
			setCardError(error?.message);
		} else {
			setCardError('');
		}

		setSuccess('');
		setProcessing(true);

		const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card,
				billing_details: { name, email }
			}
		});


		if (confirmError) {
			setCardError(confirmError?.message);
			return;
		}

		if ('succeeded' === paymentIntent.status) {
			const payment = {
				bookingId: _id,
				price,
				transactionId: paymentIntent.id,
				email
			}

			fetch(`${serverLink}/payments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authentication: `Bearer ${localStorage.getItem('accessToken')}`
				},
				body: JSON.stringify(payment)
			})
				.then(res => res.json())
				.then(data => {
					if (data.insertedId) {
						setSuccess('Congrats! your payment is completed.');
						setTransactionId(paymentIntent.id);
					}
				});
		}

		setProcessing(false);
	}

	return <>
		<form onSubmit={onCheckout}>
			<CardElement
				options={{
					style: {
						base: {
							fontSize: '16px',
							color: '#424770',
							'::placeholder': {
								color: '#aab7c4',
							},
						},
						invalid: {
							color: '#9e2146',
						},
					},
				}}
			/>

			<div className='text-center'>
				<button type='submit' className='btn mt-8' disabled={!stripe || !clientSecret || processing}>Pay Now</button>
			</div>
		</form>

		{success && <p className='text-center text-[var(--green)] mt-6'>{success}</p>}
		{transactionId && <p className='text-center text-[var(--gray)] mt-4'>Your transaction id: {transactionId}</p>}
		{cardError && <p className='text-center text-red-500 mt-6'>{cardError}</p>}
	</>
}
export default CheckoutForm;