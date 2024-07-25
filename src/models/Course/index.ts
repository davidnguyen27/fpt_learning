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
};

export type CourseClient = {
  _id: string;
  name: string;
  category_id: string;
  description: string;
  status: string;
  video_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  price_paid: number;
  full_time: number;
  instructor_id: string;
  instructor_name: string;
  category_name: string;
  session_count: number;
  lesson_count: number;
  is_in_cart: boolean;
  is_purchased: boolean;
  average_rating: number;
  review_count: number;
};

export type CourseDetail = {
  _id: string;
  name: string;
  category_id: string;
  description: string;
  status: string;
  video_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  instructor_id: string;
  instructor_name: string;
  category_name: string;
  price_paid: number;
  full_time: number;
  session_list: {
    _id: string;
    name: string;
    position_order: number;
    lesson_list: {
      _id: string;
      name: string;
      lesson_type: string;
      full_time: number;
      position_order: number;
    }[];
    full_time: number;
  }[];
  is_in_cart: boolean;
  is_purchased: boolean;
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
