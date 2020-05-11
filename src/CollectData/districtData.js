import axios from "axios";

const url = "https://corona-bd.herokuapp.com/district";

const nameMap = [
  { from: "Dhaka City", to: "Dhaka" },
  { from: "Barishal", to: "Barisal" },
  { from: "Jhalokathi", to: "Jhalokati" },
  { from: "Potuakhali", to: "Patuakhali" },
  { from: "Chattogram", to: "Chittagong" },
  { from: "Cumilla", to: "Comilla" },
  { from: "Cox\u2019s bazar", to: "Cox'S Bazar" },
  { from: "Laksmipur", to: "Lakshmipur" },
  { from: "Munshigonj", to: "Munshiganj" },
  { from: "Netrokona", to: "Netrakona" },
  { from: "Hobiganj", to: "Habiganj" },
  { from: "Moulovi Bazar", to: "Moulvibazar" },
  { from: "B. Baria", to: "Brahamanbaria" },
  { from: "Narshingdi", to: "Narsingdi" },
  { from: "Panchagar", to: "Panchagarh" },
  { from: "Chapainawabganj", to: "Nawabganj" },
  { from: "Khagrachari", to: "Khagrachhari" },
  { from: "Rangmati", to: "Rangamati" },
];

export default async () => {
  let res = await axios.get(url);

  nameMap.map((name) => {
    return (res.data.data[
      res.data.data.findIndex((dist) => dist.name === name.from)
    ].name = name.to);
  });

  return res.data;
};
