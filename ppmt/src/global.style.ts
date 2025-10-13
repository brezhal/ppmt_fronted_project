import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    colorWeak: {
      filter: 'invert(80%)',
    },
    'ant-layout': {
      minHeight: '100vh',
    },
    'ant-pro-sider.ant-layout-sider.ant-pro-sider-fixed': {
      left: 'unset',
    },
    // Header 图标圆角样式
    '.ant-pro-global-header-logo': {
      borderRadius: '8px !important',
      overflow: 'hidden',
    },
    '.ant-pro-global-header-logo img': {
      borderRadius: '8px !important',
    },
        '.ant-pro-global-header-logo .ant-pro-global-header-logo-link': {
          borderRadius: '8px !important',
          overflow: 'hidden',
          display: 'block',
        },
        // 移动端去除页面容器边距
        '@media (max-width: 768px)': {
          '.ant-pro-page-container-children-container': {
            paddingBlockStart: '0 !important',
            paddingBlockEnd: '0 !important',
            paddingInline: '0 !important',
          },
        },
    canvas: {
      display: 'block',
    },
    body: {
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'ul,ol': {
      listStyle: 'none',
    },
    '@media(max-width: 768px)': {
      'ant-table': {
        width: '100%',
        overflowX: 'auto',
        '&-thead > tr,    &-tbody > tr': {
          '> th,      > td': {
            whiteSpace: 'pre',
            '> span': {
              display: 'block',
            },
          },
        },
      },
    },
  };
});

export default useStyles;
