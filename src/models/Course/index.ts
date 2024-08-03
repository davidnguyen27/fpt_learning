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
  created_at: string;
  updated_at: string;
  user_name: string;
  category_name: string;
  session_count: number;
  lesson_count: number;
};

export type CourseClient = {
  _id: string;
  name: string;
  category_id: string;
  category_name: string;
  status: string;
  description: string;
  video_url: string;
  image_url: string;
  price_paid: number;
  price: number;
  discount: number;
  full_time: number;
  average_rating: number;
  review_count: number;
  instructor_id: string;
  instructor_name: string;
  is_in_cart: boolean;
  is_purchased: boolean;
  session_count: number;
  lesson_count: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
};

export type CourseDetail = {
  _id: string;
  name: string;
  category_id: string;
  category_name: string;
  status: string;
  description: string;
  content: string;
  video_url: string;
  image_url: string;
  price_paid: number;
  price: number;
  discount: number;
  average_rating: number;
  review_count: number;
  instructor_id: string;
  instructor_name: string;
  full_time: number;
  session_list: {
    _id: string;
    name: string;
    position_order: number;
    full_time: number;
    lesson_list: {
      _id: string;
      name: string;
      lesson_type: string;
      position_order: number;
      full_time: number;
    }[];
  }[];
  is_in_cart: boolean;
  is_purchased: boolean;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
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

export type CourseSearchResponse = {
  success: boolean;
  data: {
    pageData: Course[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type CourseDetailResponse = {
  success: boolean;
  data: {
    pageData: CourseDetail[];
    PageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    }
  }
};


