import { LockOutlined } from "@ant-design/icons";
import React from "react";

interface OrderSummaryProps {
  total: number;
  originalPrice: number;
  discountPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
  originalPrice,
  discountPrice,
}) => {
  return (
    <div className="p-4">
      <div className="relative mb-4">
        <h2 className="inline-block text-lg font-bold">Total</h2>
        <span
          className="mt-2 block h-1 bg-red-500"
          style={{
            width: "calc(15% + 4px)",
            height: "1.5px",
            marginLeft: "-2px",
            marginBottom: "2px",
          }}
        ></span>
      </div>
      <div className="mt-2 flex justify-between font-semibold">
        <span>Original Price</span>
        <span className="text-black">${originalPrice}</span>
      </div>
      <hr className="mt-6" />
      <div className="mt-2 flex justify-between">
        <span>Discount Price</span>
        <span className="font-semibold text-gray-500">${discountPrice}</span>
      </div>
      <hr className="mt-6" />
      <div className="mt-2 flex justify-between font-bold">
        <span>Total</span>
        <span className="text-black">${total}</span>
      </div>
      <hr className="mt-6" />
      <span className="mx-12 mt-4 block px-14 py-2">
        <LockOutlined /> Secure checkout
      </span>
    </div>
  );
};

export default OrderSummary;
