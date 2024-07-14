import TableCourses from "../../components/Tables/TableCourses";
import { useNavigate } from "react-router-dom";
import { ReadOutlined } from "@ant-design/icons";
import "../../styles/tabCustom.css";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const CoursesManagePage = () => {
  const navigate = useNavigate();

  return (
    <InstructorLayout>
      <section>
        <h1 className="text-xl font-bold">Courses Management</h1>
      </section>
      <div className="my-4 flex items-center justify-between bg-slate-200 p-4">
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
      <TableCourses />
    </InstructorLayout>
  );
};

export default CoursesManagePage;
