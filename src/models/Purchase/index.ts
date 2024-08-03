export type Purchase = {
    _id: string;
    purchase_no: string;
    status: string;
    price_paid: number;
    price: number;
    discount: number;
    cart_id: string;
    cart_no: string;
    course_id: string;
    course_name: string;
    student_id: string;
    student_name: string;
    instructor_id: string;
    instructor_name: string;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
};

export type DataTransfer = {
    searchCondition: {
        purchase_no: string;
        cart_no: string;
        course_id: string;
        status: string;
        is_deleted: boolean;
    };
    pageInfo: {
        pageNum: number;
        pageSize: number;
    };
};

export type PurchaseSearchResponse = {
    success: boolean;
    data: {
      pageData: Purchase[];
      pageInfo: {
        pageNum: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
      };
    };
  };