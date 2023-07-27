// Author: Vrund Patel

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 
      'https://csci4177-dalcshub-api.onrender.com',
      // 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
