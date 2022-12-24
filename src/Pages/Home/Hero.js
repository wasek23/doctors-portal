import { Link } from 'react-router-dom';

import chairBGImg from '../../assets/images/bg.png';
import chairImg from '../../assets/images/chair.png';

const Hero = () => {
	return <section className='bg-cover bg-center bg-no-repeat py-52 mt-3' style={{ backgroundImage: `url(${chairBGImg})` }}>
		<div className='container grid grid-cols-1 lg:grid-cols-2 gap-6'>
			<div className='flex flex-col justify-center'>
				<h1 className='text-5xl font-bold text-[var(--gray)] mb-4'>Your New Smile Starts Here</h1>

				<p className='text-base text-[var(--gray)] mb-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>

				<Link to='/' className='btn w-fit'>Get Started</Link>
			</div>

			<img src={chairImg} alt='Patient chair' />
		</div>
	</section>
}
export default Hero;