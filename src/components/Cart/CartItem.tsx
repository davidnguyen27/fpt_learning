import React, { useState } from "react";
import { CartData } from "../../models/Cart";
import { deleteCartAPI } from "../../services/cartService";
import { Modal, notification, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface CartItemProps {
  item: CartData;
  onRemove: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  isSelected,
  onSelect,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await deleteCartAPI(item._id);
      onRemove(item._id);
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
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(item._id, e.target.checked);
  };

  const calculatePricePaid = (price: number, discount: number) =>
    discount ? price - (price * discount) / 100 : price;

  const price = item.price;
  const discount = item.discount;
  const price_paid = calculatePricePaid(price, discount);
  const priceColor = discount ? "#ef4444" : "inherit";

  return (
    <div className="mb-4">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="relative m-4 flex items-center justify-between p-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="mr-4"
          />
          <div className="ml-4 flex flex-grow flex-col">
            <div>
              <span className="text-lg font-bold">{item.course_name}</span>
              <br />
              <span className="text-sm text-gray-500 mr-5">
                Cart no: {item.cart_no}
              </span>
              <Tag color={item.status === "new" ? "green" : "volcano"}>{item.status}</Tag>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-1">By</span>
              <span className="font-semibold text-[#0ea5e9]">
                {item.instructor_name}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="mr-4 flex-col">
              <div className="text-sm font-bold text-black">
                <span style={{ color: priceColor }}>
                  $ {price_paid.toLocaleString("US")}
                </span>
              </div>
              {discount > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  $ {price.toLocaleString("US")}
                </div>
              )}
            </div>
            {/* Only show the delete icon if status is not "waiting_paid" */}
            {item.status !== "waiting_paid" && (
              <div className="cursor-pointer p-0 text-black">
                <DeleteOutlined onClick={showDeleteConfirm} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to remove this course from your cart?</p>
      </Modal>
    </div>
  );
};

export default CartItem;
