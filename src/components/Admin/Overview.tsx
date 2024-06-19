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
            <i className="fa-solid fa-trophy text-4xl"></i>
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
            <i className="fa-solid fa-chalkboard-user text-4xl"></i>
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
            <i className="fa-solid fa-users text-4xl"></i>
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
            <i className="fa-solid fa-book-open text-4xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
