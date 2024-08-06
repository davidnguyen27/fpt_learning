export type Lesson = {
    _id: string;
    name: string;
    course_id: string;
    course_name: string;
    session_id: string;
    session_name: string;
    user_id: string;
    user_name: string;
    lesson_type: string;
    description: string ;
    video_url: string ;
    image_url: string ;
    full_time: number;
    position_order: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
};

export type DataTransfer = {
  searchCondition: {
    keyword: string;
    course_id: string;
    session_id: string;
    lesson_type: string;
    is_position_order: boolean;
    is_delete: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};

export type LessonSearchResponse = {
  // success: boolean;
  data: {
    pageData: Lesson[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};