import React from 'react';
import { useSider } from "../../app/context/SiderContext";
import { Layout, Button, List, Avatar, Dropdown, Menu } from 'antd';
import { AppHeader, AppFooter } from "../../components";
import SiderInstructor from "../../components/Instructor/SiderInstructor";
import Sider from 'antd/es/layout/Sider';
import { BellOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const systemAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtq-pCUyQVchDDETZuTPFhrB70gPJbU9HNA&s";

const notifications = [
  {
    title: "Quốc Huy",
    description: "Like Your Comment On Video How to create sidebar menu.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2 min ago"
  },
  {
    title: "Vĩnh Hưng",
    description: "Added New Review In Video Full Stack PHP Developer.",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    time: "12 min ago"
  },
  {
    title: "System",
    description: "Your Membership Activated.",
    avatar: "",
    time: "20 min ago"
  },
  {
    title: "System",
    description: "Your Course Approved Now. How to create sidebar menu.",
    avatar: "",
    time: "20 min ago"
  }
];

const NotificationPage: React.FC = () => {
  const { collapsed } = useSider();

  const handleButtonClick = (message: string) => {
    alert(message);
  };

  const handleBellClick = () => {
    alert('Notification Bell Clicked');
  };

  const notificationMenu = (
    <Menu className="w-72">
      <div className="p-4">
        <h1 className="text-lg font-bold">Notifications</h1>
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={item => (
            <List.Item className="hover:bg-gray-200 my-2 p-2 rounded-lg">
              <List.Item.Meta
                avatar={
                  item.avatar ? (
                    <Avatar src={item.avatar} />
                  ) : (
                    <Avatar src={systemAvatar} />
                  )
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description={
                  <div>
                    {item.description}
                    <div className="text-gray-500 text-sm mt-1">{item.time}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <Button className="w-full mt-2 bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 text-white">
          View All
        </Button>
      </div>
    </Menu>
  );

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        
        <AppHeader />
        <Dropdown overlay={notificationMenu} trigger={['click']}>
          <Button type="text" icon={<BellOutlined className="text-xl" />} onClick={handleBellClick} />
        </Dropdown>
     </Header>
      
      <Layout className="flex flex-1 overflow-y-auto">
        <Sider
          className="sider bg-gray-800"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={230}
        >
          <SiderInstructor
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"} bg-gray-800 text-white`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto bg-gray-100">
            <div className="p-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Button 
                  type="primary" 
                  className="mt-2 bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                  onClick={() => handleButtonClick('Notification Settings Clicked')}
                >
                  Notification Settings
                </Button>
              </div>
              <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={item => (
                  <List.Item className="hover:bg-gray-200 my-2 p-2 rounded-lg">
                    <List.Item.Meta
                      avatar={
                        item.avatar ? (
                          <Avatar src={item.avatar} />
                        ) : (
                          <Avatar src={systemAvatar} />
                        )
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={
                        <div>
                          {item.description}
                          <div className="text-gray-500 text-sm mt-1">{item.time}</div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Content>
          <Footer className="footer bg-gray-800 text-white">
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default NotificationPage;
