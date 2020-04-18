import axios from "axios";

const url =
  "https://cors-anywhere.herokuapp.com/https://corona-bd.herokuapp.com/district";

export default async () => {
  let res = await axios.get(url);
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Dhaka City")
  ].name = "Dhaka";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Barishal")
  ].name = "Barisal";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Jhalokathi")
  ].name = "Jhalokati";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Potuakhali")
  ].name = "Patuakhali";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Chattogram")
  ].name = "Chittagong";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Cumilla")
  ].name = "Comilla";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Cox\u2019s bazar")
  ].name = "Cox'S Bazar";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Laksmipur")
  ].name = "Lakshmipur";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Munshigonj")
  ].name = "Munshiganj";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Netrokona")
  ].name = "Netrakona";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Hobiganj")
  ].name = "Habiganj";
  res.data.data[
    res.data.data.findIndex((dist) => dist.name === "Moulovi Bazar")
  ].name = "Maulvibazar";

  return res.data;
};
