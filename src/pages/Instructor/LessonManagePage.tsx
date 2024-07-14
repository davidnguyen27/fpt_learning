import TableLessons from "../../components/Tables/TableLessons";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const LessonManagePage = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">Lesson Management</h1>
      </section>
      <TableLessons />
    </InstructorLayout>
  );
};

export default LessonManagePage;
