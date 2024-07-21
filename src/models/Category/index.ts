
export type Category = {
      _id: string;
      name: string;
      description?: string;
      user_id: string;
      created_at: string;
      updated_at: string;
      is_deleted: boolean;
};

export type DataTransfer = {
  searchCondition: {
    keyword: string;
    is_delete: boolean;
    is_parent: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};