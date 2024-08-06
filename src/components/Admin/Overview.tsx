import React, { useState, useEffect } from "react";
import { Card, Col, Row, Typography, Grid } from "antd";
import { DataTransfer as CourseDataTransfer } from "../../models/Course";
import useCourseData from "../../hooks/course/useCourseData";
import { UserSearchRequest } from "../../models/Types";
import useUserData from "../../hooks/user/useUserData";
import { DataTransfer as BlogDataTransfer } from "../../models/Blog";
import useBlogsData from "../../hooks/blog/useBlogData";
import {
  ContainerOutlined,
  TeamOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const cardStyle = {
  width: "100%",
  height: "150px",
};

const Overview: React.FC = () => {
  const screens = useBreakpoint();

  // Initialize state variables for data
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalInstructors, setTotalInstructors] = useState<number>(0);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);

  // Course data
  const courseDataTransfer: CourseDataTransfer = {
    searchCondition: {
      keyword: "",
      category_id: "",
      status: "",
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 100, // Adjust page size if necessary
    },
  };
  const { data: coursesData, loading: coursesLoading } =
    useCourseData(courseDataTransfer);

  // User data for instructors and students
  const userSearchRequestInstructors: UserSearchRequest = {
    searchCondition: {
      keyword: "",
      role: "instructor",
      status: true,
      is_verified: true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
  };
  const { data: instructorsData, loading: instructorsLoading } = useUserData(
    userSearchRequestInstructors,
  );

  const userSearchRequestStudents: UserSearchRequest = {
    searchCondition: {
      keyword: "",
      role: "student",
      status: true,
      is_verified: true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
  };
  const { data: studentsData, loading: studentsLoading } = useUserData(
    userSearchRequestStudents,
  );

  // Blog data
  const blogDataTransfer: BlogDataTransfer = {
    searchCondition: {
      category_id: "",
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
  };
  const { data: blogsData, loading: blogsLoading } =
    useBlogsData(blogDataTransfer);

  useEffect(() => {
    if (!coursesLoading && coursesData) {
      setTotalCourses(coursesData.length);
    }
  }, [coursesData, coursesLoading]);

  useEffect(() => {
    if (!instructorsLoading && instructorsData) {
      setTotalInstructors(instructorsData.data.pageData.length);
    }
  }, [instructorsData, instructorsLoading]);

  useEffect(() => {
    if (!studentsLoading && studentsData) {
      setTotalStudents(studentsData.data.pageData.length);
    }
  }, [studentsData, studentsLoading]);

  useEffect(() => {
    if (!blogsLoading && blogsData) {
      setTotalBlogs(blogsData.length);
    }
  }, [blogsData, blogsLoading]);

  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div>
              <Title level={screens.xs ? 5 : 4}>Total courses</Title>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 3 : 2}>{totalCourses}</Title>
              </div>{" "}
              <YoutubeOutlined style={{ fontSize: "32px", color: "red" }} />
              </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div>
              <Title level={screens.xs ? 5 : 4}>Total Instructors</Title>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 3 : 2}>{totalInstructors}</Title>
              </div>{" "}
              <TeamOutlined style={{ fontSize: "32px", color: "blue" }} />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div>
              <Title level={screens.xs ? 5 : 4}>Total Students</Title>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 3 : 2}>{totalStudents}</Title>
              </div>{" "}
              <TeamOutlined style={{ fontSize: "32px", color: "green" }} />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div>
              <Title level={screens.xs ? 5 : 4}>Total Blogs</Title>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 3 : 2}>{totalBlogs}</Title>
              </div>
              <ContainerOutlined style={{ fontSize: "32px", color: "orange" }} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
