
import "../../styles/tabCustom.css";
import TableSessions from "../../components/Tables/TableSessions";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const SessionManagePage = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">Session Management</h1>
      </section>
      <TableSessions />
    </InstructorLayout>
  );
};

export default SessionManagePage;
