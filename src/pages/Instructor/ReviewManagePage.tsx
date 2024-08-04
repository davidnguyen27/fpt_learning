import TableReviews from "../../components/Tables/TableReviews";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const ReviewManagePage = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">Review Management</h1>
      </section>
      <TableReviews />
    </InstructorLayout>
  );
};

export default ReviewManagePage;
