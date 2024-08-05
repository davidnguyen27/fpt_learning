export type CourseLogs = {
    _id: string;
    user_id: string;
    user_name: string;
    course_id: string;
    course_name: string;
    old_status: string;
    new_status: string;
    comment: string;
    create_at: Date;
    is_deleted: boolean;
  };
  
  export type DataTransfer = {
    searchCondition: {
      course_id: string;
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
  
  export type DataResponse = {
    success: boolean;
    data: {
      pageData: CourseLogs[];
      PageInfo: {
        pageNum: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
      };
    };
  };
  