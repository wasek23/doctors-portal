import chairBGImg from '../../assets/images/bg.png';
import chairImg from '../../assets/images/chair.png';

const Hero = ({ children }) => {
	return <section className='bg-cover bg-center bg-no-repeat py-12 lg:py-52 mt-3' style={{ backgroundImage: `linear-gradient(to bottom, transparent 90%, #fff), url(${chairBGImg})` }}>
		<div className='container flex flex-col lg:flex-row-reverse gap-14 lg:gap-6'>
			<img src={chairImg} className='lg:w-1/2' alt='Patient chair' />

			{children}
		</div>
	</section>
}
export default Hero;