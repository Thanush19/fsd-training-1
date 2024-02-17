import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  // Mocked-up past watch buying data
  const pastData = [
    { month: "Jan", quantitySold: 50 },
    { month: "Feb", quantitySold: 60 },
    { month: "Mar", quantitySold: 70 },
    { month: "Apr", quantitySold: 65 },
    { month: "May", quantitySold: 80 },
    { month: "Jun", quantitySold: 75 },
  ];

  // Mocked-up predicted future sales data
  const futurePredictions = [
    { month: "Jul", predictedQuantity: 80 },
    { month: "Aug", predictedQuantity: 85 },
    { month: "Sep", predictedQuantity: 90 },
    { month: "Oct", predictedQuantity: 95 },
    { month: "Nov", predictedQuantity: 100 },
    { month: "Dec", predictedQuantity: 105 },
  ];

  return (
    <div>
      <h1>Ecommerce Analytics Dashboard</h1>
      <div>
        <h2>Past Watch Buying History</h2>
        <LineChart
          width={600}
          height={300}
          data={pastData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="quantitySold"
            stroke="rgb(75, 192, 192)"
          />
        </LineChart>
      </div>
      <div>
        <h2>Predictive Analytics for Future Sales</h2>
        <LineChart
          width={600}
          height={300}
          data={futurePredictions}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="predictedQuantity"
            stroke="rgb(255, 99, 132)"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
