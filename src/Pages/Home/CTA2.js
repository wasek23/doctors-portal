import { Link } from 'react-router-dom';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import doctorImg from '../../assets/images/doctor-small.png';
import bgImg from '../../assets/images/appointment.png';

const CTA2 = () => {
	return <section className='mt-60 max-h-[530px]' style={{ backgroundImage: `url(${bgImg})` }}>
		<div className='container max-h-[530px] flex items-center gap-7'>
			<img src={doctorImg} className='w-1/2 self-end hidden lg:inline-block' alt='Doctor' />

			<div className='flex flex-col justify-center py-16'>
				<SectionTitle className='mb-4' title='Make an appointment Today' titleClassName='text-white' subtitle='Appointment' alignment='left' />

				<p className='text-base text-white mb-10'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>

				<Link to='/' className='btn w-fit'>Get Started</Link>
			</div>
		</div>
	</section>
}
export default CTA2;