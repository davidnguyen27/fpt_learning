import React from "react";
import { Form, FormItemProps, Input, Select } from "antd";
const { Option } = Select;

interface PaymentFormProps {
  selectedPayment: string | null;
}


const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPayment }) => {
    const MyFormItemContext = React.createContext<(string | number)[]>([]);

  interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
  }

  function toArr(
    str: string | number | (string | number)[]
  ): (string | number)[] {
    return Array.isArray(str) ? str : [str];
  }

  const MyFormItemGroup: React.FC<
    React.PropsWithChildren<MyFormItemGroupProps>
  > = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(
      () => [...prefixPath, ...toArr(prefix)],
      [prefixPath, prefix]
    );

    return (
      <MyFormItemContext.Provider value={concatPath}>
        {children}
      </MyFormItemContext.Provider>
    );
  };

  const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName =
      name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
  };
  return (
    <div className="p-4 mt-4">
      {selectedPayment === "creditCard" && (
        <Form name="form_creditCard" layout="vertical">
          <MyFormItemGroup prefix={["creditCard"]}>
            <div style={{ display: "flex", gap: "10px" }}>
              <MyFormItem
                name="holderName"
                label="Holder Name"
                style={{ flex: 1, marginRight: "10px" }}
              >
                <Input placeholder="Enter Holder Name" />
              </MyFormItem>
              <MyFormItem
                name="cardNumber"
                label="Card Number"
                style={{ flex: 1 }}
              >
                <Input placeholder="Card #" />
              </MyFormItem>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <MyFormItem
                name="expirationMonth"
                label="Expiration Month"
                hasFeedback
                style={{ flex: 1, marginRight: "10px" }}
                rules={[{ message: "Please select your bank !" }]}
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
              <MyFormItem
                name="expirationYear"
                label="Expiration Year"
                style={{ flex: 1 }}
              >
                <Input placeholder="Year" />
              </MyFormItem>
              <MyFormItem
                name="cvc"
                label="Card Verification Code"
                style={{ flex: 1 }}
              >
                <Input placeholder="CVC" />
              </MyFormItem>
            </div>
          </MyFormItemGroup>
        </Form>
      )}
      {selectedPayment === "paypal" && (
        <div>
          After payment via PayPal's secure checkout, we will send you a link to
          download your files.
        </div>
      )}
      {selectedPayment === "bankTransfer" && (
        <Form name="form_bankTransfer" layout="vertical">
          <MyFormItemGroup prefix={["bankTransfer"]}>
            <div style={{ display: "flex", gap: "10px" }}>
              <MyFormItem
                name="accountHolderName"
                label="Account Holder Name"
                style={{ flex: 1, marginRight: "10px" }}
              >
                <Input placeholder="Enter Your Full Name" />
              </MyFormItem>
              <MyFormItem
                name="accountNumber"
                label="Account Number"
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter Account Number" />
              </MyFormItem>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <MyFormItem
                name="bankName"
                label="Bank Name"
                hasFeedback
                style={{ flex: 1, marginRight: "10px" }}
                rules={[{ message: "Please select your bank !" }]}
              >
                <Select placeholder="Please select a bank">
                  <Option value="Vietcombank">Vietcombank</Option>
                  <Option value="Sacombank">Sacombank</Option>
                  <Option value="ACB">ACB</Option>
                  <Option value="BIDV">BIDV</Option>
                  <Option value="DongABank">DongABank</Option>
                </Select>
              </MyFormItem>
              <MyFormItem
                name="ifscCode"
                label="IFSC Code"
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter IFSC Code" />
              </MyFormItem>
            </div>
          </MyFormItemGroup>
        </Form>
      )}
    </div>
  );
};

export default PaymentForm;
