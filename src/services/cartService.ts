import { CartData, DataTransfer } from '../models/Cart';
import { APILink } from "../const/linkAPI";
import { axiosInstance } from './axiosInstance';

export const getCartsAPI = async (
  dataTransfer: DataTransfer,
): Promise<CartData[]> => {
  try {
    const res = await axiosInstance.post(
      `${APILink}/api/cart/search`,
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createCartAPI = async (cartData: Partial<CartData>) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/cart`, cartData);
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
    const payload = {
      status,
      items: cartItems,
    };

    await axiosInstance.put(`${APILink}/api/cart/update-status`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteCartAPI = async (cartId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${APILink}/api/cart/${cartId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
