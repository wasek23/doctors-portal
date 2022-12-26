import SectionTitle from '../../components/SectionTitle/SectionTitle';
import bgImg from '../../assets/images/appointment.png';

const ContactUs = () => {
	return <section className='mt-36' style={{ backgroundImage: `url(${bgImg})` }}>
		<div className='w-full max-w-md mx-auto'>
			<SectionTitle className='mb-10' title='Stay connected with us' titleClassName='text-white' subtitle='Contact Us' />

			<form>
				<div className='mb-5'>
					<input className='input w-full' type='email' id='email' name='email' placeholder='Email Address' />
				</div>

				<div className='mb-5'>
					<input className='input w-full' type='text' id='subject' name='subject' placeholder='Subject' />
				</div>

				<div className='mb-5'>
					<textarea className='textarea w-full h-36' id='message' name='message' placeholder='Your Message' />
				</div>

				<div className='text-center'>
					<button type='submit' className='btn'>Submit</button>
				</div>
			</form>
		</div>
	</section>
}
export default ContactUs;