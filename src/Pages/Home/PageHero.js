import { Link } from 'react-router-dom';

import Hero from '../../components/Hero/Hero';

const PageHero = () => {
	return <Hero>
		<div className='flex flex-col justify-center mb-8 lg:mb-0'>
			<h1 className='text-5xl font-bold text-[var(--gray)] mb-4'>Your New Smile Starts Here</h1>

			<p className='text-base text-[var(--gray)] mb-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>

			<Link to='/' className='btn w-fit'>Get Started</Link>
		</div>
	</Hero>
}
export default PageHero;