const {createProxyMiddleware} = require("http-proxy-middleware");

const BACKEND_USER_SERVICE_HOST = process.env.BACKEND_USER_SERVICE_HOST;
const BACKEND_NOTE_SERVICE_HOST = process.env.BACKEND_NOTE_SERVICE_HOST;

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/api/v1/users", {
            target: BACKEND_USER_SERVICE_HOST,
            changeOrigin: true,
        }),
    );
    app.use(
        createProxyMiddleware("/api/v1/notes", {
            target: BACKEND_NOTE_SERVICE_HOST,
            changeOrigin: true,
        }),
    );
};
