import InstructorChart from "../../components/Charts/InstructorChart";
import InstructorLayout from "../../components/Layout/InstructorLayout";
import InstructorOverview from "./InstructorOverview";
import InstructorPie from "./InstructorPie";

const InstructorPage: React.FC = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="text-xl font-bold">Instructor Dashboard</h1>
        <InstructorOverview />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center w-full h-96 md:h-400 lg:h-500">
            <InstructorChart />
          </div>
          <div className="text-center w-full h-96 md:h-400 lg:h-500">
            <InstructorPie />
          </div>
        </div>
      </section>
    </InstructorLayout>
  );
};

export default InstructorPage;
