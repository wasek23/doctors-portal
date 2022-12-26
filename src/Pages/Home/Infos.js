import { useEffect, useState } from 'react';

import { serverLink } from '../../utils/links';

const Infos = () => {
	const [infos, setInfos] = useState([]);

	useEffect(() => {
		fetch(`${serverLink}/infos`)
			.then(res => res.json())
			.then(data => setInfos(data));
	});

	return <section>
		<div className='containerFluid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{infos?.map((feature, index) => {
				const { _id, title, description, icon } = feature;
				return <div key={_id} className={`flex items-center gap-5 py-12 px-6 rounded-2xl ${0 === (index % 2) ? 'bgPrimary' : 'bgSecondary'}`}>
					<span dangerouslySetInnerHTML={{ __html: icon }} />

					<div>
						<h3 className='text-xl font-bold text-white mb-4'>{title}</h3>
						<p className='text-base text-white' dangerouslySetInnerHTML={{ __html: description }} />
					</div>
				</div>
			})}
		</div>
	</section>
}
export default Infos;