import axios from 'axios';
import { districtCacheKey } from './data';

const url = 'https://corona-bd.herokuapp.com/district';

const nameMap = [
	{ from: 'Dhaka City', to: 'Dhaka' },
	{ from: 'Barishal', to: 'Barisal' },
	{ from: 'Jhalokathi', to: 'Jhalokati' },
	{ from: 'Chattogram', to: 'Chittagong' },
	{ from: 'Cumilla', to: 'Comilla' },
	{ from: 'Cox\u2019s bazar', to: "Cox'S Bazar" },
	{ from: 'Laksmipur', to: 'Lakshmipur' },
	{ from: 'Munshigonj', to: 'Munshiganj' },
	{ from: 'Netrokona', to: 'Netrakona' },
	{ from: 'Hobiganj', to: 'Habiganj' },
	{ from: 'Moulovi Bazar', to: 'Moulvibazar' },
	{ from: 'B. Baria', to: 'Brahamanbaria' },
	{ from: 'Narshingdi', to: 'Narsingdi' },
	{ from: 'Panchagar', to: 'Panchagarh' },
	{ from: 'Chapainawabganj', to: 'Nawabganj' },
	{ from: 'Khagrachari', to: 'Khagrachhari' },
	{ from: 'Rangmati', to: 'Rangamati' },
	{ from: 'Bogura', to: 'Bogra' },
];

export default async () => {
	let res;
	try {
		res = await axios.get(url);
		localStorage.setItem(districtCacheKey, JSON.stringify(res));
	} catch (e) {
		// if response fails use cached data
		res = localStorage.getItem(districtCacheKey);
		res = JSON.parse(res);
	}

	nameMap.map((name) => {
		if (
			res.data.data[
				res.data.data.findIndex((dist) => dist.name === name.from)
			]
		) {
			return (res.data.data[
				res.data.data.findIndex((dist) => dist.name === name.from)
			].name = name.to);
		} else {
			return name;
		}
	});

	return res.data;
};
