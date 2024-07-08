import Overview from "../../components/Admin/Overview";
import TotalUserChart from "../../components/Charts/TotalUserChart";
import TotalInstructorChart from "../../components/Charts/TotalInstructorChart";
import FeedbackChart from "../../components/Charts/FeedbackChart";
import MainLayout from "../../components/Layout/MainLayout";

const AdminPage = () => {
  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Overview />
        <div className="mt-10 grid grid-cols-2 gap-2">
          <div className="text-center">
            <TotalUserChart />
            <p className="text-sm font-bold">User chart</p>
          </div>
          <div className="text-center">
            <TotalInstructorChart />
            <p className="text-sm font-bold">Instructor chart</p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2">
          <div className="text-center">
            <FeedbackChart />
            <p className="text-sm font-bold">Feedback chart</p>
          </div>
          <div className="text-center">
            <TotalInstructorChart />
            <p className="text-sm font-bold">Report chart</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminPage;
