import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartData } from "../../models/Cart";
import "../../styles/index.css";
import { Layout, Breadcrumb, Button } from "antd";
import { AppFooter, AppHeader2 } from "../../components";
import { editStatusCartsAPI } from "../../services/cartService"; // Update import

const { Content, Footer } = Layout;

interface ConfirmCheckoutProps {}

const ConfirmCheckout: React.FC<ConfirmCheckoutProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItemsWithQuantities = location.state?.selectedItemsWithQuantities as (CartData & { quantity: number })[];

  if (!selectedItemsWithQuantities) {
    return <div>No items selected.</div>;
  }

  const total = selectedItemsWithQuantities.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = async () => {
    try {
      const cartItems = selectedItemsWithQuantities.map(item => ({
        _id: item._id,
        cart_no: item.cart_no,
      }));
      await editStatusCartsAPI("completed", cartItems);
      navigate("/user-profile-page");
    } catch (error: any) {
      console.error("Error proceeding to checkout:", error);
    }
  };

  const handleCancelCheckout = async () => {
    try {
      const cartItems = selectedItemsWithQuantities.map(item => ({
        _id: item._id,
        cart_no: item.cart_no,
      }));
      await editStatusCartsAPI("cancel", cartItems);
      navigate("/cart", { state: { removedItems: cartItems } });
    } catch (error: any) {
      console.error("Error canceling checkout:", error);
    }
  };

  return (
    <Layout>
      <AppHeader2 />
      <Content>
        <div className="flex min-h-screen flex-col bg-gray-100">
          <div className="bg-white" style={{ padding: "8px 0" }}>
            <Breadcrumb style={{ margin: "16px 0", padding: "0 140px" }}>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/cart")}
                  style={{ cursor: "pointer" }}
                >
                  Cart
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/confirm-checkout")}
                  style={{ cursor: "pointer" }}
                >
                  Confirm Checkout
                </span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: "16px 0", padding: "0 140px" }}>
              <h1 className="mb-4 text-2xl font-semibold">Confirm Checkout</h1>
            </div>
          </div>
          <div className="flex-grow">
            <div className="mx-auto max-w-7xl p-4">
              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg md:col-span-2">
                  {selectedItemsWithQuantities.map((item) => (
                    <div key={item._id} className="mb-4">
                      <div className="overflow-hidden rounded-lg bg-white shadow-md">
                        <div className="relative m-4 flex items-center justify-between p-4">
                          <div className="ml-4 flex flex-grow flex-col">
                            <div>
                              <span className="text-lg font-bold">{item.course_name}</span>
                              <br />
                              <span className="text-sm text-gray-500">Cart no: {item.cart_no}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="mr-1">By</span>
                              <span className="font-semibold text-[#0ea5e9]">{item.instructor_name}</span>
                            </div>
                            <div className="mt-2">
                              Quantity: {item.quantity}
                            </div>
                          </div>
                          <div className="flex items-end justify-between">
                            <div className="mr-4 flex-col">
                              <div className="text-sm font-bold text-black">
                                $ {item.price}
                              </div>
                              {item.discount > 0 && (
                                <div className="text-sm text-gray-500 line-through">$ {item.price}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-40 rounded-lg bg-white p-4 shadow-md">
                  <div className="text-xl font-semibold">
                    Total: $ {total.toLocaleString("US")}
                  </div>
                  <Button
                    className="mt-4 w-full p-2 bg-red-500 text-white rounded"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    className="mt-2 w-full p-2 bg-gray-500 text-white rounded"
                    onClick={handleCancelCheckout}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          backgroundColor: "black",
          textAlign: "center",
          width: "100%",
          padding: "24px 0",
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default ConfirmCheckout;
