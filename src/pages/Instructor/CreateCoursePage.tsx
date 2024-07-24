import FormCreateCourse from "../../components/Form/FormCreateCourse";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const CreateCoursePage = () => {
  return (
    <InstructorLayout>
      <section className="p-8">
        <h1 className="text-xl font-bold mb-6">
          <i className="fa-solid fa-arrow-trend-up"></i> Create New Course
        </h1>
        <FormCreateCourse
          onSuccess={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>
    </InstructorLayout>
  );
};

export default CreateCoursePage;
