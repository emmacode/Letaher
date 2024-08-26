import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title:
    "Letaher",
  description: "Welcome to letaher, an Intelligent Waste Management System",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
