import PageHero from './PageHero';
import Infos from './Infos';
import Services from './Services';
import CTA1 from './CTA1';
import CTA2 from './CTA2';
import Testimonial from './Testimonial';
import ContactUs from './ContactUs';

const Home = () => {
	return <main className='page homePage'>
		<PageHero />
		<Infos />
		<Services />
		<CTA1 />
		<CTA2 />
		<Testimonial />
		<ContactUs />
	</main>
}
export default Home;