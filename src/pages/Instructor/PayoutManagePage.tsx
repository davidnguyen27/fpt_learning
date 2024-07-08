import TablePayout from "../../components/Tables/TablePayout";
import MainLayout from "../../components/Layout/MainLayout";

const PayoutManagePage = () => {
  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">
          <i className="fa-solid fa-wallet"></i> Payout
        </h1>
        <TablePayout />
      </section>
    </MainLayout>
  );
};

export default PayoutManagePage;
