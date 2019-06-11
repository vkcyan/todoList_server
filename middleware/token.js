import jwt from 'jsonwebtoken';
/**
 * 验证登录态
 */
export default function verification() {
  return async (ctx, next) => {
    let user_token = ctx.cookies.get('user_token');
    console.log(user_token);
    try {
      let decode = jwt.verify(user_token, 'private');
      console.log(decode, '登录态存在');
      await next();
    } catch (error) {
      console.log('登录态失效');
      return (ctx.body = {
        code: 202,
        data: '登录失效'
      });
    }
  };
}
