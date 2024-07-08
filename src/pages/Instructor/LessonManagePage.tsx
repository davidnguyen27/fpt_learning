import { Tabs, TabsProps } from "antd";
import TableLessons from "../../components/Tables/TableLessons";
import { BarChartOutlined, ContainerOutlined } from "@ant-design/icons";
import TableQuizAssignment from "../../components/Tables/TableQuizAssignment";
import "../../styles/tabCustom.css";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span className="text-sm font-medium">
        <BarChartOutlined /> Lessons
      </span>
    ),
    children: <TableLessons />,
  },
  {
    key: "2",
    label: (
      <span className="text-sm font-medium">
        <ContainerOutlined /> Quizzes/Assignments
      </span>
    ),
    children: <TableQuizAssignment />,
  },
];

const LessonManagePage = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="text-xl font-bold">Lesson Management</h1>
      </section>
      <Tabs defaultActiveKey="1" items={items} className="mt-10" />
    </InstructorLayout>
  );
};

export default LessonManagePage;
