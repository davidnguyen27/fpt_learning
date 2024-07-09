import TableCategories from "../../components/Tables/TableCagories";
import AdminLayout from "../../components/Layout/AdminLayout";

const CategoriesManagePage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="text-xl font-bold">Categories Management</h1>
      </section>
      <TableCategories />
    </AdminLayout>
  );
};

export default CategoriesManagePage;
