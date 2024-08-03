import Layout, { Content } from "antd/es/layout/layout";
import InstructorLayout from "../../components/Layout/InstructorLayout";
import ProfileClient from "../../components/Instructor/ProfileClient";
import { useParams } from "react-router-dom";

const InstructorProfilePage = () => {
  const { instructor_id } = useParams<{ instructor_id: string | undefined }>();
  const { _id } = useParams<{ _id: string }>();

  if (!instructor_id) {
    return <div>Error: Instructor ID not found.</div>;
  }

  return (
    <InstructorLayout>
      <Layout>
        <Content className="flex-1 overflow-y-auto">
          <ProfileClient userId={instructor_id} courseId={_id} />
        </Content>
      </Layout>
    </InstructorLayout>
  );
};

export default InstructorProfilePage;
