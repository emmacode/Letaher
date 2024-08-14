'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";


interface DataProps {
  id?: string | number;
  filled_level?: number;
  gas_value?: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function BinStatusPage() {
  const [data, setData] = useState<DataProps | undefined>(undefined);
  const [refresh, setRefresh] = useState('');
  useEffect(() => {
    const doThis = async () => {
      const response = await fetch(`${apiUrl}/both_sensors/get.php`);
      const data = response.json();
      data.then((res) => {
        setData(res);
        setTimeout(() => {
          setRefresh(`${Date.now}`);
        }, 5000);
      });
    }
    doThis();
  }, [refresh]);
  return (
    <DefaultLayout>
      <div className = "flex justify-around box-border">
          <div className="flex flex-col justify-center items-center flex-auto max-w-sm bg-white h-72 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
            <h1 className = 'text-2xl font-bold text-black my-2.5 text-center tracking-tight text-gray-900 dark'>Bin status</h1>
            <div className='flex items-center justify-center text-black text-center w-32 h-32 rounded-full border-4 border-yellow-900 bg-yellow-900 my-4'>
              <h1 className = 'text-white text-xl text-lg'>{data?.filled_level?.toFixed(2)}%</h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center flex-auto max-w-sm bg-white h-72 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
            <h1 className = 'text-2xl font-bold text-black my-2.5 text-center tracking-tight text-gray-900 dark'>Air Quality Indicator</h1>
            <div className = 'flex items-center justify-center text-black text-center w-32 h-32 rounded-full border-4 border-yellow-900 bg-yellow-900 my-4'>
              <h1 className = 'text-white text-xl text-center'>{data?.gas_value?.toFixed(2)}%</h1>
              </div>
          </div>
        </div>
    </DefaultLayout>
  );
}
