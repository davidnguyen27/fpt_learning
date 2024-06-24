import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppHeader from "../../components/Layout/AppHeader";
import Sider from "antd/es/layout/Sider";
import AppFooter from "../../components/Layout/AppFooter";
import { useSider } from "../../app/context/SiderContext";
import StudentCourseDetailContent from "../../components/Student/StudentCourseDetailContent";
import { AppSider } from "../../components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../../models/Types";

const StudentCourseDetailPage: React.FC = () => {
  const { collapsed } = useSider();
  const { courseId } = useParams<{ courseId: string }>();
  const [courseData, setCourseData] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get<Course>(`https://6678548d0bd45250561e50ca.mockapi.io/courses/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={256}
        >
          <AppSider
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <div className="p-4">
              <StudentCourseDetailContent courseData={courseData} />
            </div>
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StudentCourseDetailPage;
