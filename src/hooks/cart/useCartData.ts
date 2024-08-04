import { useEffect, useState, useCallback } from "react";
import { getCartsAPI } from "../../services/cartService";
import { DataTransfer } from "../../models/Cart";
import { User } from "../../models/Types";

const useCartData = (user: User) => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    if (user) {
      try {
        const dataTransfer: DataTransfer = {
          searchCondition: {
            status: "new",
            is_deleted: false,
          },
          pageInfo: { pageNum: 1, pageSize: 100 },
        };
        const carts = await getCartsAPI(dataTransfer);
        setCartItemCount(carts.length);
      } catch (error: any) {
        setError(error.message);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return { cartItemCount, error };
};

export default useCartData;
