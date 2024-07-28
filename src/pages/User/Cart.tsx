import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { getCartsAPI } from "../../services/cartService"; 
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
  const [nightMode] = useState(false);
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

  const price = cartItems.reduce(
    (acc, item) => acc + (selectedItems.has(item._id) ? item.price : 0),
    0,
  );
  const discountPercent = cartItems.reduce(
    (acc, item) => acc + (selectedItems.has(item._id) ? item.discount : 0),
    0,
  );
  const discount = (price * discountPercent) / 100;
  const price_paid = price - discount;

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }  if (error) return <p>Error: {error}</p>;

  return (
    <Layout className={nightMode ? "night-mode" : ""}>
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
                    />
                  ))}
                </div>
                <div className="h-80 rounded-lg bg-white p-4 shadow-md">
                  <CartSummary
                    price={price}
                    discount={discount}
                    price_paid={price_paid}
                  />
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
