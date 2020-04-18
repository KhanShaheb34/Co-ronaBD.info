import axios from "axios";
import { parse } from "node-html-parser";

const url = "https://cors-anywhere.herokuapp.com/http://www.iedcr.gov.bd/";

export default async () => {
  const res = await axios.get(url, {
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   Origin: "http://www.iedcr.gov.bd/",
    // },
  });
  const root = parse(res.data);

  // Table for finding the time and test informations
  const tableRow = root.querySelectorAll("tr");

  // Getting the time from the table
  const lastUpdate = tableRow[0].childNodes[1].childNodes[0].rawText
    .split(" ")[2]
    .split("-")
    .reverse()
    .join("-");
  // String time to Date object
  const lastUpdateTime = new Date(lastUpdate);

  // Getting the test informations
  let testInfo = {
    test_conducted_24_hour: tableRow[1].childNodes[7].childNodes[0].rawText,
    test_conducted_total: tableRow[2].childNodes[7].childNodes[0].rawText,
    test_positive_24_hour: tableRow[3].childNodes[7].childNodes[0].rawText,
    test_positive_total: tableRow[4].childNodes[7].childNodes[0].rawText,
  };

  // Recover and Death Info
  const colSm3 = root.querySelectorAll(".col-sm-3");
  let recoverAndDeath = {
    recovered_24_hour: colSm3[0].querySelector("h3").childNodes[0].rawText,
    recovered_total: colSm3[1].querySelector("h3").childNodes[0].rawText,
    death_24_hour: colSm3[2].querySelector("h3").childNodes[0].rawText,
    death_total: colSm3[3].querySelector("h3").childNodes[0].rawText,
  };

  return { lastUpdateTime, ...testInfo, ...recoverAndDeath };
};
