// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取订单列表 GET /api/orders/grab-list */
export async function getOrdersList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 订单状态 */
    status?: string;
    /** 订单号 */
    orderNo?: string;
  },
  options?: { [key: string]: any },
) {
  // 计算limit和page
  const limit = params.pageSize || 10;
  const page = params.current || 1; // page直接使用页码
  
  const response = await request<API.OrderList>('/api/orders/grab-list', {
    method: 'GET',
    params: {
      limit: parseInt(limit.toString()),
      page: parseInt(page.toString()),
      status: params.status,
      orderNo: params.orderNo,
    },
    ...(options || {}),
  });

  // 处理数据格式，解析JSON字符串
  if (response?.data?.list) {
    response.data.list = response.data.list.map(item => {
      let parsedData = {};
      try {
        parsedData = JSON.parse(item.data || '{}');
      } catch (e) {
        console.warn('Failed to parse order data:', item.data);
      }
      return {
        ...item,
        parsedData,
      };
    });
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
