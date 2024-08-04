import { useParams } from "react-router-dom";
import LearningLayout from "../../components/Layout/LearningLayout";
import LearningComponent from "../../components/User/LearningComponent";

const LearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) {
    return <div>Error: Course ID not found.</div>;
  }

  return (
    <LearningLayout>
      <LearningComponent courseId={courseId} />
    </LearningLayout>
  );
};

export default LearningPage;
