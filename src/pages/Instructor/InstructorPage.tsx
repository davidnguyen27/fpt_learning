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
        <div className="mt-10 grid grid-cols-2 gap-2">
          <div className="text-center" style={{ height: "400px" }}>
            <InstructorChart />
          </div>
          <div className="text-center" style={{ height: "400px" }}>
            <InstructorPie />
          </div>
        </div>
      </section>
    </InstructorLayout>
  );
};

export default InstructorPage;
