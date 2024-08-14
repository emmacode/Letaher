"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const apiUrl = process.env.NEXT_PUBLIC_MODEL_API;

interface DataObject {
  [key: string]: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataObject | undefined>(undefined);
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    const doThis = async () => {
      const response = await fetch(`${apiUrl}/predict`);
      const data = await response.json();
      setData(data);
      setTimeout(() => {
        setRefresh(`${Date.now()}`);
      }, 5000);
    };
    doThis();
  }, [refresh]);

  const chartData = {
    labels: data ? Object.keys(data) : [],
    datasets: [
      {
        data: data ? Object.values(data) : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {data && (
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
