import PageHero from './PageHero';
import Infos from './Infos';
import Services from './Services';
import CTA1 from './CTA1';
import CTA2 from './CTA2';
import Testimonials from './Testimonials';
import ContactUs from './ContactUs';

const Home = () => {
	return <main className='page homePage'>
		<PageHero />
		<Infos />
		<Services />
		<CTA1 />
		<CTA2 />
		<Testimonials />
		<ContactUs />
	</main>
}
export default Home;