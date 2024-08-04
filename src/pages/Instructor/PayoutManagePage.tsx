import InstructorLayout from "../../components/Layout/InstructorLayout";
import TablePayout from "../../components/Tables/TablePayout";

const PayoutManagePage = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">
          <i className="fa-solid fa-wallet"></i> Payout
        </h1>
        <TablePayout />
      </section>
    </InstructorLayout>
  );
};

export default PayoutManagePage;
