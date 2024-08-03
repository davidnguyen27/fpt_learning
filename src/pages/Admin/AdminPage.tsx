import React from "react";
import Overview from "../../components/Admin/Overview";
import TotalUserChart from "../../components/Charts/TotalUserChart";
import TotalInstructorChart from "../../components/Charts/TotalInstructorChart";
import FeedbackChart from "../../components/Charts/FeedbackChart";
import AdminLayout from "../../components/Layout/AdminLayout";
import DonutChart from "../../components/Charts/DonutChart";
import LineChart from "../../components/Charts/LineChart";

interface ChartWrapperProps {
  children: React.ReactNode;
  title: string;
  value: string;
  tag?: string;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  children,
  title,
  value,
  tag,
}) => (
  <div className="rounded-lg bg-white p-2 shadow-md sm:p-4">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
      <div className="w-full">
        <h3 className="break-words text-xs font-semibold text-gray-600 sm:text-sm">
          {title}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <p className="mt-1 break-words text-base font-bold sm:text-lg">
            {value}
          </p>
          {tag && (
            <span className="mt-1 inline-block break-words rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-800 sm:mt-0">
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
    <div className="aspect-w-16 aspect-h-9 mt-2 sm:mt-4">{children}</div>
  </div>
);

const AdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <section className="space-y-4 p-2 sm:space-y-6 sm:p-4">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
          Admin Dashboard
        </h1>
        <Overview />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <ChartWrapper
            title="Total Sales"
            value="$1,500,000"
            tag="New $50,000"
          >
            <DonutChart />
          </ChartWrapper>
          <ChartWrapper
            title="Monthly Revenue"
            value="$120,000"
            tag="+15% from last month"
          >
            <LineChart />
          </ChartWrapper>
          <ChartWrapper
            title="Total Users"
            value="15,000"
            tag="500 new this week"
          >
            <TotalUserChart />
          </ChartWrapper>
          <ChartWrapper
            title="Total Instructors"
            value="200"
            tag="10 new this month"
          >
            <TotalInstructorChart />
          </ChartWrapper>
          <ChartWrapper
            title="Feedback Score"
            value="4.8/5"
            tag="Based on 1000 reviews"
          >
            <FeedbackChart />
          </ChartWrapper>
          <ChartWrapper
            title="Active Courses"
            value="50"
            tag="5 added this week"
          >
            <TotalInstructorChart />
          </ChartWrapper>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPage;
