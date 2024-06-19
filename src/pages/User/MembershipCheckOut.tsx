import React, { useState } from "react";
import { Breadcrumb, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { AppFooter, AppHeader2, DetailCheckOut, PaymentMembership, TotalOrder } from "../../components";
const { Content, Footer } = Layout;

const MembershipCheckOut: React.FC = () => {
  const [nightMode] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout className={nightMode ? "night-mode" : ""}>
      <AppHeader2 />

      <Content>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <div className="bg-white" style={{ padding: "8px 0" }}>
            <Breadcrumb style={{ margin: "16px 0", padding: "0 140px" }}>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/cart")}
                  style={{ cursor: "pointer" }}
                >
                  Paid-Membership
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/checkout")}
                  style={{ cursor: "pointer" }}
                >
                  Check Out
                </span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: "16px 0", padding: "0 140px" }}>
              <h1 className="text-2xl font-semibold mb-4">Membership Check Out</h1>
            </div>
          </div>
          <div className="flex-grow">
            <div className="max-w-7xl mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
                  <DetailCheckOut />
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 h-72">
                  <TotalOrder total={110} originalPrice={160} discountPrice={50} />
                </div>
                <div className="mt-4 bg-white md:col-span-2 rounded-lg shadow-md p-4">
                  <PaymentMembership total={110} originalPrice={160} discountPrice={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          backgroundColor: "black",
          textAlign: "center",
          width: "100%",
          padding: "24px 0",
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default MembershipCheckOut;
