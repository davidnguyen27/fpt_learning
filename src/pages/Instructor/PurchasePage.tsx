import "../../styles/instructorEarning.css";
import InstructorLayout from "../../components/Layout/InstructorLayout";
import TablePurchase from "../../components/Tables/TablePurchase";

const PurchasePage: React.FC = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">Purchased Management</h1>
      </section>
      <TablePurchase />
    </InstructorLayout>
  );
};

export default PurchasePage;
