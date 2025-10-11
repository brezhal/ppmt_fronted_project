// @ts-ignore
/* eslint-disable */

declare namespace API {
  type OrderListItem = {
    id?: number;
    data?: string; // JSON字符串格式的数据
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    // 解析后的数据字段
    parsedData?: {
      name?: string;
      price?: string;
      count?: string;
      type?: string;
      brand?: string;
      storeName?: string;
      config?: any;
    };
  };

  type OrderList = {
    status?: boolean;
    message?: string;
    data?: {
      list?: OrderListItem[];
      pagination?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
      };
    };
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
