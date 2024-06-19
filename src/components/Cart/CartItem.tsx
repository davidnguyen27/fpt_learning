import React from "react";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    discount: number;
    title?: string;
    author?: string;
  };
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const currentPrice = item.price - item.discount;

  return (
    <div className="max-w-sm w-full sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 relative flex items-center justify-between">
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-24 object-cover rounded-md"
          />
          <div className="flex flex-col ml-4 flex-grow">
            <div>
              <span className="font-bold text-lg">{item.name}</span>
              <br />
              <span className="text-gray-500 text-sm">{item.title}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-1">By</span>
              <span className="text-black font-semibold">{item.author}</span>
            </div>
          </div>
          <div className="absolute top-0 right-3">
            <div
              className="p-0 text-black cursor-pointer"
              onClick={() => onRemove(item.id)}
            >
              x
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-black font-semibold text-sm">
              ${currentPrice}
            </div>
            <div className="text-gray-500 text-sm line-through">
              ${item.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
