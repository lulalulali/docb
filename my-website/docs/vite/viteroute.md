---
# layout: home
hero:
  title: Luyou
  description: Explore the amazing content we have to offer.
---

## VitePress提供简洁 URL的服务器端支持

要在 VitePress 中使用简洁的 URL，需要服务器端支持 URL 重写或路由配置。通常，这需要服务器配置支持 URL 重写规则，确保服务器能够正确地解析和响应这些简洁的 URL。

对于 VitePress 或其他静态站点生成器，你可以使用服务器（如 Nginx、Apache 等）的配置来处理这一点。以下是一些常用的服务器配置示例：

### Nginx 配置示例

如果你使用 Nginx 作为服务器，可以通过配置文件实现 URL 重写。示例配置如下：

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        try_files $uri $uri/ @rewrites;
    }

    location @rewrites {
        rewrite ^/(.*)$ /index.html last;
    }
}
```

这个配置将所有的 URL 请求都重定向到 `index.html` 文件，然后由 VitePress 处理路由。

### Apache 配置示例

如果你使用 Apache 服务器，可以通过 `.htaccess` 文件进行 URL 重写。示例配置如下：

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

这个配置会将所有请求指向 `index.html`，这样 VitePress 就能处理路由了。

请注意，以上示例配置可能需要根据你的具体情况进行调整。在实际应用中，确保备份你的服务器配置文件，并谨慎修改。

在配置完成之后，服务器就能正确地解析 VitePress 中的路由并提供简洁的 URL 支持了。
