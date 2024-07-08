import { Tabs, TabsProps } from "antd";
import TableCourses from "../../components/Tables/TableCourses";
import { useNavigate } from "react-router-dom";
import TableUpcomingCourses from "../../components/Tables/TableUpComingCourses";
import { ArrowUpOutlined, ReadOutlined } from "@ant-design/icons";
import MainLayout from "../../components/Layout/MainLayout";
import "../../styles/tabCustom.css";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span className="text-sm font-medium">
        <ReadOutlined /> Courses
      </span>
    ),
    children: <TableCourses />,
  },
  {
    key: "2",
    label: (
      <span className="text-sm font-medium">
        <ArrowUpOutlined /> Upcoming Courses
      </span>
    ),
    children: <TableUpcomingCourses />,
  },
];

const CoursesManagePage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Courses Management</h1>
      </section>
      <div className="mt-4 flex items-center justify-between bg-slate-200 p-4">
        <div className="flex items-center">
          <ReadOutlined />
          <span className="text-md ml-4 font-semibold">
            Jump Into Course Creation
          </span>
        </div>
        <div>
          <button
            className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
            onClick={() =>
              navigate("/instructor/courses-management/create-course-step")
            }
          >
            Create Your Courses
          </button>
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} className="mt-10" />
    </MainLayout>
  );
};

export default CoursesManagePage;
