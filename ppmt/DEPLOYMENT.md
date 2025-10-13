# 生产环境部署说明

## 跨域问题解决方案

### 问题原因
生产环境部署后出现跨域问题，是因为：
1. 开发环境的UmiJS代理配置只在本地开发时有效
2. 生产环境需要Nginx来处理API代理
3. 前端直接请求后端API会触发浏览器的跨域限制

### 解决方案

#### 1. 更新Nginx配置
将以下配置添加到您的Nginx配置文件中：

```nginx
# 添加API代理配置 - 解决跨域问题
location /api/orders/ {
    # 代理到后端API - 使用HTTP协议
    proxy_pass http://api.brezhal.xin/orders/;
    proxy_set_header Host api.brezhal.xin;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto http;
    
    # 处理跨域
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
    
    # 处理预检请求
    if ($request_method = 'OPTIONS') {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        add_header Access-Control-Max-Age 1728000;
        add_header Content-Type 'text/plain; charset=utf-8';
        add_header Content-Length 0;
        return 204;
    }
}
```

#### 2. 完整的Nginx配置
参考项目根目录的 `nginx.conf` 文件，包含了完整的配置示例。

#### 3. 部署步骤

1. **更新Nginx配置**：
   - 将 `nginx.conf` 中的配置复制到您的宝塔面板Nginx配置中
   - 或者手动添加上述API代理配置

2. **重启Nginx**：
   ```bash
   nginx -t  # 测试配置
   nginx -s reload  # 重载配置
   ```

3. **验证配置**：
   - 访问 `https://x.brezhal.xin/api/orders/grab-list-search`
   - 应该能正常返回数据而不出现跨域错误

### 工作原理

1. **前端请求**：`/api/orders/grab-list-search`
2. **Nginx代理**：将请求转发到 `http://api.brezhal.xin/orders/grab-list-search`
3. **后端响应**：返回数据给Nginx
4. **Nginx返回**：添加CORS头后返回给前端

### 注意事项

- 确保后端API `api.brezhal.xin` 可以正常访问（HTTP协议）
- 配置使用HTTP协议请求后端API，避免SSL证书问题
- 可以根据需要调整CORS头设置，限制允许的域名

### 测试方法

部署后可以通过浏览器开发者工具的网络面板查看：
- 请求是否成功发送到 `/api/orders/` 路径
- 响应是否包含正确的CORS头
- 是否还有跨域错误
