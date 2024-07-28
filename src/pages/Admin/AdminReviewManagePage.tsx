
import AdminLayout from "../../components/Layout/AdminLayout";
import AdminReviewTable from "../../components/Tables/AdminReviewTable";

const ReviewManagePage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="text-xl font-bold">Review Management</h1>
      </section>
      <AdminReviewTable />
    </AdminLayout>
  );
};

export default ReviewManagePage;
