import axios from "axios";
import { CartData, DataTransfer } from '../models/Cart'
import { APILink } from "../const/linkAPI";

export const getCartsAPI = async (
    dataTransfer: DataTransfer,
  ): Promise<CartData[]> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(
        `${APILink}/api/cart/search`,
        dataTransfer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data.pageData;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  export const createCartAPI = async (cartData: Partial<CartData>) => {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Cannot get token!");

        const res = await axios.post(`${APILink}/api/cart`, cartData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const editStatusCartsAPI = async (
  status: string,
  cartItems: { _id: string; cart_no: string }[]
): Promise<void> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const payload = {
      status,
      items: cartItems,
    };

    await axios.put(`${APILink}/api/cart/update-status`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

  export const deleteCartAPI = async (cartId: string): Promise<void> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      await axios.delete(`${APILink}/api/cart/${cartId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  };