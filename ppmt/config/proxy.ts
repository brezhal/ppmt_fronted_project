/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // 开发环境代理配置
  dev: {
    // 代理订单API请求 - 使用HTTP协议避免SSL问题
    '/api/orders/grab-list': {
      target: 'http://api.brezhal.xin',
      changeOrigin: true,
      pathRewrite: { '^/api/orders': '/orders' },
      logLevel: 'debug',
      secure: false, // 忽略SSL证书验证
    },
    '/api/orders/grab-list-search': {
      target: 'http://api.brezhal.xin',
      changeOrigin: true,
      pathRewrite: { '^/api/orders': '/orders' },
      logLevel: 'debug',
      secure: false, // 忽略SSL证书验证
    },
    '/api/orders/delete': {
      target: 'http://api.brezhal.xin',
      changeOrigin: true,
      pathRewrite: { '^/api/orders': '/orders' },
      logLevel: 'debug',
      secure: false, // 忽略SSL证书验证
    },
    // 代理库存信息API请求
    '/api/inventory/grab-logs': {
      target: 'http://129.211.71.79:8000',
      changeOrigin: true,
      pathRewrite: { '^/api/inventory': '' },
      logLevel: 'debug',
      secure: false, // 忽略SSL证书验证
    },
    // 代理其他API请求
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
