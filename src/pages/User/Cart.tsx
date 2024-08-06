import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Layout, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { getCartsAPI, editStatusCartsAPI } from "../../services/cartService";
import { CartData, DataTransfer } from "../../models/Cart";
import "../../styles/index.css";
import { AppFooter, AppHeader2, CartItem, CartSummary } from "../../components";
import Loading from "../../components/Loading/loading";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";

const { Content, Footer } = Layout;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const dataTransferNew: DataTransfer = {
          searchCondition: { status: "new", is_deleted: false },
          pageInfo: { pageNum: 1, pageSize: 10 },
        };
        const dataTransferCancel: DataTransfer = {
          searchCondition: { status: "cancel", is_deleted: false },
          pageInfo: { pageNum: 1, pageSize: 10 },
        };
        const dataTransferWaitingPaid: DataTransfer = {
          searchCondition: { status: "waiting_paid", is_deleted: false },
          pageInfo: { pageNum: 1, pageSize: 10 },
        };

        // Gọi API cho ba trạng thái
        const [dataNew, dataCancel, dataWaitingPaid] = await Promise.all([
          getCartsAPI(dataTransferNew),
          getCartsAPI(dataTransferCancel),
          getCartsAPI(dataTransferWaitingPaid),
        ]);

        // Kết hợp cả ba kết quả lại với nhau
        setCartItems([...dataNew, ...dataCancel, ...dataWaitingPaid]);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(id);
      return newSelected;
    });
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const handleSelect = (id: string, selected: boolean) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (selected) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      return newSelected;
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };

  const price = cartItems.reduce(
    (acc, item) =>
      acc +
      (selectedItems.has(item._id)
        ? item.price * (quantities[item._id] || 1)
        : 0),
    0,
  );
  const discountPercent = cartItems.reduce(
    (acc, item) =>
      acc +
      (selectedItems.has(item._id)
        ? item.discount * (quantities[item._id] || 1)
        : 0),
    0,
  );
  const discount = (price * discountPercent) / 100;
  const price_paid = cartItems.reduce(
    (acc, item) =>
      acc +
      (selectedItems.has(item._id)
        ? item.price_paid * (quantities[item._id] || 1)
        : 0),
    0,
  );

  if (error) return <p>Error: {error}</p>;

  const handleCheckout = async () => {
    if (selectedItems.size === 0) {
      notification.warning({
        message: "Warning",
        description: "Please choose courses that you want to check out",
      });
      return;
    }

    const selectedItemsWithQuantities = cartItems
      .filter((item) => selectedItems.has(item._id))
      .map((item) => ({
        ...item,
        quantity: quantities[item._id] || 1,
      }));

    const hasWaitingPaidItems = selectedItemsWithQuantities.some(
      (item) => item.status === "waiting_paid",
    );

    if (hasWaitingPaidItems) {
      // Redirect to confirm checkout if any selected item has status "waiting_paid"
      navigate("/confirm-checkout", { state: { selectedItemsWithQuantities } });
    } else {
      // Proceed with the normal checkout process
      try {
        await editStatusCartsAPI("waiting_paid", selectedItemsWithQuantities);
        navigate("/confirm-checkout", {
          state: { selectedItemsWithQuantities },
        });
      } catch (error: any) {
        notification.error({
          message: "Error",
          description: `Failed to check out cart: ${
            error.message || "An error occurred"
          }`,
        });
      }
    }
  };

  return (
    <Layout>
      {isLoading && <Loading />}
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
            </Breadcrumb>
            <div style={{ margin: "16px 0", padding: "0 140px" }}>
              <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
            </div>
          </div>
          <div className="flex-grow">
            <div className="mx-auto max-w-7xl p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/empty_cart.png"
                    alt="Empty Cart"
                    className="mb-4 h-64 w-64"
                  />

                  <p className="text-xl">
                    Your cart is empty, continue shopping to start a course!
                  </p>
                  <Button
                    type="primary"
                    danger
                    className="mt-4 rounded p-2"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg md:col-span-2">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onRemove={handleRemove}
                        isSelected={selectedItems.has(item._id)}
                        onSelect={handleSelect}
                        onQuantityChange={handleQuantityChange}
                      />
                    ))}
                  </div>
                  <div className="h-80 rounded-lg bg-white p-4 shadow-md">
                    <CartSummary
                      price={price}
                      price_paid={price_paid}
                      discount={discount}
                      cartItems={cartItems}
                      selectedItems={selectedItems}
                      onRemove={handleRemove}
                      onSelect={handleSelect}
                    />
                    <button
                      className="mt-4 w-full rounded bg-red-500 p-2 text-white"
                      onClick={handleCheckout}
                    >
                      Check Out Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Content>
      <Footer className="footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default Cart;
