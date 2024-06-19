import React, { useState } from "react";
import { Button } from "antd";
import {
  CheckOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
} from "@ant-design/icons";

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
];

const features2 = [
  { title: "Memberships" },
  { title: "Blog" },
  { title: "Affiliate marketing" },
  { title: "Third-party code" },
];

const BabyPlan: React.FC = () => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap md:flex-nowrap items-start">
        <div className="flex-grow mb-4 md:mb-0">
          <h3 className="text-2xl font-bold">Baby Plan</h3>
          <p className="text-xl font-semibold text-red-700">$49/month</p>
          <p className="font-semibold text-gray-500">
            Save $79 when paid annually
          </p>
        </div>
        <div className="ml-0 md:ml-4">
          <img
            src="/image/babyPlan.png"
            alt="Business Plan"
            className="w-32 h-32"
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="text-lg text-gray-500 font-semibold mt-12">
        For instructors launching their first digital products.</p>
        <ul className="space-y-2 mt-6">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <li className="flex flex-col">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center">
                    <CheckOutlined
                      className="text-red-500 mr-2 mb-2 mr-4"
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
                  <div className="ml-2 mb-4 mt-4 text-gray-500">
                    {feature.content}
                  </div>
                )}
              </li>
              {index < features.length - 1 && (
                <hr className="my-10 border-gray-200" />
              )}
            </React.Fragment>
          ))}
          <hr className="my-10 border-gray-200" />
          {features2.map((feature2, index2) => (
            <React.Fragment key={index2}>
              <li className="flex flex-col">
                <div
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <CloseOutlined
                      className="text-black mr-2 mb-2 mr-4"
                      style={{ fontWeight: "bold" }}
                    />
                    <h4 className="text-lg font-semibold">{feature2.title}</h4>
                  </div>
                </div>
              </li>
              {index2 < features.length - 1 && (
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

export default BabyPlan;
