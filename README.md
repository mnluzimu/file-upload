# Task Manager

### 创建任务

`src\pages\upload\base\index.vue`

### 任务列表

`src\pages\upload\base\index.vue`

主要修改 columns 变量，里面 colKey 对应的是 data 这个 list 里面每个 dict 的 key 的名称

上面 template 里可以改变字段的显示形式

### 修改地址

`/vite.config.js`

```js
server: {
      host: '0.0.0.0',
      port: 5050,
      proxy: {
        '/api': {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target: 'http://10.158.217.11:8080',
          changeOrigin: true,
        },
      },
    },
```

修改port可以改变前端页面所在端口

`src\config\host.ts`

```js
  development: {
    // 开发环境接口请求
    API: 'http://10.158.217.11:8080',
    // 开发环境 cdn 路径
    CDN: '',
  },
```

修改API可以改变发送路径
