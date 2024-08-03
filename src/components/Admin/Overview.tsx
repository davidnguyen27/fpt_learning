import React from "react";
import InstructorIcon from "../../assets/Image/teacher.png";
import StudentIcon from "../../assets/Image/university.png";
import CourseIcon from "../../assets/Image/book.png";
import { Card } from "antd";

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: string;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card className={`${color} text-white shadow-lg`}>
    <div className="flex items-center justify-between p-3 sm:p-4">
      <div>
        <h2 className="text-sm font-semibold sm:text-base">{title}</h2>
        <p className="mt-2 text-lg font-bold sm:text-xl">{value}</p>
      </div>
      <img
        src={icon}
        alt={`${title} Icon`}
        className="h-10 w-10 sm:h-12 sm:w-12"
      />
    </div>
  </Card>
);

const SmallStatCard: React.FC<{
  title: string;
  value: string;
  icon: string;
}> = ({ title, value, icon }) => (
  <Card className="bg-white shadow">
    <div className="flex items-center justify-between p-3">
      <div>
        <h2 className="text-xs font-semibold text-gray-600 sm:text-sm">
          {title}
        </h2>
        <p className="mt-1 text-sm font-bold text-gray-800 sm:text-base">
          {value}
        </p>
      </div>
      <img src={icon} alt={`${title} Icon`} className="h-8 w-8" />
    </div>
  </Card>
);

const Overview: React.FC = () => {
  return (
    <div className="mt-4 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Account Active"
          value="1000"
          icon={InstructorIcon}
          color="bg-teal-500"
        />
        <StatCard
          title="Total Account Disabled"
          value="1000"
          icon={StudentIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Account"
          value="2000"
          icon={StudentIcon}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <SmallStatCard title="Total Courses" value="1000" icon={CourseIcon} />
        <SmallStatCard
          title="Total Reported Posts"
          value="1000"
          icon={CourseIcon}
        />
        <SmallStatCard title="Profit" value="$10000" icon={CourseIcon} />
        <SmallStatCard title="Total Order" value="1000" icon={CourseIcon} />
        <SmallStatCard title="Order Cancelled" value="1000" icon={CourseIcon} />
      </div>
    </div>
  );
};

export default Overview;
