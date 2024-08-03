import "../../styles/instructorEarning.css";
import InstructorLayout from "../../components/Layout/InstructorLayout";
import TablePurchase from "../../components/Tables/TablePurchase";

const PurchasePage: React.FC = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="text-xl font-bold">Earning</h1>
      </section>
      <TablePurchase />
    </InstructorLayout>
  );
};

export default PurchasePage;
