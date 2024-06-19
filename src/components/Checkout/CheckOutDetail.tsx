import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import type { FormItemProps } from "antd";
const { Option } = Select;

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

const CheckOutDetail: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const onFinish = (value: object) => {
    console.log(value);
  };
  const defaultValues = {
    user: {
      name: {
        firstName: "Du Tran",
        lastName: "Vinh Hung",
      },
      academyName: "FPT University",
      country: "VietNam",
      address1: "123 Le Van Viet",
      address2: "Tang Nhon Phu A",
      city: "Thu Duc",
      state: "Ho Chi Minh",
      zipCode: "700000",
      phone: "123456789",
    },
  };

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <h2 className="font-semibold text-lg inline-block">Billing Details</h2>
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
      <div
        onClick={toggleForm}
        className="font-semibold flex mt-6 justify-between text-lg"
      >
        <span>Edit Information</span>
        <button className="ml-2">{isFormOpen ? "-" : "+"}</button>
      </div>
      {isFormOpen && (
        <div className="mt-4">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish} initialValues={defaultValues}>
            <MyFormItemGroup prefix={["user"]}>
              <MyFormItemGroup prefix={["name"]}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <MyFormItem
                    name="firstName"
                    label="First Name"
                    style={{ flex: 1, marginRight: "10px" }}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </MyFormItem>
                  <MyFormItem
                    name="lastName"
                    label="Last Name"
                    style={{ flex: 1 }}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </MyFormItem>
                </div>
              </MyFormItemGroup>

              <MyFormItem
                name="academyName"
                label="Academy Name"
                rules={[{ required: true }]}
              >
                <Input />
                <div>
                  If you want your invoices addressed to a academy. Leave blank
                  to use your full name.
                </div>
              </MyFormItem>
              <MyFormItem
                name="country"
                label="Country"
                hasFeedback
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select placeholder="Please select a country">
                  <Option value="china">VietNam</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </MyFormItem>
              <MyFormItem
                name="address1"
                label="Address 1"
                rules={[{ required: true }]}
              >
                <Input />
              </MyFormItem>
              <MyFormItem
                name="address2"
                label="Address 2"
                rules={[{ required: true }]}
              >
                <Input />
              </MyFormItem>
              <div style={{ display: "flex", gap: "10px" }}>
                  <MyFormItem
                    name="city"
                    label="City"
                    style={{ flex: 1, marginRight: "10px" }}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </MyFormItem>
                  <MyFormItem
                    name="state"
                    label="State / Province / Region"
                    style={{ flex: 1 }}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </MyFormItem>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <MyFormItem
                    name="zipCode"
                    label="Zip/Postal Code"
                    style={{ flex: 1, marginRight: "10px" }}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </MyFormItem>
                  <MyFormItem
                    name="phone"
                    label="Phone Number"
                    style={{ flex: 1 }}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </MyFormItem>
                </div>
            </MyFormItemGroup>

            <Button type="primary" htmlType="submit" style={{background: "red"}}>
              Save Change
            </Button>
          </Form>
        </div>
      )}
      <div className="mt-6">
        Du Tran Vinh Hung <br />
        123 Le Van Viet, Tang Nhon Phu A <br />
        Thu Duc , Ho Chi Minh, 70000 <br />
        VietNam
      </div>
    </div>
  );
};

export default CheckOutDetail;
