import { StudentCourseListContent } from "../../components";
import MainLayout from "../../components/Layout/MainLayout";

const StudentCourseListPage: React.FC = () => {
  return (
    <MainLayout>
      <section>
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Enrolled Courses</h1>
        </div>
        <StudentCourseListContent />
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            className="w-20 rounded border bg-gray-700 px-3 py-2 text-white hover:bg-red-500 md:w-24 md:px-4 md:py-3 lg:w-28"
          >
            See All
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default StudentCourseListPage;
