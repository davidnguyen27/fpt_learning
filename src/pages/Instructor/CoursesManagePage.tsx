import TableCourses from "../../components/Tables/TableCourses";

import "../../styles/tabCustom.css";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const CoursesManagePage = () => {
  

  return (
    <InstructorLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">Courses Management</h1>
      </section>
      <TableCourses />
    </InstructorLayout>
  );
};

export default CoursesManagePage;
