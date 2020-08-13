import axios from 'axios';

const url = 'https://corona-bd.herokuapp.com/stats';

export default async () => {
  const res = await axios.get(url);

  return res.data;
};
