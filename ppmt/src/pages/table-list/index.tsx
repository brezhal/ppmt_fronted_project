import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  PageContainer,
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

  const columns: ProColumns<API.OrderListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
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
      sorter: true,
    },
  ];


  return (
    <PageContainer>
      <ProTable<API.OrderListItem, API.PageParams>
        headerTitle="订单列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
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
            columns={columns as ProDescriptionsItemProps<API.OrderListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
