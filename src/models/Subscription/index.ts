export type Subscription = {
    _id: string;
    subscriber_id: string;
    subscriber_name: string;
    instructor_id: string;
    instructor_name: string;
    is_subscribed: boolean;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
};

export type DataTransfer = {
    searchCondition: {
        keyword: string;
        is_delete: boolean;
    };
    pageInfo: {
        pageNum: number;
        pageSize: number;
    };  
};