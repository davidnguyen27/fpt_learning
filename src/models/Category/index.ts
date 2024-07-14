export type CategorySearchRequest = {
  searchCondition: {
    keyword?: string;
    is_parent?: boolean;
    is_delete?: boolean;
  };
  pageInfo?: {
    pageNum?: number;
    pageSize?: number;
  };
};

export type Category = {
  pageData: 
    {
      _id: string;
      name: string;
      parent_category_id?: string | null;
      description: string;
      created_at: Date;
      updated_at: Date;
      is_deleted: boolean;
    }[],
  
  pageInfo: {
    pageNum: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
};

export type CategorySearchResponse = {
  success: boolean;
  data: {
    pageData: Category[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};