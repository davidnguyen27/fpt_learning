import Overview from "../../components/Instructor/Overview";
import MainLayout from "../../components/Layout/MainLayout";

const StudentPage: React.FC = () => {
  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Student Dashboard</h1>
        <Overview />
      </section>
    </MainLayout>
  );
};

export default StudentPage;
