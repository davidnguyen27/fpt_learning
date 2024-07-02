import InstructorIcon from "../../../public/image/teacher.png";
import StudentIcon from "../../../public/image/university.png";
import CourseIcon from "../../../public/image/book.png";
import ReportIcon from "../../../public/image/mute.png";

const Overview: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-2 max-sm:grid-cols-1">
      <div className="bg-slate-200">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <h2 className="my-4 text-xl font-semibold">0</h2>
          </div>
          <div>
            <img src={StudentIcon} alt="Trophy Icon" className="h-16 w-16" />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Instructors</h2>
            <h2 className="my-4 text-xl font-semibold">0</h2>
          </div>
          <div>
            <img
              src={InstructorIcon}
              alt="Chalkboard Icon"
              className="h-16 w-16"
            />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Categories</h2>
            <h2 className="my-4 text-xl font-semibold">0</h2>
          </div>
          <div>
            <img src={CourseIcon} alt="Student Icon" className="h-16 w-16" />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Courses</h2>
            <h2 className="my-4 text-xl font-semibold">0</h2>
          </div>
          <div>
            <img src={CourseIcon} alt="Course Icon" className="h-16 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
