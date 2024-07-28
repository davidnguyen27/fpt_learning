import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { getCartsAPI, editStatusCartsAPI } from "../../services/cartService";
import { CartData, DataTransfer } from "../../models/Cart";
import "../../styles/index.css";
import { AppFooter, AppHeader2, CartItem, CartSummary } from "../../components";
import Loading from "../../components/Loading/loading";

const { Content, Footer } = Layout;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const dataTransfer: DataTransfer = {
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

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  const handleCheckout = async () => {
    if (selectedItems.size === 0) {
      notification.warning({
        message: "Warning",
        description: "Please choose Courses that you want to check out",
      });
      return;
    }

    const selectedItemsWithQuantities = cartItems
      .filter((item) => selectedItems.has(item._id))
      .map((item) => ({
        _id: item._id,
        cart_no: item.cart_no,
        quantity: quantities[item._id] || 1,
      }));

    try {
      await editStatusCartsAPI("waiting_paid", selectedItemsWithQuantities);
      navigate("/confirm-checkout", { state: { selectedItemsWithQuantities } });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: `Failed to update cart status: ${error.message || "An error occurred"}`,
      });
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
            </Breadcrumb>
            <div style={{ margin: "16px 0", padding: "0 140px" }}>
              <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
            </div>
          </div>
          <div className="flex-grow">
            <div className="mx-auto max-w-7xl p-4">
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

export default Cart;
