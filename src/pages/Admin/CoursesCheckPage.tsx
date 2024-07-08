import TableCheck from "../../components/Tables/TableCheck";
import AdminLayout from "../../components/Layout/AdminLayout";

const CoursesCheckPage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="text-xl font-bold">Course Management</h1>
      </section>
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center">
          <i className="fa-solid fa-filter"></i>
          <div className="mx-4">
            Category name:
            <select className="ml-2" title="Category">
              <option value="">Web Development</option>
              <option value="instructor">Business</option>
              <option value="student">Design</option>
            </select>
          </div>
        </div>
      </div>
      <TableCheck />
    </AdminLayout>
  );
};

export default CoursesCheckPage;
