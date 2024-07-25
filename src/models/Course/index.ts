export type Course = {
    _id: string;
    name: string;
    category_id: string;
    description: string;
    user_id: string;
    content: string;
    status: string;
    video_url: string | null;
    image_url: string | null;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    user_name: string;
    category_name: string;
};

export type DataTransfer = {
  searchCondition: {
    keyword: string;
    category_id: string;
    status: string;
    is_delete: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};