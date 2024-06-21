import React from 'react';
import { useSider } from "../../app/context/SiderContext";
import { Layout, Table, Card, Row, Col } from 'antd';
import { AppHeader, AppFooter } from "../../components";
import SiderInstructor from "../../components/Instructor/SiderInstructor";
import Sider from "antd/es/layout/Sider";

const { Header, Content, Footer } = Layout;

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    className: 'bg-gray-700 text-white', // Tailwind classes for table header
  },
  {
    title: 'Item Sales Count',
    dataIndex: 'itemSalesCount',
    key: 'itemSalesCount',
    className: 'bg-gray-700 text-white',
  },
  {
    title: 'Earning',
    dataIndex: 'earning',
    key: 'earning',
    className: 'bg-gray-600 text-white',
  },
];

const data = [
  { key: 1, date: '1, Wednesday', itemSalesCount: 3, earning: '$120.50' },
  { key: 2, date: '2, Thursday', itemSalesCount: 2, earning: '$84.00' },
  { key: 3, date: '4, Saturday', itemSalesCount: 4, earning: '$150.50' },
  { key: 4, date: '5, Sunday', itemSalesCount: 3, earning: '$102.24' },
  { key: 5, date: '6, Monday', itemSalesCount: 2, earning: '$80.50' },
  { key: 6, date: '7, Tuesday', itemSalesCount: 3, earning: '$70.50' },
  { key: 7, date: '8, Wednesday', itemSalesCount: 5, earning: '$130.00' },
  { key: 8, date: '9, Thursday', itemSalesCount: 3, earning: '$95.50' },
  { key: 9, date: '10, Friday', itemSalesCount: 4, earning: '$152.50' },
  { key: 10, date: '11, Saturday', itemSalesCount: 3, earning: '$100.40' },
  { key: 11, date: '12, Sunday', itemSalesCount: 2, earning: '$60.14' },
];

const topCountries = [
  { country: 'United States', amount: '$48' },
  { country: 'Bulgaria', amount: '$35' },
  { country: 'Dominica', amount: '$25' },
  { country: 'Italy', amount: '$18' },
  { country: 'Korea, Republic of', amount: '$18' },
  { country: 'Malaysia', amount: '$10' },
  { country: 'Netherlands', amount: '$8' },
  { country: 'Thailand', amount: '$5' },
];

const EarningPage: React.FC = () => {
  const { collapsed } = useSider();

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header bg-gray-800 text-white">
        <AppHeader />
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
            <div className="p-8 flex">
              <section className="w-1/4 pr-4">
                <h2 className="text-lg font-bold mb-4">Your Top Countries</h2>
                <ul className="list-none p-0">
                  {topCountries.map((country, index) => (
                    <li key={index} className="flex justify-between py-1 border-b border-gray-200">
                      <span>{country.country}</span>
                      <span>{country.amount}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="flex-1">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card
                      title={<span className="text-white">Sales earnings this month (April), after edututs+ fees, & before taxes:</span>}
                      bordered={false}
                      className="bg-red-600 text-white"
                    >
                      <p className="text-2xl font-bold text-center">$1146.78</p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={<span className="text-white">Your balance:</span>} bordered={false} className="bg-red-600 text-white">
                      <p className="text-2xl font-bold text-center">$1146.78</p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={<span className="text-white">Total value of your sales, before taxes:</span>} bordered={false} className="bg-red-600 text-white">
                      <p className="text-2xl font-bold text-center">$95895.54</p>
                    </Card>
                  </Col>
                </Row>
                <div className="mt-8">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    footer={() => <div className="text-white bg-red-700 p-2 text-center">Total: $1146.78</div>}
                    className="custom-table bg-white"
                  />
                </div>
              </section>
            </div>
            <Footer className="footer bg-gray-800 text-white">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EarningPage;
