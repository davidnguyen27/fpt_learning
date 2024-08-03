import React from "react";
import { Card, Col, Row, Typography } from "antd";
import iconCourses from "/icon_course.png";
import iconBook from "/icon_book.png";
import iconSale from "/icon_sale.png";
import iconFollower from "/icon_follower.png";

const { Title } = Typography;

interface OverviewItem {
  title: string;
  value: string;
  tag: string;
  icon: string;
  color: string;
}

const overviewItems: OverviewItem[] = [
  {
    title: "Total Sales",
    value: "1.500.000$",
    tag: "New 50.000 $",
    icon: iconSale,
    color: "#ff4d4f",
  },
  {
    title: "Total Courses",
    value: "12",
    tag: "New 3",
    icon: iconBook,
    color: "#9254de",
  },
  {
    title: "Total Purchased",
    value: "5",
    tag: "New 1",
    icon: iconCourses,
    color: "#ff4d4f",
  },
  {
    title: "Total Followers",
    value: "2002",
    tag: "New 293",
    icon: iconFollower,
    color: "#9254de",
  },
];

const OverviewCard: React.FC<OverviewItem> = (item) => (
  <Card bodyStyle={{ height: "100%", padding: "16px" }}>
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1 }}>
        <Title level={4} style={{ marginBottom: "8px" }}>
          {item.title}
        </Title>
        <Title level={2} style={{ marginTop: 0, marginBottom: "8px" }}>
          {item.value}
        </Title>
        <div>
          <span
            style={{
              backgroundColor: item.color,
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {item.tag}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "16px", textAlign: "right" }}>
        <img
          src={item.icon}
          alt={`${item.title} Icon`}
          style={{ width: "40px", height: "40px" }}
        />
      </div>
    </div>
  </Card>
);

const InstructorOverview: React.FC = () => {
  const firstGroup = overviewItems.slice(0, 2);
  const secondGroup = overviewItems.slice(2);

  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        {firstGroup.map((item, index) => (
          <Col key={index} xs={24} sm={24} md={12}>
            <OverviewCard {...item} />
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]}>
        {secondGroup.map((item, index) => (
          <Col key={index} xs={24} sm={24} md={12}>
            <OverviewCard {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InstructorOverview;
