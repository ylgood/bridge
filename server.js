const port = 6660;
const Koa = require("koa2");
// 路由
const route = require("koa-route");
// koa封装的websocket这是官网（很简单有时间去看一下https://www.npmjs.com/package/koa-websocket）
const websockify = require("koa-websocket");
const msg = require("./main/msg");
const app = websockify(new Koa());
app.ws.use(function(ctx, next) {
  ctx.websocket.send(JSON.stringify({ action: "ok", data: "连接成功" }));
  return next(ctx);
});
app.ws.use(route.all("/", function(ctx) {
  /**接收消息*/
  ctx.websocket.on("message", function(message) {
    msg.analysis(message, m => ctx.websocket.send(m));
  });
}));

app.listen(port, () => {
  console.log("localhost:" + port);
});