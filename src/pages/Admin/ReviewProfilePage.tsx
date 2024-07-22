import AdminLayout from "../../components/Layout/AdminLayout";
import TableReviewProfile from "../../components/Tables/TableReviewProfile";

const ReviewProfilePage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="text-xl font-bold">Instructor Request</h1>
      </section>
      <TableReviewProfile />
    </AdminLayout>
  );
};

export default ReviewProfilePage;
