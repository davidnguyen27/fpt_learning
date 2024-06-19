import React, { useState } from "react";
import "../../styles/index.css";
import PaymentButton from "../Checkout/PaymentButton";
import PaymentForm from "../Form/PaymentForm";
import Confirm from "./Confirm";

interface OrderSummaryProps {
  total: number;
  originalPrice: number;
  discountPrice: number;
}

const PaymentMembership: React.FC<OrderSummaryProps> = ({
  total,
  originalPrice,
  discountPrice,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handlePaymentSelect = (paymentMethod: string) => {
    setSelectedPayment(
      paymentMethod === selectedPayment ? null : paymentMethod,
    );
  };

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <h2 className="inline-block text-lg font-semibold">
          Select Payment Method
        </h2>
        <span
          className="mt-2 block h-1 bg-red-500"
          style={{
            width: "50px",
            height: "1.5px",
            marginLeft: "-2px",
            marginBottom: "2px",
          }}
        ></span>
      </div>
      <PaymentButton
        selectedPayment={selectedPayment}
        handlePaymentSelect={handlePaymentSelect}
      />
      {selectedPayment && <PaymentForm selectedPayment={selectedPayment} />}
      <Confirm
        total={total}
        originalPrice={originalPrice}
        discountPrice={discountPrice}
      />
      <div className="mt-4 flex justify-end">
        <button className="rounded bg-red-500 px-14 py-3 text-white transition hover:bg-black hover:text-white">
          Confirm Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentMembership;
