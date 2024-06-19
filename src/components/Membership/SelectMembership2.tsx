import React, { useState } from "react";
import { Button } from "antd";
import { CheckOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

const features = [
  { title: "Your own shop", content: "Detailed description of Your own shop." },
  {
    title: "Online courses",
    content: "Detailed description of Online courses.",
  },
  {
    title: "Email marketing",
    content: "Detailed description of Email marketing.",
  },
  { title: "Messaging", content: "Detailed description of Messaging." },
  {
    title: "Zero charges on 10 sales",
    content: "Detailed description of Zero charges on 10 sales.",
  },
  {
    title: "7-days-a-week support",
    content: "Detailed description of 7-days-a-week support.",
  },
  {
    title: "Memberships",
    content: "Detailed description of 7-days-a-week support.",
  },
  { title: "Blog", content: "Detailed description of 7-days-a-week support." },
  {
    title: "Affiliate marketing",
    content: "Detailed description of 7-days-a-week support.",
  },
  {
    title: "Third-party code",
    content: "Detailed description of 7-days-a-week support.",
  },
];

const BusinessPlan: React.FC = () => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-start md:flex-nowrap">
        <div className="mb-4 flex-grow md:mb-0">
          <h3 className="text-2xl font-bold">Business Plan</h3>
          <p className="text-xl font-semibold text-red-700">$99/month</p>
          <p className="font-semibold text-gray-500">
            Save $189 when paid annually
          </p>
        </div>
        <div className="ml-0 md:ml-4">
          <img
            src="/image/BusinessPlan2.png"
            alt="Business Plan"
            className="h-32 w-32"
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="mt-12 text-lg font-semibold text-gray-500">
          For instructors who are ready to grow their business.
        </p>
        <ul className="mt-6 space-y-2">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <li className="flex flex-col">
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center">
                    <CheckOutlined
                      className="mb-2 mr-4 text-red-500"
                      style={{ fontWeight: "bold" }}
                    />
                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                  </div>
                  {openItemIndex === index ? (
                    <MinusOutlined />
                  ) : (
                    <PlusOutlined />
                  )}
                </div>
                {openItemIndex === index && (
                  <div className="mb-4 ml-2 mt-4 text-gray-500">
                    {feature.content}
                  </div>
                )}
              </li>
              {index < features.length - 1 && (
                <hr className="my-10 border-gray-200" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <Button
          type="primary"
          style={{
            backgroundColor: "red",
            borderColor: "red",
            width: "500px",
            height: "50px",
          }}
        >
          Purchase Membership
        </Button>
      </div>
    </div>
  );
};

export default BusinessPlan;
