import TableReviews from "../../components/Tables/TableReviews";
import MainLayout from "../../components/Layout/MainLayout";

const ReviewManagePage = () => {
  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Review Management</h1>
      </section>
      <TableReviews />
    </MainLayout>
  );
};

export default ReviewManagePage;
