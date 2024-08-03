import AdminLayout from "../../components/Layout/AdminLayout";
import TableAdminPayout from "../../components/Tables/TableAdminPayout";

const PayoutManagePage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="text-xl font-bold">
          <i className="fa-solid fa-wallet"></i> Payout Management
        </h1>
        <TableAdminPayout />
      </section>
    </AdminLayout>
  );
};

export default PayoutManagePage;
