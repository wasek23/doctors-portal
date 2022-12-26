import SectionTitle from '../../components/SectionTitle/SectionTitle';
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';
import quoteIcon from '../../assets/icons/quote.svg';

const Testimonials = () => {
	const testimonials = [
		{
			_id: 1,
			photo: people1,
			name: 'Winson Herry',
			location: 'California',
			text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
		},
		{
			_id: 2,
			photo: people2,
			name: 'Winson Herry',
			location: 'California',
			text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
		},
		{
			_id: 3,
			photo: people3,
			name: 'Winson Herry',
			location: 'California',
			text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
		}
	]

	return <section className='mt-24'>
		<div className='containerFluid'>
			<div className='flex items-center justify-between mb-20'>
				<SectionTitle title='What Our Patients Says' subtitle='Testimonial' alignment='left' />

				<img src={quoteIcon} className='w-24 lg:w-48' alt='Quote icon' />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{testimonials?.map((service, index) => {
					const { _id, photo, name, location, text } = service;
					return <div key={_id} className='py-9 px-7 rounded-2xl shadow-lg'>
						<p className='text-base text-black mb-8' dangerouslySetInnerHTML={{ __html: text }} />

						<div className='flex items-center gap-5'>
							<img className='inline-block w-16 h-16 p-1 rounded-full' src={photo} alt={name} style={{ border: '3px solid var(--green)' }} />

							<div>
								<h3 className='text-xl font-semibold text-[var(--gray)] mb-1'>{name}</h3>
								<p className='text-base text-black'>{location}</p>
							</div>
						</div>
					</div>
				})}
			</div>
		</div>
	</section>
}
export default Testimonials;