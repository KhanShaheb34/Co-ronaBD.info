import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer,
  Label,
  Tooltip,
} from "recharts";

const DataFormater = (number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number > 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
};

const DateFormater = (date) => date.split("-").slice(1, 3).reverse().join("/");

const TimeChart = (props) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ bottom: 25, top: 25, left: -25 }}>
        <XAxis dataKey="date" tickFormatter={DateFormater}>
          <Label value="Date" offset={0} position="bottom" />
        </XAxis>
        <YAxis tickFormatter={DataFormater} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="confirmed"
          stroke="#e74c3c"
          strokeWidth={2}
          dot={false}
          legendType="rect"
        />
        <Line
          type="monotone"
          dataKey="recovered"
          stroke="#27ae60"
          strokeWidth={2}
          dot={false}
          legendType="rect"
        />
        <Line
          type="monotone"
          dataKey="deaths"
          stroke="#f39c12"
          strokeWidth={2}
          dot={false}
          legendType="rect"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeChart;
