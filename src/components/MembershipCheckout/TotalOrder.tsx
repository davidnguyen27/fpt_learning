import { LockOutlined } from "@ant-design/icons";
import React from "react";

interface OrderSummaryProps {
  total: number;
  originalPrice: number;
  discountPrice: number;
}

const TotalOrder: React.FC<OrderSummaryProps> = ({
  total,
  originalPrice,
  discountPrice,
}) => {
  return (
    <div className="p-4">
      <div className="relative mb-4">
        <h2 className="font-bold text-lg inline-block">Total</h2>
        <span
          className="block h-1 bg-red-500 mt-2"
          style={{
            width: "calc(15% + 4px)",
            height: "1.5px",
            marginLeft: "-2px",
            marginBottom: "2px",
          }}
        ></span>
      </div>
      <div className="font-semibold flex justify-between mt-2">
        <span>Original Price</span>
        <span className="text-black">${originalPrice}</span>
      </div>
      <hr className="mt-6" />
      <div className="flex justify-between mt-2">
        <span>Taxes(GST)</span>
        <span className="font-semibold text-gray-500">${discountPrice}</span>
      </div>
      <hr className="mt-6" />
      <div className="font-bold flex justify-between mt-2">
        <span>Total</span>
        <span className="text-black">${total}</span>
      </div>
      <hr className="mt-6" />
      <span className="mt-4 mx-12 py-2 px-14 block">
        <LockOutlined /> Secure checkout
      </span>
    </div>
  );
};

export default TotalOrder;
