import axios from 'axios';
import { statCacheKey } from './data';

const url = 'https://corona-bd.herokuapp.com/stats';

export default async () => {
	let res;
	try {
		res = await axios.get(url);
		localStorage.setItem(statCacheKey, JSON.stringify(res));
	} catch (e) {
		// if response fails use cached data
		res = localStorage.getItem(statCacheKey);
		res = JSON.parse(res);
	}

	return res.data;
};
