export type Course = {
  pageData: {
    _id: string;
    name: string;
    category_id: string;
    user_id: string;
    status: string;
    video_url: string;
    image_url: string;
    price: number;
    discount: number;
    created_at: string;
    updated_at: string;
    user_name: string;
    category_name: string;
  }[];
  pageInfo: {
    pageNum: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
};
