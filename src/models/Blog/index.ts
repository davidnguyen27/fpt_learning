export type Blog = {
  _id: string;
  name: string;
  user_id: string;
  category_id: string;
  description: string;
  image_url: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  user_name: string;
  category_name: string;
};

export type DataTransfer = {
  searchCondition: {
    category_id: string;
    is_delete: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};

export type BlogSearchResponse = {
  success: boolean;
  data: {
    pageData: Blog[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};
