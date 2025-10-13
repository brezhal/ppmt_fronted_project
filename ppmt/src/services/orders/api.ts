// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { decryptOrdersList } from '@/utils/decrypt';

/** 获取订单列表 POST /api/orders/grab-list-search */
export async function getOrdersList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 商品名称 */
    name?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
  },
  options?: { [key: string]: any },
) {
  // 计算limit和page
  const limit = params.pageSize || 10;
  const page = params.current || 1; // page直接使用页码
  
  const response = await request<API.OrderList>('/api/orders/grab-list-search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      limit: parseInt(limit.toString()),
      page: parseInt(page.toString()),
      name: params.name,
      startDate: params.startDate,
      endDate: params.endDate,
    },
    ...(options || {}),
  });

  // 处理数据格式，解密并解析数据
  if (response?.data?.list) {
    response.data.list = decryptOrdersList(response.data.list);
  }

  // 转换为ProTable期望的格式
  return {
    data: response?.data?.list || [],
    total: response?.data?.pagination?.total || 0,
    success: response?.status || false,
  };
}

/** 删除订单 POST /api/orders/delete */
export async function deleteOrder(
  body: {
    ids: string[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/orders/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
