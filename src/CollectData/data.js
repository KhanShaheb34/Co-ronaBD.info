import overallData from './overallData';
import districtData from './districtData';

export const districtCacheKey = 'coronainfo:district';
export const statCacheKey = 'coronainfo:stats';

export default async () => {
	const overall = await overallData();
	const district = await districtData();
	return {
		...overall,
		districts: district.data,
		district_data_updated_on: district.updated_on,
	};
};
