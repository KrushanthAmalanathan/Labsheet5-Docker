const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/items", createProxyMiddleware({
    target: "http://item-service:8081",
    changeOrigin: true
}));

app.use("/orders", createProxyMiddleware({
    target: "http://order-service:8082",
    changeOrigin: true
}));

app.use("/payments", createProxyMiddleware({
    target: "http://payment-service:8083",
    changeOrigin: true
}));

app.listen(8080, () => {
    console.log("API Gateway running on port 8080");
});