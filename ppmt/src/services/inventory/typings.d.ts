// @ts-ignore
/* eslint-disable */

declare namespace API {
  type InventoryItem = {
    id?: number;
    inventoryInfo?: string; // 库存信息
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // 允许其他字段
  };

  type InventoryList = {
    status?: boolean;
    message?: string;
    data?: InventoryItem[] | any; // 接口返回的数据可能是数组或其他格式
  };
}

