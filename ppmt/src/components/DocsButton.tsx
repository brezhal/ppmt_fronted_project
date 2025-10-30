import { BookOutlined } from '@ant-design/icons';
import { Drawer, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const { Paragraph, Title } = Typography;

const drawerBodyStyle: React.CSSProperties = {
  padding: 16,
  overflow: 'auto',
};

const triggerStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 8px',
  cursor: 'pointer',
};

const markdownContainerStyle: React.CSSProperties = {
  maxWidth: 860,
  margin: '0 auto',
};

const DocsButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!open || content) return;
    setLoading(true);
    fetch('/docs/usage.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
      .finally(() => setLoading(false));
  }, [open, content]);

  return (
    <>
      <span style={triggerStyle} onClick={() => setOpen(true)}>
        <BookOutlined />
        <span>使用文档</span>
      </span>
      <Drawer
        title="使用文档"
        placement="right"
        width={720}
        open={open}
        onClose={() => setOpen(false)}
        bodyStyle={drawerBodyStyle}
      >
        {loading ? (
          <Paragraph>加载中...</Paragraph>
        ) : (
          <div style={markdownContainerStyle} className="docs-md">
            <style>{`
              .docs-md table { width: 100%; border-collapse: collapse; margin: 12px 0; }
              .docs-md th, .docs-md td { border: 1px solid #f0f0f0; padding: 8px 12px; text-align: left; }
              .docs-md thead th { background: #fafafa; font-weight: 600; }
              .docs-md tbody tr:nth-child(odd) { background: #fcfcfc; }
              .docs-md p { margin: 8px 0; }
              .docs-md h1, .docs-md h2, .docs-md h3, .docs-md h4 { margin: 16px 0 8px; }
              .docs-md img { max-width: 100%; height: auto; }
              .docs-md video { width: 100%; height: auto; outline: none; }
              .docs-md a { color: #1677ff; }
              .docs-md .md-danger { color: #cf1322; }
              .docs-md .md-danger strong { color: #a8071a; }
              .docs-md .md-row { display: flex; gap: 12px; align-items: flex-start; }
              .docs-md .md-row img { width: 50%; height: auto; }
            `}</style>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default DocsButton;


