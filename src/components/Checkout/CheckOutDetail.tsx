import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, notification } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { CartData } from "../../models/Cart";
import { getCartsAPI, deleteCartAPI } from "../../services/cartService";
import Loading from "../../components/Loading/loading";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<React.PropsWithChildren<MyFormItemGroupProps>> = ({ prefix, children }) => {
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

const MyFormItem = ({ name, ...props }: any) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const CheckOutDetail: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get selected items from location state
    const { selectedItems } = location.state as { selectedItems: CartData[] };
    const itemIds = new Set(selectedItems.map(item => item._id));
    setSelectedItems(itemIds);
    
    const fetchCartItems = async () => {
      try {
        const dataTransfer = {
          searchCondition: { status: "new", is_deleted: false },
          pageInfo: { pageNum: 1, pageSize: 10 },
        };
        const data = await getCartsAPI(dataTransfer);
        setCartItems(data);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [location.state]);

  const handleRemove = async (id: string) => {
    setLoading(true);
    try {
      await deleteCartAPI(id);
      setCartItems(prevItems => prevItems.filter(item => item._id !== id));
      setSelectedItems(prevSelected => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(id);
        return newSelected;
      });
      notification.success({
        message: "Success",
        description: "The item has been successfully removed from the cart.",
      });
    } catch (error: any) {
      console.error("Error deleting item:", error.message);
      notification.error({
        message: "Error",
        description: `Failed to remove the item: ${error.message || "An error occurred"}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

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

  const selectedCartItems = cartItems.filter(item => selectedItems.has(item._id));
  const totalPrice = selectedCartItems.reduce((acc, item) => {
    const price = item.price;
    const discount = item.discount;
    const pricePaid = discount ? price - (price * discount) / 100 : price;
    return acc + pricePaid;
  }, 0);

  if (loading) {
    return <Loading />;
  }
  if (error) return <p>Error: {error}</p>;

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
                  <Option value="vietnam">VietNam</Option>
                  <Option value="usa">U.S.A</Option>
                  {/* Add more countries as needed */}
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

            <Button type="primary" htmlType="submit" style={{ background: "red" }}>
              Save Changes
            </Button>
          </Form>
        </div>
      )}
      <div className="mt-6">
        {selectedCartItems.length > 0 ? (
          <div>
            <h3 className="font-semibold text-lg">Selected Items</h3>
            <div className="mt-4">
              {selectedCartItems.map(item => {
                const price = item.price;
                const discount = item.discount;
                const pricePaid = discount ? price - (price * discount) / 100 : price;
                const priceColor = discount ? "#ef4444" : "inherit";

                return (
                  <div key={item._id} className="border-b py-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">{item.course_name}</span>
                      <span style={{ color: priceColor }}>
                        {pricePaid.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{item.instructor_name}</div>
                    <div className="text-sm text-gray-600">by {item.student_name}</div>
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Total Price: {totalPrice.toFixed(2)} USD</h3>
              <Button
                type="primary"
                onClick={handleCheckout}
                style={{ background: "red" }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <p>No items selected</p>
        )}
      </div>
    </div>
  );
};

export default CheckOutDetail;
