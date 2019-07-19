import Router from 'koa-router';
import { getUserList, registry, login, loginout } from '../controllers/user';
import {
  getTodoList,
  setTodoList,
  carryOutTodo,
  updateTitle,
  mobilTodo
} from '../controllers/todo';
const router = new Router();

// 注册接口
router.post('/registry', registry);

// 登录接口
router.post('/login', login);

// 获取todoList的数列
router.get('/todo', getTodoList);

// 添加todoList
router.post('/getTodo', setTodoList);

// 完成todoList
router.post('/carryOutTodo', carryOutTodo);

// 修改todo的内容
router.post('/updateTitle', updateTitle);

// 拖拽修改接口
router.post('/mobilTodo', mobilTodo);

// 登出
router.post('/loginout', loginout);

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
