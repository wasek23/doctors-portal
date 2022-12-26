import { DayPicker } from 'react-day-picker';

import Hero from '../../components/Hero/Hero';

const PageHero = ({ selectedDate, setSelectedDate }) => {
	return <Hero>
		<div className='w-full flex flex-col justify-center items-center mb-8 lg:mb-0'>
			<DayPicker className='bg-white p-6 rounded-xl shadow-lg' mode='single' selected={selectedDate} onSelect={setSelectedDate} />
		</div>
	</Hero>
}
export default PageHero;