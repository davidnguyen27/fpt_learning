import React from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import DonutChart from "../../components/Charts/DonutChart";
import InstructorChart from "../../components/Charts/InstructorChart";
import Overview from "../../components/Admin/Overview";

const AdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <section className="space-y-4 p-2 sm:space-y-6 sm:p-4">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
          Admin Dashboard
        </h1>
        <Overview />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="md:h-400 lg:h-500 h-96 w-full text-center">
            <InstructorChart />
          </div>
          <div className="md:h-400 lg:h-500 h-96 w-full text-center">
            <DonutChart />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPage;
