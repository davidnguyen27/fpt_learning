import React, { useState } from "react";
import { Breadcrumb, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { AppFooter, AppHeader2, CartItem, CartSummary } from "../../components";

const { Content, Footer } = Layout;

const initialCartItems = [
  {
    id: 1,
    name: "The Web Developer Bootcamp",
    price: 50.0,
    quantity: 1,
    discount: 10.0,
    title: "Web Development | Python",
    author: "Ko Bin Hung",
    image:
      "https://miro.medium.com/v2/resize:fit:2560/1*DbUarpd2cmH9fLFXEQ5oeg.jpeg",
  },
  {
    id: 2,
    name: "React For Beginners",
    price: 20.0,
    quantity: 1,
    discount: 10.0,
    title: "Web Development | React",
    author: "Leonardo Mana",
    image:
      "https://wesbos.com/static/2c1ec59aaf97caa738566a34f5cea0ea/faec4/Screen-Shot-2018-02-28-at-10.13.05-AM.png",
  },
  {
    id: 3,
    name: "Typescripts",
    price: 40.0,
    quantity: 1,
    discount: 10.0,
    title: "Web Development",
    author: "Mac",
    image:
      "https://media.dev.to/cdn-cgi/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fjaha71mccl3tg1ifvxsg.png",
  },
  {
    id: 4,
    name: "How to learn soft skills and build your career ?",
    price: 50.0,
    quantity: 1,
    discount: 20.0,
    title: "Soft Skills",
    author: "Kun Aguero",
    image:
      "https://pharmaconnections.in/wp-content/uploads/2024/01/soft-skills-scaled-1.jpeg",
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [nightMode] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const originalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountPrice = cartItems.reduce((acc, item) => acc + item.discount, 0);
  const total = originalPrice - discountPrice;

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
                <div className="rounded-lg bg-white p-4 shadow-md md:col-span-2">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
                <div className="h-72 rounded-lg bg-white p-4 shadow-md">
                  <CartSummary
                    originalPrice={originalPrice}
                    discountPrice={discountPrice}
                    total={total}
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
