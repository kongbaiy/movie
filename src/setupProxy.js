const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(proxy('/api', { 
    target: 'http://localhost:8000',
    secure: false,
    changeOrigin: true,
    // pathRewrite: {
    //  "^/api": "/"
    // },
   }));
  
};