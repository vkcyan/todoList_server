import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routers/router';
import token from './middleware/token';
import session from 'koa-session2';
import cors from 'koa2-cors';

const app = new Koa();

app.use(
  session(
    {
      key: 'SESSIONID'
    },
    app
  )
);
app.use(
  cors({
    origin: ctx => {
      return 'http://192.168.1.13:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
);
app.use(bodyParser()); // 解析request的body
app.use(router.routes());
app.use(token());
app.listen(9000);

console.log('app started at port 9000...');
