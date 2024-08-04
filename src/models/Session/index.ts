export type Session = {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  user_id: string;
  user_name: string;
  description: string;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
};

export type DataTransfer = {
  searchCondition: {
    keyword: string;
    course_id: string;
    course_name: string;
    is_position_order: boolean;
    is_delete: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};

export type SessionSearchResponse = {
  success: boolean;
  data: {
    pageData: Session[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};
