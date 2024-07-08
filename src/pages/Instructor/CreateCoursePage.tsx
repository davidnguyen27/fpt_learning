import FormCreateCourse from "../../components/Form/FormCreateCourse";
import MainLayout from "../../components/Layout/MainLayout";

const CreateCoursePage = () => {
  return (
    <MainLayout>
      <section className="p-8">
        <h1 className="text-xl font-bold">
          <i className="fa-solid fa-arrow-trend-up"></i> Create New Course
        </h1>
        <FormCreateCourse
          goToNextStep={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>
    </MainLayout>
  );
};

export default CreateCoursePage;
