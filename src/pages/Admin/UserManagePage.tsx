import TableUsers from "../../components/Tables/TableUsers";
import MainLayout from "../../components/Layout/MainLayout";

const UserManagePage = () => {

  return (
    <MainLayout>
      <section>
        <h1 className="mb-10 text-xl font-bold">User Management</h1>
      </section>
      <TableUsers />
    </MainLayout>
  );
};

export default UserManagePage;
