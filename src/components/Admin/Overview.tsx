import React from "react";
import InstructorIcon from "../../assets/Image/teacher.png";
import StudentIcon from "../../assets/Image/university.png";
import CourseIcon from "../../assets/Image/book.png";
import { Card } from "antd";

const Overview: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-teal-500 text-white">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold">Total Account Active</h2>
              <h2 className="my-4 text-xl font-semibold">1000</h2>
            </div>
            <div>
              <img src={InstructorIcon} alt="Instructor Icon" className="h-16 w-16" />
            </div>
          </div>
        </Card>
        <Card className="bg-blue-500 text-white">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold">Total Account Disabled</h2>
              <h2 className="my-4 text-xl font-semibold">1000</h2>
            </div>
            <div>
              <img src={StudentIcon} alt="Student Icon" className="h-16 w-16" />
            </div>
          </div>
        </Card>
        <Card className="bg-green-500 text-white">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold">Total Account</h2>
              <h2 className="my-4 text-xl font-semibold">1000</h2>
            </div>
            <div>
              <img src={StudentIcon} alt="Student Icon" className="h-16 w-16" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="bg-slate-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-sm font-semibold">Total Courses</h2>
              <h2 className="my-2 text-sm font-semibold">1000</h2>
            </div>
            <div>
              <img src={CourseIcon} alt="Course Icon" className="h-8 w-8" />
            </div>
          </div>
        </Card>
        <Card className="bg-slate-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-sm font-semibold">Total Reported Posts</h2>
              <h2 className="my-2 text-sm font-semibold">1000</h2>
            </div>
            <div>
              <img src={CourseIcon} alt="Reported Post Icon" className="h-8 w-8" />
            </div>
          </div>
        </Card>
        <Card className="bg-slate-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-sm font-semibold">Profit</h2>
              <h2 className="my-2 text-sm font-semibold">$10000</h2>
            </div>
            <div>
              <img src={CourseIcon} alt="Profit Icon" className="h-8 w-8" />
            </div>
          </div>
        </Card>
        <Card className="bg-slate-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-sm font-semibold">Total Order</h2>
              <h2 className="my-2 text-sm font-semibold">1000</h2>
            </div>
            <div>
              <img src={CourseIcon} alt="Order Icon" className="h-8 w-8" />
            </div>
          </div>
        </Card>
        <Card className="bg-slate-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-sm font-semibold">Order Cancelled</h2>
              <h2 className="my-2 text-sm font-semibold">1000</h2>
            </div>
            <div>
              <img src={CourseIcon} alt="Cancelled Order Icon" className="h-8 w-8" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
