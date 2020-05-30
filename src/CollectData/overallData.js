import axios from "axios";

const url =
  "https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=BD";

export default async () => {
  const res = await axios.get(url);
  return res.data;
};
