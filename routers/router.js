import Router from 'koa-router';
import { getUserList, registry, login } from '../controllers/user';
import { getTodoList } from '../controllers/todo';
const router = new Router();

router.post('/registry', registry);

router.post('/login', login);

router.get('/todo', getTodoList);

router.get('/user', async (ctx, next) => {
  await next();
  let data = await getUserList();
  console.log(ctx.query); // 获取get参数
  // ctx.session.vcode = '2301';
  // console.log(ctx.session);
  ctx.body = {
    data,
    code: 200
  };
});

router.get('/', async ctx => {
  // 通过controllers 来获取数据库信息 router 层仅仅负责连接数据API与路由
  ctx.body = '后端框架 koa2';
});

export default router;
