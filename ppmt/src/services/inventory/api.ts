// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取库存信息列表 GET /api/inventory/query-grab-logs */
export async function getInventoryList(
  options?: { [key: string]: any },
) {
  const response = await request<API.InventoryList>('/api/inventory/query-grab-logs', {
    method: 'GET',
    params: {
      source: '超线程',
      status: 0,
    },
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });

  // 处理数据格式：提取logs数组
  let logs: API.InventoryLogItem[] = [];
  if (response?.logs && Array.isArray(response.logs)) {
    logs = response.logs;
  } else if (response?.data?.logs && Array.isArray(response.data.logs)) {
    logs = response.data.logs;
  }

  return logs;
}

