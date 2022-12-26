import { Link } from 'react-router-dom';

import treatmentImg from '../../assets/images/treatment.png';

const CTA1 = () => {
	return <section className='mt-36'>
		<div className='container flex flex-col lg:flex-row gap-10 lg:gap-24'>
			<img src={treatmentImg} className='lg:w-2/5' alt='Patient chair' />

			<div className='flex flex-col justify-center'>
				<h1 className='text-5xl font-bold text-[var(--gray)] mb-6'>Exceptional Dental Care, on Your Terms</h1>

				<p className='text-base text-[var(--gray)] mb-10'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>

				<Link to='/' className='btn w-fit'>Get Started</Link>
			</div>
		</div>
	</section>
}
export default CTA1;