import { CreditCardOutlined, BankOutlined } from '@ant-design/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import { Form, FormItemProps, Input, Select } from 'antd';
import '../styles/index.css';

const { Option } = Select;

interface OrderSummaryProps {
  total: number;
  originalPrice: number;
  discountPrice: number;
}

const SelectPayment: React.FC<OrderSummaryProps> = ({ total, originalPrice, discountPrice }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handlePaymentSelect = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod === selectedPayment ? null : paymentMethod);
  };

  const MyFormItemContext = React.createContext<(string | number)[]>([]);
  interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
  }
  function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
  }
  const MyFormItemGroup: React.FC<React.PropsWithChildren<MyFormItemGroupProps>> = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
  };

  const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
  };
  return (
    <div className="p-4">
      <div className="relative mb-4">
        <h2 className="font-semibold text-lg inline-block">Select Payment Method</h2>
        <span
          className="block h-1 bg-red-500 mt-2"
          style={{
            width: '50px',
            height: '1.5px',
            marginLeft: '-2px',
            marginBottom: '2px',
          }}
        ></span>
      </div>
      <div className="flex mt-12 justify-center font-semibold">
        <div className="w-1/3 flex items-center justify-center">
          <button
            className={`relative border border-gray-300 bg-gray-200 p-4 w-full ${
              selectedPayment === 'creditCard' ? 'bg-gray-300' : ''
            }`}
            onClick={() => handlePaymentSelect('creditCard')}
          >
            <span className="mr-2">
              <CreditCardOutlined />
            </span>
            <span className={selectedPayment === 'creditCard' ? 'hover-red' : ''}>Credit Card</span>
            {selectedPayment === 'creditCard' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
            )}
          </button>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <button
            className={`relative border border-gray-300 bg-gray-200 p-4 w-full ${
              selectedPayment === 'paypal' ? 'bg-gray-300' : ''
            }`}
            onClick={() => handlePaymentSelect('paypal')}
          >
            <span className="mr-2">
              <i className="fa-brands fa-paypal"></i>
            </span>
            <span className={selectedPayment === 'paypal' ? 'hover-red' : ''}>Paypal</span>
            {selectedPayment === 'paypal' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
            )}
          </button>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <button
            className={`relative border border-gray-300 bg-gray-200 p-4 w-full ${
              selectedPayment === 'bankTransfer' ? 'bg-gray-300' : ''
            }`}
            onClick={() => handlePaymentSelect('bankTransfer')}
          >
            <span className="mr-2">
              <BankOutlined />
            </span>
            <span className={selectedPayment === 'bankTransfer' ? 'hover-red' : ''}>Bank Transfer</span>
            {selectedPayment === 'bankTransfer' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
            )}
          </button>
        </div>
      </div>
      {selectedPayment && (
        <div className="p-4 mt-4">
          {selectedPayment === 'creditCard' && (
            <Form name="form_creditCard" layout="vertical">
              <MyFormItemGroup prefix={['creditCard']}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MyFormItem name="holderName" label="Holder Name" style={{ flex: 1, marginRight: '10px' }}>
                    <Input placeholder="Enter Holder Name" />
                  </MyFormItem>
                  <MyFormItem name="cardNumber" label="Card Number" style={{ flex: 1 }}>
                    <Input placeholder="Card #" />
                  </MyFormItem>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MyFormItem
                    name="expirationMonth"
                    label="Expiration Month"
                    hasFeedback
                    style={{ flex: 1, marginRight: '10px' }}
                    rules={[{ message: 'Please select your bank !' }]}
                  >
                    <Select placeholder="Month">
                      <Option value="January">January</Option>
                      <Option value="February">February</Option>
                      <Option value="March">March</Option>
                      <Option value="April">April</Option>
                      <Option value="May">May</Option>
                      <Option value="June">June</Option>
                      <Option value="July">July</Option>
                      <Option value="August">August</Option>
                      <Option value="September">September</Option>
                      <Option value="October">October</Option>
                      <Option value="November">November</Option>
                      <Option value="December">December</Option>
                    </Select>
                  </MyFormItem>
                  <MyFormItem name="expirationYear" label="Expiration Year" style={{ flex: 1 }}>
                    <Input placeholder="Year" />
                  </MyFormItem>
                  <MyFormItem name="cvc" label="Card Verification Code" style={{ flex: 1 }}>
                    <Input placeholder="CVC" />
                  </MyFormItem>
                </div>
              </MyFormItemGroup>
            </Form>
          )}
          {selectedPayment === 'paypal' && (
            <div>
              After payment via PayPal's secure checkout, we will send you a link to download your files.
            </div>
          )}
          {selectedPayment === 'bankTransfer' && (
            <Form name="form_creditCard" layout="vertical">
              <MyFormItemGroup prefix={['creditCard']}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MyFormItem
                    name="accountHolderName"
                    label="Account Holder Name"
                    style={{ flex: 1, marginRight: '10px' }}
                  >
                    <Input placeholder="Enter Your Full Name" />
                  </MyFormItem>
                  <MyFormItem name="accountNumber" label="Account Number" style={{ flex: 1 }}>
                    <Input placeholder="Enter Account Number" />
                  </MyFormItem>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MyFormItem
                    name="bankName"
                    label="Bank Name"
                    hasFeedback
                    style={{ flex: 1, marginRight: '10px' }}
                    rules={[{ message: 'Please select your bank !' }]}
                  >
                    <Select placeholder="Please select a bank">
                      <Option value="Vietcombank">Vietcombank</Option>
                      <Option value="Sacombank">Sacombank</Option>
                      <Option value="ACB">ACB</Option>
                      <Option value="BIDV">BIDV</Option>
                      <Option value="DongABank">DongABank</Option>
                    </Select>
                  </MyFormItem>
                  <MyFormItem name="ifscCode" label="IFSC Code" style={{ flex: 1 }}>
                    <Input placeholder="Enter IFSC Code" />
                  </MyFormItem>
                </div>
              </MyFormItemGroup>
            </Form>
          )}
        </div>
      )}
      <hr />
      <div className="p-4 mt-4">
        <div className="relative mb-8">
          <h2 className="font-semibold text-lg inline-block">Select Payment Method</h2>
          <span
            className="block h-1 bg-red-500 mt-2"
            style={{
              width: '50px',
              height: '1.5px',
              marginLeft: '-2px',
              marginBottom: '2px',
            }}
          ></span>
        </div>
        <div className="font-semibold flex justify-between mt-2 text-15">
          <span>Complete Python Bootcamp: Go from zero to hero in Python 3</span>
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
      <div className="flex justify-end mt-4">
        <button className="bg-red-500 text-white py-3 px-14 rounded transition hover:bg-black hover:text-white">
          Confirm Checkout
        </button>
      </div>
    </div>
  );
};

export default SelectPayment;
