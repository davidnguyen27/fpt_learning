import React from "react";

interface OrderSummaryProps {
  total: number;
  originalPrice: number;
  discountPrice: number;
}

const OrderTotal: React.FC<OrderSummaryProps> = ({
  total,
  originalPrice,
  discountPrice,
}) => {
  return (
    <div className="p-4 mt-4">
      <div className="relative mb-8">
        <h2 className="font-semibold text-lg inline-block">
        Order Details
        </h2>
        <span
          className="block h-1 bg-red-500 mt-2"
          style={{
            width: "50px",
            height: "1.5px",
            marginLeft: "-2px",
            marginBottom: "2px",
          }}
        ></span>
      </div>
      <div className="font-semibold flex justify-between mt-2 text-15">
        <span>
          Complete Python Bootcamp: Go from zero to hero in Python 3
        </span>
        <span className="text-black">${originalPrice}</span>
      </div>
      <hr className="mt-6" />
      <div className="flex justify-between mt-2 text-15">
        <span>Discount</span>
        <span className="font-semibold text-gray-500">${discountPrice}</span>
      </div>
      <hr className="mt-6" />
      <div className="font-bold flex justify-between mt-2 text-15">
        <span>Total</span>
        <span className="text-black">${total}</span>
      </div>
    </div>
  );
};

export default OrderTotal;
