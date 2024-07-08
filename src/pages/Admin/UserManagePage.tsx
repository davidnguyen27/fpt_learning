import TableUsers from "../../components/Tables/TableUsers";
import AdminLayout from "../../components/Layout/AdminLayout";

const UserManagePage = () => {

  return (
    <AdminLayout>
      <section>
        <h1 className="mb-10 text-xl font-bold">User Management</h1>
      </section>
      <TableUsers />
    </AdminLayout>
  );
};

export default UserManagePage;
