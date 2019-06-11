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
 * @param {*} ctx
 * @param {*} next
 */
export async function login(ctx, next) {
  const { email, password } = ctx.request.body;
  let MD5password = md5(password);
  var user_token = jwt.sign(
    {
      user: MD5password
    },
    'private',
    {
      expiresIn: 60 * 60 // 1小时
    }
  );
  ctx.cookies.set('user_token', user_token);
  await next();
  await LoginDao(email, MD5password)
    .then(res => {
      ctx.body = { code: 1 };
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
