import { useParams } from "react-router-dom";
import LearningLayout from "../../components/Layout/LearningLayout";
import LearningComponent from "../../components/User/LearningComponent";

const LearningPage: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();

  if (!_id) {
    return <div>Error: Course ID not found.</div>;
  }

  return (
    <LearningLayout>
      <LearningComponent courseId={_id} />
    </LearningLayout>
  );
};

export default LearningPage;
