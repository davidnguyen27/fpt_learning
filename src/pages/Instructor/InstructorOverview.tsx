import React from "react";
import { Card, Col, Row, Typography } from "antd";
import iconCourses from '/icon_course.png';
import iconBook from '/icon_book.png';
import iconSale from '/icon_sale.png';
import iconFollower from '/icon_follower.png';
const { Title } = Typography;

const InstructorOverview: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      <Row gutter={24}>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                <Title level={4}>Total Sales</Title>
                <div>
                    <Title level={1}>1.500.000$</Title>
                    <div style={{ marginTop: '8px' }}> 
                    <span style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>New 50.000 $</span>
                    </div>
                </div>
                </div>
                <img src={iconSale} alt="Sales Icon" style={{ width: '40px', height: '40px' }} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
  <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Title level={4}>Total Courses</Title>
        <div>
          <Title level={1}>12</Title>
          <div style={{ marginTop: '8px' }}>
            <span style={{ backgroundColor: '#9254de', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>New 3</span>
          </div>
        </div>
      </div>
      <img src={iconBook} alt="Courses Icon" style={{ width: '40px', height: '40px' }} />
    </div>
  </Card>
</Col>

<Col span={6}>
  <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Title level={4}>Total Purchased</Title>
        <div>
          <Title level={1}>5</Title>
          <div style={{ marginTop: '8px' }}>
            <span style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>New 1</span>
          </div>
        </div>
      </div>
      <img src={iconCourses} alt="Courses Icon" style={{ width: '40px', height: '40px' }} />
    </div>
  </Card>
</Col>

<Col span={6}>
  <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Title level={4}>Total Followers</Title>
        <div>
          <Title level={1}>2002</Title>
          <div style={{ marginTop: '8px' }}>
            <span style={{ backgroundColor: '#9254de', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>New 293</span>
          </div>
        </div>
      </div>
      <img src={iconFollower} alt="Follower Icon" style={{ width: '40px', height: '40px' }} />
    </div>
  </Card>
</Col>

      </Row>
    </div>
  );
};

export default InstructorOverview;
