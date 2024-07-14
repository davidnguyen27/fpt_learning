export type Session = {
    data: {
      _id: string;
      course_id: string;
      user_id: string;
      name: string;
      status: boolean;
      created_at: string;
      updated_at: string;
      position_order: number;
      is_delete: boolean;
      description: string;
    };
  };
   export type SearchCondition = {
        keyword?: string;
        course_id: string;	
        is_position_order: boolean;
        is_delete: boolean;
    
    }
    export type PageInfo = {
        pageNum: number;
        pageSize: number;
    }
    export type SessionSearchRequest = {
        searchCondition: SearchCondition;
        pageInfo: PageInfo;
    };
    export type SessionData = {
        _id: string;
        course_id: string;
        user_id: string;
        name: string;
        created_at: string;
        updated_at: string;
        position_order: number;
        is_delete: boolean;
        description: string;
    }
    export type SessionSearchResponse = {
        success: boolean;
        data: {
        totalCount: any;
        pageData: SessionData[];
        pageInfo: {
            pageNum: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        };
    };