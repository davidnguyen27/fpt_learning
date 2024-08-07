import { Card, Col, Row, Typography, Grid } from "antd";
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
              <div></div>{" "}
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
              <div></div>{" "}
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
                {/* <Title level={screens.xs ? 3 : 2}>{totalStudents}</Title> */}
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
                {/* <Title level={screens.xs ? 3 : 2}>{totalBlogs}</Title> */}
              </div>
              <ContainerOutlined
                style={{ fontSize: "32px", color: "orange" }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
