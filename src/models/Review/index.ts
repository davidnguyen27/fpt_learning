export type Review = {
    _id: string;
    name: string;
    course_id: string;
    course_name: string;
    reviewer_id: string;
    reviewer_name: string;
    comment: string;
    rating: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
};
  export type DataTransfer = {
      searchCondition: {
        
        course_id: string;
        rating: number;
        is_instructor: boolean;
        is_rating_order: boolean;
        is_delete: boolean;
      };
      pageInfo: {
        pageNum: number;
        pageSize: number;
      };
    };

    export type ReviewSearchResponse = {
      success: boolean;
      data: {
        pageData: Review[];
        pageInfo: {
          pageNum: number;
          pageSize: number;
          totalItems: number;
          totalPages: number;
        };
      };
    };