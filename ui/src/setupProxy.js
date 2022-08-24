

const { createProxyMiddleware } = require("http-proxy-middleware");
const httpJsonDevUrl =
  process.env.REACT_APP_HTTP_JSON ? process.env.REACT_APP_HTTP_JSON : "http://localhost:7575";

/**
 * @return {Boolean}
 */
const filter = function (pathname, req) {
  // Proxy requests to the http json api when in development
  const proxied = pathname.match("^/v1") && process.env.NODE_ENV === "development";

  if (proxied) {
    console.log(
      `Request with path ${pathname} proxied from host ${req.headers.host} to host ${httpJsonDevUrl}`
    );
  }

  return proxied;
};

module.exports = function (app) {
  app.use(
    createProxyMiddleware(filter, {
      target: httpJsonDevUrl,
      ws: true, //Proxy websockets
      changeOrigin: true, // needed for virtual hosted sites
    })
  );
};

