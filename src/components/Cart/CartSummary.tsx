import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  price_paid: number;
  price: number;
  discount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  price_paid,
  price,
  discount,
}) => {
  const navigate = useNavigate();
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
        <span>Price</span>
        <span className="text-black">${price}</span>
      </div>
      <hr className="mt-6" />
      <div className="mt-2 flex justify-between">
        <span>Discount</span>
        <span className="font-semibold text-gray-500">${discount}</span>
      </div>
      <hr className="mt-6" />
      <div className="mt-2 flex justify-between font-bold">
        <span>Total</span>
        <span className="text-black">${price_paid}</span>
      </div>
      <hr className="mt-6" />
      <Button
        type="primary"
        danger
        style={{ display: "block", width: "100%", marginTop: "16px" }}
        onClick={() => navigate("/checkout")}
      >
        Check Out Now
      </Button>
    </div>
  );
};

export default CartSummary;
