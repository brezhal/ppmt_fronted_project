// @ts-ignore
/* eslint-disable */

declare namespace API {
  type InventoryLogItem = {
    goods_name?: string; // 商品名称
    take_method?: string; // 取货方式
    nick_name?: string; // 用户昵称
    created_at?: string; // 创建时间
  };

  type InventoryList = {
    logs?: InventoryLogItem[]; // 日志列表
    top_goods?: any[]; // 热门商品
    total_logs?: number; // 总日志数
  };
}

