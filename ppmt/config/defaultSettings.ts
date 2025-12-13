import type { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'top', // 顶部菜单布局
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '超线程',
  pwa: true,
  logo: '/icons/ccx.png',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    // 菜单选中项背景色
    siderMenuBg: '#fff',
    menuItemSelectedBg: '#e6f7ff', // 选中项背景色（浅蓝色）
    menuItemActiveBg: '#bae7ff', // 悬停项背景色（稍深一点的蓝色）
    colorPrimary: '#1890ff', // 主色（蓝色）
  },
};

export default Settings;
