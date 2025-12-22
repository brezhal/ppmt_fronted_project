import { getInventoryList } from "@/services/inventory/api";
import { PageContainer } from "@ant-design/pro-components";
import { Card, Tag, Typography, Spin, List, Space, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const { Text, Title } = Typography;

const Inventory: React.FC = () => {
  const [logs, setLogs] = useState<API.InventoryLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // 获取数据的函数
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getInventoryList();
      setLogs(data || []);
    } catch (error) {
      console.error('获取库存信息失败:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 检测是否是移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);


  if (loading) {
    return (
      <PageContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        </Card>
      </PageContainer>
    );
  }

  // 渲染桌面端List视图
  const renderDesktopView = () => (
    <List
      dataSource={logs}
      renderItem={(log, index) => {
        return (
          <List.Item
            key={index}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', flexWrap: 'wrap' }}>
              {log.nick_name && (
                <>
                  <Tag color="blue" style={{ margin: 0 }}>{log.nick_name}</Tag>
                  <Text style={{ color: '#999' }}>-</Text>
                </>
              )}
              {log.goods_name && (
                <>
                  <Text style={{ fontSize: '14px' }}>{log.goods_name}</Text>
                  <Text style={{ color: '#999' }}>-</Text>
                </>
              )}
              {log.take_method && (
                <>
                  <Tag color="green" style={{ margin: 0 }}>{log.take_method}</Tag>
                  <Text style={{ color: '#999' }}>-</Text>
                </>
              )}
              {log.created_at && (
                <Tag color="orange" style={{ margin: 0, fontSize: '12px' }}>
                  {log.created_at}
                </Tag>
              )}
            </div>
          </List.Item>
        );
      }}
    />
  );

  // 渲染移动端Card视图
  const renderMobileView = () => (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {logs.map((log, index) => {
        return (
          <Card
            key={index}
            size="small"
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: '8px',
            }}
          >
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {log.nick_name && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color="blue" style={{ margin: 0 }}>用户</Tag>
                  <Text strong style={{ fontSize: '14px' }}>{log.nick_name}</Text>
                </div>
              )}
              {log.goods_name && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Tag color="purple" style={{ margin: 0 }}>商品</Tag>
                  <Text style={{ fontSize: '14px', flex: 1 }}>{log.goods_name}</Text>
                </div>
              )}
              {log.take_method && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color="green" style={{ margin: 0 }}>取货方式</Tag>
                  <Text style={{ fontSize: '14px' }}>{log.take_method}</Text>
                </div>
              )}
              {log.created_at && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color="orange" style={{ margin: 0 }}>时间</Tag>
                  <Text style={{ fontSize: '13px' }}>
                    {log.created_at}
                  </Text>
                </div>
              )}
            </Space>
          </Card>
        );
      })}
    </Space>
  );

  return (
    <PageContainer
      extra={[
        <Button
          key="refresh"
          type="primary"
          icon={<ReloadOutlined />}
          loading={loading}
          onClick={fetchData}
        >
          刷新
        </Button>,
      ]}
    >
      <Card>
        <div style={{ maxHeight: `calc(100vh - ${isMobile ? '300px' : '360px'})`, overflowY: 'auto' }}>
          {isMobile ? renderMobileView() : renderDesktopView()}
        </div>
        {logs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
            暂无数据
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default Inventory;

