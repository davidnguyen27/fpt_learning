import { Divider, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import TabFree from "../Tabs/TabFree";
import TabFormPaid from "../Tabs/TabFormPaid";

interface FormCreatePriceProps {
  goToNextStep: () => void;
  prevStep: () => void;
}

const FormCreatePrice: React.FC<FormCreatePriceProps> = (props) => {
  const { goToNextStep, prevStep } = props;

  const [activeKey, setActiveKey] = useState<string>("1");

  const handleActive = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "1" ? "bg-red-500 text-white" : "bg-slate-200"} px-5 py-3`}
        >
          <i className="fa-solid fa-tag"></i> Free
        </div>
      ),
      children: <TabFree />,
    },
    {
      key: "2",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "2" ? "bg-red-500 text-white" : "bg-slate-200"} px-5 py-3`}
        >
          <i className="fa-solid fa-cart-arrow-down"></i> Paid
        </div>
      ),
      children: <TabFormPaid />,
    },
  ];

  return (
    <>
      <div className="flex items-center text-xl font-medium">
        <i className="fa-solid fa-dollar-sign"></i>
        <span className="ml-3">Price</span>
      </div>
      <Divider />
      <div className="mt-4 bg-slate-200 px-5 py-4">
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          onChange={handleActive}
          items={items}
        />
      </div>
      <div className="flex justify-between">
        <button
          className="mt-6 bg-red-500 px-10 py-3 hover:bg-red-600 text-white"
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          className="mt-6 bg-red-500 px-10 py-3 hover:bg-red-600 text-white"
          onClick={goToNextStep}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FormCreatePrice;
