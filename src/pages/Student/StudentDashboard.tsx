import React from 'react';
import { Row, Col, Card, Typography, List, Avatar } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import StudentLayout from '../../components/Layout/StudentLayout';
import iconCourses from '/icon_course.png';
import iconInstructor from '/icon_instructor.png';
const { Title } = Typography;

const StudentDashboard: React.FC = () => {
  return (
    <StudentLayout>
    <div style={{ padding: '20px' }}>
      <Row gutter={24}>
      <Col span={12}>
  <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Title level={4}>Total Purchased Courses</Title>
        <div>
          <Title level={1}>15</Title>
          <div style={{ marginTop: '8px' }}>
            <span style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>New 5</span>
          </div>
        </div>
      </div>
      <img src={iconCourses} alt="Courses Icon" style={{ width: '40px', height: '40px' }} />
    </div>
  </Card>
</Col>

<Col span={12}>
  <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Title level={4}>Total Instructors Subscribing</Title>
        <div>
          <Title level={1}>45</Title>
          <div style={{ marginTop: '8px' }}>
            <span style={{ backgroundColor: '#9254de', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>New 3</span>
          </div>
        </div>
      </div>
      <img src={iconInstructor} alt="Courses Icon" style={{ width: '40px', height: '40px' }} />
    </div>
  </Card>
</Col>

      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="What's new in FSA Education?">
            <List
              dataSource={[
                'Improved performance on Studio Dashboard',
                'See more Dashboard updates',
                'See issues-at-glance for Live',
              ]}
              renderItem={(item) => (
                <List.Item>{item}</List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="News">
            <Card.Meta
              avatar={<Avatar icon={<PlayCircleOutlined />} style={{ backgroundColor: '#ff4d4f' }} />}
              title="COVID-19 Updates & Resources"
              description="See the latest updates to coronavirus-related content, including changes to monetization, and access new Creator support resources"
            />
          </Card>
        </Col>
      </Row>
    </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
