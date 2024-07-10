import ReportContents from "../../components/Report/ReportContents";
import ReportForm from "../../components/Report/ReportForm";
import MainLayout from "../../components/Layout/MainLayout";

const ReportPage = () => {
  return (
    <MainLayout>
      <ReportContents />
      <ReportForm />
    </MainLayout>
  );
};

export default ReportPage;
