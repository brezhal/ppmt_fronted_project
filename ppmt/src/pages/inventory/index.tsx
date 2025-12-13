import { getInventoryList } from "@/services/inventory/api";
import { PageContainer } from "@ant-design/pro-components";
import { Card, Tag, Typography, Spin, List, Space } from "antd";
import React, { useEffect, useState } from "react";

const { Text, Title } = Typography;

interface ParsedLog {
  user: string;
  product: string;
  store: string;
  time: string;
  raw: string;
}

const Inventory: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
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

  // 解析日志字符串
  const parseLog = (log: string): ParsedLog => {
    // 格式：用户名-商品名称-店铺位置 - 时间
    const parts = log.split(' - ');
    const time = parts.length > 1 ? parts[parts.length - 1] : '';
    const beforeTime = parts.slice(0, -1).join(' - ');
    
    // 分割用户名、商品、店铺
    const segments = beforeTime.split('-');
    if (segments.length >= 3) {
      return {
        user: segments[0].trim(),
        product: segments.slice(1, -1).join('-').trim(),
        store: segments[segments.length - 1].trim(),
        time: time.trim(),
        raw: log,
      };
    } else if (segments.length === 2) {
      return {
        user: segments[0].trim(),
        product: segments[1].trim(),
        store: '',
        time: time.trim(),
        raw: log,
      };
    }
    
    return {
      user: '',
      product: beforeTime,
      store: '',
      time: time.trim(),
      raw: log,
    };
  };

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
        const parsed = parseLog(log);
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
              {parsed.user && (
                <>
                  <Tag color="blue" style={{ margin: 0 }}>{parsed.user}</Tag>
                  <Text style={{ color: '#999' }}>-</Text>
                </>
              )}
              {parsed.product && (
                <>
                  <Text style={{ fontSize: '14px' }}>{parsed.product}</Text>
                  <Text style={{ color: '#999' }}>-</Text>
                </>
              )}
              {parsed.store && (
                <>
                  <Tag color="green" style={{ margin: 0 }}>{parsed.store}</Tag>
                  <Text style={{ color: '#999' }}>-</Text>
                </>
              )}
              {parsed.time && (
                <Tag color="orange" style={{ margin: 0, fontSize: '12px' }}>
                  {parsed.time}
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
        const parsed = parseLog(log);
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
              {parsed.user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color="blue" style={{ margin: 0 }}>用户</Tag>
                  <Text strong style={{ fontSize: '14px' }}>{parsed.user}</Text>
                </div>
              )}
              {parsed.product && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Tag color="purple" style={{ margin: 0 }}>商品</Tag>
                  <Text style={{ fontSize: '14px', flex: 1 }}>{parsed.product}</Text>
                </div>
              )}
              {parsed.store && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color="green" style={{ margin: 0 }}>店铺</Tag>
                  <Text style={{ fontSize: '14px' }}>{parsed.store}</Text>
                </div>
              )}
              {parsed.time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color="orange" style={{ margin: 0 }}>时间</Tag>
                  <Text style={{ fontSize: '13px' }}>
                    {parsed.time}
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
    <PageContainer>
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

