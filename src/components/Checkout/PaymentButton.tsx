import React from "react";
import { CreditCardOutlined, BankOutlined } from "@ant-design/icons";

interface PaymentButtonProps {
  selectedPayment: string | null;
  handlePaymentSelect: (paymentMethod: string) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  selectedPayment,
  handlePaymentSelect,
}) => {
  return (
    <div className="mt-12 flex justify-center font-semibold">
      <div className="flex w-1/3 items-center justify-center">
        <button
          className={`relative w-full border border-gray-300 bg-gray-200 p-4 ${
            selectedPayment === "creditCard" ? "bg-gray-300" : ""
          }`}
          onClick={() => handlePaymentSelect("creditCard")}
        >
          <span className="mr-2">
            <CreditCardOutlined />
          </span>
          <span className={selectedPayment === "creditCard" ? "hover-red" : ""}>
            Credit Card
          </span>
          {selectedPayment === "creditCard" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
          )}
        </button>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <button
          className={`relative w-full border border-gray-300 bg-gray-200 p-4 ${
            selectedPayment === "paypal" ? "bg-gray-300" : ""
          }`}
          onClick={() => handlePaymentSelect("paypal")}
        >
          <span className="mr-2">
            <i className="fa-brands fa-paypal"></i>
          </span>
          <span className={selectedPayment === "paypal" ? "hover-red" : ""}>
            Paypal
          </span>
          {selectedPayment === "paypal" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
          )}
        </button>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <button
          className={`relative w-full border border-gray-300 bg-gray-200 p-4 ${
            selectedPayment === "bankTransfer" ? "bg-gray-300" : ""
          }`}
          onClick={() => handlePaymentSelect("bankTransfer")}
        >
          <span className="mr-2">
            <BankOutlined />
          </span>
          <span
            className={selectedPayment === "bankTransfer" ? "hover-red" : ""}
          >
            Bank Transfer
          </span>
          {selectedPayment === "bankTransfer" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentButton;
