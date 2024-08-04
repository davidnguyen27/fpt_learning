export type DataTransfer = {
  searchCondition: {
    payout_no: string;
    instructor_id: string;
    status: string;
    is_instructor: boolean;
    is_delete: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};

export type Payout = {
  _id: string;
  payout_no: string;
  status: string;
  transactions: {
    price: number;
    discount: number;
    price_paid: number;
    purchase_id: string;
    _id: string;
    created_at: Date;
  }[];

  instructor_id: string;
  balance_origin: number;
  balance_instructor_paid: number;
  balance_instructor_received: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  instructor_name: string;
  instructor_email: string;
};

export type PayoutSearchResponse = {
  success: boolean;
  data: {
    pageData: Payout[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};
