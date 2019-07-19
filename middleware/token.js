import jwt from 'jsonwebtoken';
/**
 * 验证登录态
 */
export async function verification(ctx, next) {
  try {
    await next();
  } catch (e) {
    console.log('出现了错误', e);
    return;
  }
}
