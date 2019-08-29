import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routers/router';
import jwt from 'jsonwebtoken';
import session from 'koa-session2';
import cors from 'koa2-cors';

const app = new Koa();
app.use(
  cors({
    origin: function(ctx) {
      return 'http://192.168.1.13:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
);

// {
//   origin: function(ctx) {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     return '*';
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept']
// }
app.use(session({ key: 'SESSIONID' }, app));
//路由导航
router.use('/*', async (ctx, next) => {
  try {
    let user_token = ctx.cookies.get('user_token');
    jwt.verify(user_token, 'private');
    await next();
  } catch (error) {
    console.log('登录失效');
    ctx.body = {
      code: 202,
      data: '登录失效'
    };
  }
});
app.use(bodyParser()); // 解析request的body
app.use(router.routes());

app.listen(9000);
console.log('app started at port 9000...');
