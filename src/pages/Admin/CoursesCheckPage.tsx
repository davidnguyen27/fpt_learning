import TableCheck from "../../components/Tables/TableCheck";
import AdminLayout from "../../components/Layout/AdminLayout";

const CoursesCheckPage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="mb-10 text-xl font-bold">Course Request</h1>
      </section>
      <TableCheck />
    </AdminLayout>
  );
};

export default CoursesCheckPage;
