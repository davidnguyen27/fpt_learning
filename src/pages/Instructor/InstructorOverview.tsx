import { Card, Col, Row, Typography, Grid } from "antd";
import iconCourses from "/icon_course.png";
import iconBook from "/icon_book.png";
import iconSale from "/icon_sale.png";
import iconFollower from "/icon_follower.png";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const cardStyle = {
  width: "100%",
  height: "150px",
};

const InstructorOverview: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 5 : 4}>Total Sales</Title>
                <div>
                  <Title
                    level={screens.xs ? 3 : 2}
                    className="my-4 text-xl font-semibold"
                  >
                    $1000
                  </Title>
                  <div style={{ marginTop: "8px" }}></div>
                </div>
              </div>
              <img
                src={iconSale}
                alt="Sales Icon"
                style={{
                  width: screens.xs ? "30px" : "40px",
                  height: screens.xs ? "30px" : "40px",
                }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 5 : 4}>Total Courses</Title>
                <div>
                  <Title level={screens.xs ? 3 : 2}>4</Title>
                  <div style={{ marginTop: "8px" }}></div>
                </div>
              </div>
              <img
                src={iconBook}
                alt="Courses Icon"
                style={{
                  width: screens.xs ? "30px" : "40px",
                  height: screens.xs ? "30px" : "40px",
                }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 5 : 4}>Total Purchased</Title>
                <div>
                  <Title level={screens.xs ? 3 : 2}>$999</Title>
                  <div style={{ marginTop: "8px" }}></div>
                </div>
              </div>
              <img
                src={iconCourses}
                alt="Courses Icon"
                style={{
                  width: screens.xs ? "30px" : "40px",
                  height: screens.xs ? "30px" : "40px",
                }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 5 : 4}>Total Followers</Title>
                <div>
                  <Title level={screens.xs ? 3 : 2}>10</Title>
                  <div style={{ marginTop: "8px" }}></div>
                </div>
              </div>
              <img
                src={iconFollower}
                alt="Follower Icon"
                style={{
                  width: screens.xs ? "30px" : "40px",
                  height: screens.xs ? "30px" : "40px",
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InstructorOverview;
