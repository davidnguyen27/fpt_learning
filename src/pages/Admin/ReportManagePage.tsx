import TableReport from "../../components/Tables/TableReports";
import AdminLayout from "../../components/Layout/AdminLayout";

const ReportManagePage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="text-xl font-bold">Report Management</h1>
      </section>
      <div className="mt-4 bg-slate-200 p-4">
        <input
          style={{ width: "100%" }}
          type="text"
          placeholder="Search by phone..."
          className="h-8 rounded-md pl-8 text-xs"
        />
      </div>
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center">
          <i className="fa-solid fa-filter"></i>
          <div className="mx-4">
            Title name:
            <select className="ml-2" title="Category">
              <option value="">Web Development</option>
              <option value="instructor">Business</option>
              <option value="student">Design</option>
            </select>
          </div>
        </div>
      </div>
      <TableReport />
    </AdminLayout>
  );
};

export default ReportManagePage;
