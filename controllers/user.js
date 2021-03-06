import { getUserListDao, registryDao, LoginDao } from '../models/schema/user';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

/**
 *注册接口
 *
 * @export
 * @param {Koa} ctx
 * @param {Next} next
 */
export async function registry(ctx, next) {
  const { email, username, password } = ctx.request.body;
  let MD5password = md5(password);
  await registryDao(email, username, MD5password)
    .then(() => {
      ctx.body = { code: 1 };
    })
    .catch(err => {
      ctx.body = { code: 200, data: err };
    });
}

/**
 * 登录接口
 * @param {Koa} ctx
 * @param {Next} next
 */
export async function login(ctx, next) {
  const { email, password } = ctx.request.body;
  let MD5password = await md5(password);
  await LoginDao(email, MD5password)
    .then(res => {
      console.log('登陆成功');
      console.log(res);
      // 登录 成功 生成token 返回状态码
      setToken(res._id)
        .then(token => {
          ctx.cookies.set('user_token', token);
        })
        .then(() => {
          ctx.body = { code: 1 };
        });
    })
    .catch(err => {
      ctx.body = { code: 2, data: err };
    });
}

/**
 * 返回用户列表
 * @export
 * @returns
 */
export async function getUserList() {
  return await getUserListDao();
}

/**
 * 生成token
 * @param {String} code
 */
function setToken(code) {
  return new Promise((resolve, reject) => {
    var user_token = jwt.sign(
      {
        user: code
      },
      'private',
      {
        expiresIn: 60 * 60 * 24 *15 // 半个月
      }
    );
    resolve(user_token);
  });
}

/**
 * 登出控制器
 * @param {*} ctx
 * @param {*} next
 */
export async function loginout(ctx, next) {
  await ctx.cookies.set('user_token', '');
  ctx.body = {
    code: 1,
    data: '退出登录成功'
  };
  await next();
}
