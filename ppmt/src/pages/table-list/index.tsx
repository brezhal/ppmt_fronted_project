import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  PageContainer,
  PageHeader,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import { getOrdersList } from '@/services/orders/api';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.OrderListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  // 表格显示的列定义
  const columns: ProColumns<API.OrderListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true, // 隐藏搜索
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '商品名称',
      dataIndex: ['parsedData', 'name'],
      hideInSearch: true, // 隐藏搜索
      render: (_, record) => record.parsedData?.name || '-',
    },
    {
      title: '价格',
      dataIndex: ['parsedData', 'price'],
      hideInSearch: true, // 隐藏搜索
      render: (_, record) => record.parsedData?.price || '-',
    },
    {
      title: '数量',
      dataIndex: ['parsedData', 'count'],
      hideInSearch: true, // 隐藏搜索
      render: (_, record) => record.parsedData?.count || '-',
    },
    {
      title: '类型',
      dataIndex: ['parsedData', 'type'],
      hideInSearch: true, // 隐藏搜索
      render: (_, record) => record.parsedData?.type || '-',
    },
    {
      title: '品牌',
      dataIndex: ['parsedData', 'brand'],
      hideInSearch: true, // 隐藏搜索
      render: (_, record) => record.parsedData?.brand || '-',
    },
    {
      title: '配置',
      dataIndex: ['parsedData', 'config'],
      hideInSearch: true, // 隐藏搜索
      render: (_, record) => {
        const config = record.parsedData?.config;
        if (!config) return '-';
        
        // 如果是对象，只显示数值部分
        if (typeof config === 'object') {
          const values = Object.values(config).join(', ');
          return (
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              wordBreak: 'break-all',
              maxWidth: '300px'
            }}>
              {values}
            </div>
          );
        }
        
        // 如果是字符串，直接显示
        return (
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-all',
            maxWidth: '300px'
          }}>
            {config}
          </div>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true, // 不在搜索表单中显示
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      hideInTable: true, // 不在表格中显示，只在搜索中使用
      formItemProps: {
        label: '商品名称',
      },
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      valueType: 'date',
      hideInTable: true, // 不在表格中显示，只在搜索中使用
      formItemProps: {
        label: '开始日期',
      },
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      valueType: 'date',
      hideInTable: true, // 不在表格中显示，只在搜索中使用
      formItemProps: {
        label: '结束日期',
      },
    },
  ];

  // 弹框显示的列定义（不包含搜索字段）
  const drawerColumns: ProColumns<API.OrderListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: ['parsedData', 'name'],
      render: (_, record) => record.parsedData?.name || '-',
    },
    {
      title: '价格',
      dataIndex: ['parsedData', 'price'],
      render: (_, record) => record.parsedData?.price || '-',
    },
    {
      title: '数量',
      dataIndex: ['parsedData', 'count'],
      render: (_, record) => record.parsedData?.count || '-',
    },
    {
      title: '类型',
      dataIndex: ['parsedData', 'type'],
      render: (_, record) => record.parsedData?.type || '-',
    },
    {
      title: '品牌',
      dataIndex: ['parsedData', 'brand'],
      render: (_, record) => record.parsedData?.brand || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '配置',
      dataIndex: ['parsedData', 'config'],
      render: (_, record) => {
        const config = record.parsedData?.config;
        if (!config) return '-';
        
        // 如果是对象，只显示数值部分
        if (typeof config === 'object') {
          const values = Object.values(config).join(', ');
          return (
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              wordBreak: 'break-all',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {values}
            </div>
          );
        }
        
        // 如果是字符串，直接显示
        return config;
      },
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="数据仅供参考，有些统计不到，-的数据表示买到，但没统计到名称。2025-9-27日之后的数据大部分是正常的，之前的因统计问题丢失了" />
      <ProTable<API.OrderListItem, API.PageParams>
        headerTitle="订单列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        form={{
          // 配置搜索表单
          ignoreRules: false,
        }}
        toolBarRender={() => []}
        request={getOrdersList}
        columns={columns}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<API.OrderListItem>
            column={2}
            title={`订单详情 - ID: ${currentRow?.id}`}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={drawerColumns as ProDescriptionsItemProps<API.OrderListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
