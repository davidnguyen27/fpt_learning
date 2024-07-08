import TableCategories from "../../components/Tables/TableCagories";
import MainLayout from "../../components/Layout/MainLayout";

const CategoriesManagePage = () => {
  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Categories Management</h1>
      </section>
      <TableCategories />
    </MainLayout>
  );
};

export default CategoriesManagePage;
