import React from "react";
import { Table, Card, Row, Col } from "antd";
import "../../styles/instructorEarning.css";
import MainLayout from "../../components/Layout/MainLayout";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    className: "bg-gray-700 text-white text-center",
  },
  {
    title: "Item Sales Count",
    dataIndex: "itemSalesCount",
    key: "itemSalesCount",
    className: "bg-gray-700 text-white text-center",
  },
  {
    title: "Earning",
    dataIndex: "earning",
    key: "earning",
    className: "bg-gray-600 text-white text-center",
  },
];

const data = [
  { key: 1, date: "1, Wednesday", itemSalesCount: 3, earning: "$120.50" },
  { key: 2, date: "2, Thursday", itemSalesCount: 2, earning: "$84.00" },
  { key: 3, date: "4, Saturday", itemSalesCount: 4, earning: "$150.50" },
  { key: 4, date: "5, Sunday", itemSalesCount: 3, earning: "$102.24" },
  { key: 5, date: "6, Monday", itemSalesCount: 2, earning: "$80.50" },
  { key: 6, date: "7, Tuesday", itemSalesCount: 3, earning: "$70.50" },
  { key: 7, date: "8, Wednesday", itemSalesCount: 5, earning: "$130.00" },
  { key: 8, date: "9, Thursday", itemSalesCount: 3, earning: "$95.50" },
  { key: 9, date: "10, Friday", itemSalesCount: 4, earning: "$152.50" },
  { key: 10, date: "11, Saturday", itemSalesCount: 3, earning: "$100.40" },
  { key: 11, date: "12, Sunday", itemSalesCount: 2, earning: "$60.14" },
];

const topCountries = [
  { country: "United States", amount: "$48" },
  { country: "Bulgaria", amount: "$35" },
  { country: "Dominica", amount: "$25" },
  { country: "Italy", amount: "$18" },
  { country: "Korea, Republic of", amount: "$18" },
  { country: "Malaysia", amount: "$10" },
  { country: "Netherlands", amount: "$8" },
  { country: "Thailand", amount: "$5" },
];

const EarningPage: React.FC = () => {
  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Earning</h1>
      </section>
      <section className="flex-1">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title={
                <span className="text-white">
                  Sales earnings this month (April)
                </span>
              }
              bordered={false}
              className="bg-gray-700 text-center text-white"
            >
              <p className="text-center text-2xl font-bold">$1146.78</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={<span className="text-white">Your balance:</span>}
              bordered={false}
              className="bg-gray-700 text-center text-white"
            >
              <p className="text-center text-2xl font-bold">$1146.78</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={
                <span className="text-white">
                  Total value of your sales, before taxes:
                </span>
              }
              bordered={false}
              className="bg-gray-700 text-center text-white"
            >
              <p className="text-center text-2xl font-bold">$95895.54</p>
            </Card>
          </Col>
        </Row>
        <div className="mt-8 flex justify-between gap-4">
          <section className="h-80 w-full max-w-md bg-white p-6 shadow">
            <h2 className="mb-4 text-center text-lg font-bold">
              Your Top Countries
            </h2>
            <ul className="list-none p-2">
              {topCountries.map((country, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b border-gray-200 py-1"
                >
                  <span>{country.country}</span>
                  <span>{country.amount}</span>
                </li>
              ))}
            </ul>
          </section>

          <Table
            className="custom-table no-hover text-center"
            columns={columns}
            dataSource={data}
            pagination={false}
            style={{ width: "800px" }}
            footer={() => (
              <div className="bg-gray-700 p-2 text-center text-white">
                Total: $1146.78
              </div>
            )}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default EarningPage;
