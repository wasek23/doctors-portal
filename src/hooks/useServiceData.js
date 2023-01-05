import { useQuery } from '@tanstack/react-query';

import { serverLink } from '../utils/links';

const useServiceData = (serviceId) => {
	const { data: service = [], isLoading } = useQuery({
		queryKey: ['service', serviceId],
		queryFn: async () => {
			const res = await fetch(`${serverLink}/appointmentServices/${serviceId}`);
			const data = await res.json();
			return data;
		}
	});

	return { service, isLoading };
}
export default useServiceData;