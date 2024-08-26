"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DataProps } from "@/app/bin-status/page";

ChartJS.register(ArcElement, Tooltip, Legend);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const modelapiUrl = process.env.NEXT_PUBLIC_MODEL_API;
const airQualityUrl = process.env.NEXT_PUBLIC_AIRQUALITY;

export interface DataObject {
  [key: string]: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataObject | undefined>(undefined);
  const [binData, setBinData] = useState<DataProps | undefined>(undefined);
  const [airQuality, setAirQuality] = useState<number | undefined>(undefined);
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    const fetchModelData = async () => {
      const response = await fetch(`${modelapiUrl}/predict`);
      const data = await response.json();
      setData(data);
      setTimeout(() => {
        setRefresh(`${Date.now()}`);
      }, 5000);
    };

    const doThis = async () => {
      const response = await fetch(`${apiUrl}/both_sensors/get.php`);
      const data = response.json();
      data.then((res) => {
        setBinData(res);
        setTimeout(() => {
          setRefresh(`${Date.now}`);
        }, 5000);
      });
    };

    const fetchAirQuality = async () => {
      const response = await fetch(`${airQualityUrl}`);
      const data = await response.json();
      const aqi = data?.data?.aqi;
      setAirQuality(aqi);
    };

    fetchModelData();
    fetchAirQuality();
    doThis()
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
          <div>
            <Pie data={chartData} />
          </div>
        )}
        <div className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 flex h-72 max-w-sm flex-auto flex-col items-center justify-center rounded-lg border bg-white shadow">
          <h1 className="text-gray-900 dark my-2.5 text-center text-2xl font-bold tracking-tight text-black">
            Bin status
          </h1>
          <div className="my-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-900 bg-yellow-900 text-center text-black">
            <h1 className="text-lg text-xl text-white">
              {/* {binData?.filled_level?.toFixed(2)}% */}
              33.33%
            </h1>
          </div>
        </div>
        <div className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 flex h-72 max-w-sm flex-auto flex-col items-center justify-center rounded-lg border bg-white shadow">
          <h1 className="text-gray-900 dark my-2.5 text-center text-2xl font-bold tracking-tight text-black">
            Air Quality Indicator
          </h1>
          <div className="my-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-900 bg-yellow-900 text-center text-black">
            <h1 className="text-center text-xl text-white">
              {airQuality?.toFixed(2)}%
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
