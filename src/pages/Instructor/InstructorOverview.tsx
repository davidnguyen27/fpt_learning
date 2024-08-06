import React, { useState, useEffect } from "react";
import { Card, Col, Row, Typography, Grid } from "antd";
import iconCourses from "/icon_course.png";
import iconBook from "/icon_book.png";
import iconSale from "/icon_sale.png";
import iconFollower from "/icon_follower.png";
import usePayoutsData from "../../hooks/payout/usePayoutsData";
import { DataTransfer as PayoutDataTransfer } from "../../models/Payout";
import { DataTransfer as CourseDataTransfer } from "../../models/Course";
import { DataTransfer as PurchaseDataTransfer } from "../../models/Purchase";
import useCourseData from "../../hooks/course/useCourseData";
import { usePurchases } from "../../hooks/purchase/usePurchase";
import useFetchSubscriptionsForInstructer from "../../hooks/supscription/useSubscriptionDataForInstructor";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const cardStyle = {
  width: "100%",
  height: "150px",
};

const InstructorOverview: React.FC = () => {
  const screens = useBreakpoint();
  const userId = "your_user_id_here";

  // Initialize state variables for data
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [totalFollowers, setTotalFollowers] = useState<number>(0); // Assume fixed for now

  // Payout data
  const payoutDataTransfer: PayoutDataTransfer = {
    searchCondition: {
      payout_no: "",
      instructor_id: "", // Adjust the instructor_id as needed
      status: "",
      is_instructor: true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 100, // Adjust page size if necessary
    },
  };
  const { data: payoutsData, loading: payoutsLoading } =
    usePayoutsData(payoutDataTransfer);

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

  // Purchase data
  const purchaseDataTransfer: PurchaseDataTransfer = {
    searchCondition: {
      purchase_no: "",
      cart_no: "",
      course_id: "",
      status: "",
      is_deleted: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
  };
  const { data: purchasesData, loading: purchasesLoading } =
    usePurchases(purchaseDataTransfer);

  // Subscription For Instructor Data
  const { subscriptions: subscribedData, loading: subscribedLoading } =
    useFetchSubscriptionsForInstructer(userId);

  // Update state variables once data is loaded
  useEffect(() => {
    if (!payoutsLoading && payoutsData) {
      // Calculate total sales by summing up balance_instructor_received
      const total = payoutsData.reduce(
        (acc, payout) => acc + payout.balance_instructor_received,
        0,
      );
      setTotalSales(total);
    }
  }, [payoutsData, payoutsLoading]);

  useEffect(() => {
    if (!coursesLoading && coursesData) {
      setTotalCourses(coursesData.length);
    }
  }, [coursesData, coursesLoading]);

  useEffect(() => {
    if (!purchasesLoading && purchasesData) {
      setTotalPurchases(purchasesData.length);
    }
  }, [purchasesData, purchasesLoading]);

  useEffect(() => {
    if (!subscribedLoading && subscribedData) {
      setTotalFollowers(subscribedData.length);
    }
  }, [subscribedData, subscribedLoading]);

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
                    $
                    {totalSales.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
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
                  <Title level={screens.xs ? 3 : 2}>{totalCourses}</Title>
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
                  <Title level={screens.xs ? 3 : 2}>{totalPurchases}</Title>
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
                  <Title level={screens.xs ? 3 : 2}>{totalFollowers}</Title>
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
