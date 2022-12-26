import SectionTitle from '../../components/SectionTitle/SectionTitle';

import fluorideImg from '../../assets/images/fluoride.png';
import cavityImg from '../../assets/images/cavity.png';
import whiteningImg from '../../assets/images/whitening.png';

const Services = () => {
	const services = [
		{
			_id: 1,
			image: fluorideImg,
			name: 'Fluoride Treatment',
			description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
		},
		{
			_id: 2,
			image: cavityImg,
			name: 'Cavity Filling',
			description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
		},
		{
			_id: 3,
			image: whiteningImg,
			name: 'Teeth Whitening',
			description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
		}
	];

	return <section className='mt-32'>
		<div className='containerFluid'>
			<SectionTitle className='mb-16' title='Services We Provide' subtitle='Our Services' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{services?.map((service, index) => {
					const { image, name, description } = service;
					return <div className='text-center pt-11 pb-8 px-12 rounded-2xl shadow-lg'>
						<img className='inline-block mb-8' src={image} alt={name} />

						<h3 className='text-xl font-semibold text-[var(--gray)] mb-4'>{name}</h3>
						<p className='text-base text-black' dangerouslySetInnerHTML={{ __html: description }} />
					</div>
				})}
			</div>
		</div>
	</section>
}
export default Services;