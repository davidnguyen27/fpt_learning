import { useParams } from "react-router-dom";
import LearningComponent from "../../components/User/LearningComponent";

const LearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) {
    return <div>Error: Course ID not found.</div>;
  }

  return (
      <LearningComponent courseId={courseId} />
  );
};

export default LearningPage;
