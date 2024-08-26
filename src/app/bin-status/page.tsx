"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";

export interface DataProps {
  id?: string | number;
  filled_level?: number;
  gas_value?: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const airQualityUrl = process.env.NEXT_PUBLIC_AIRQUALITY;


export default function BinStatusPage() {
  const [data, setData] = useState<DataProps | undefined>(undefined);
  const [airQuality, setAirQuality] = useState<number | undefined>(undefined);
  const [refresh, setRefresh] = useState("");

  console.log('ran')
  useEffect(() => {
    const doThis = async () => {
      const response = await fetch(`${apiUrl}/both_sensors/get.php`);
      const data = response.json();
      data.then((res) => {
        setData(res);
        console.log(res, 'res')
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

    fetchAirQuality();
    doThis();
  }, [refresh]);
  
  return (
    <DefaultLayout>
      <div className="box-border flex justify-around">
        <div className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 flex h-72 max-w-sm flex-auto flex-col items-center justify-center rounded-lg border bg-white shadow">
          <h1 className="text-gray-900 dark my-2.5 text-center text-2xl font-bold tracking-tight text-black">
            Bin status
          </h1>
          <div className="my-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-900 bg-yellow-900 text-center text-black">
            <h1 className="text-lg text-xl text-white">
              {/* {data?.filled_level?.toFixed(2)}% */}
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
    </DefaultLayout>
  );
}
