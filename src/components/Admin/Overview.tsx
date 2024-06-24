import TrophyIcon from '../../assets/icons/trophy.png';
import ChalkBoardIcon from '../../assets/icons/chalkboard.png';
import StudentIcon from '../../assets/icons/student.png';
import CourseIcon from '../../assets/icons/course.png';

const Overview: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-2 max-sm:grid-cols-1">
      <div className="bg-slate-200">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Sales</h2>

            <h2 className="my-4 text-xl font-semibold">0</h2>
          </div>
          <div>
          <img src={TrophyIcon} alt="Trophy Icon" className="w-16 h-16" />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Enroll</h2>
            <h2 className="my-4 text-xl font-semibold">0</h2>
          </div>
          <div>
          <img src={ChalkBoardIcon} alt="Chalkboard Icon" className="w-16 h-16" />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Students</h2>
            <h2 className="my-4 text-xl font-semibold">0</h2>
          </div>
          <div>
          <img src={StudentIcon} alt="Student Icon" className="w-16 h-16" />
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
          <img src={CourseIcon} alt="Course Icon" className="w-16 h-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
