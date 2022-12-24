import { Link } from 'react-router-dom';

import bgImg from '../../assets/images/footer.png';

const Footer = () => {
	const titleClassName = 'footer-title text-lg font-bold';
	const linkClassName = 'text-base text-[var(--gray)]'

	return <footer className='mainFooter bg-cover bg-center bg-no-repeat pt-20 pb-11' style={{ backgroundImage: `url(${bgImg})` }}>
		<div className='footer container'>
			<div>
				<span className={titleClassName}>Services</span>
				<Link to='/' className={linkClassName}>Emergency Checkup</Link>
				<Link to='/' className={linkClassName}>Monthly Checkup</Link>
				<Link to='/' className={linkClassName}>Weekly Checkup</Link>
				<Link to='/' className={linkClassName}>Deep Checkup</Link>
			</div>
			<div>
				<span className={titleClassName}>Oral Health</span>
				<Link to='/' className={linkClassName}>Fluoride Treatment</Link>
				<Link to='/' className={linkClassName}>Cavity Filling</Link>
				<Link to='/' className={linkClassName}>Teeth Whitening</Link>
			</div>
			<div>
				<span className={titleClassName}>Our Address</span>
				<Link to='/' className={linkClassName}>New York - 101010 Hudson</Link>
			</div>
		</div>

		<p className='text-center text-base mt-20'>Copyright {new Date().getFullYear()} All Rights Reserved</p>
	</footer>
}
export default Footer;