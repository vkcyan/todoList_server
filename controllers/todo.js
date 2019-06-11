import { getTodoListDao } from '../models/schema/list';

/**
 * 获取todo列表
 * @param {*} ctx
 * @param {*} next
 */
export async function getTodoList(ctx, next) {
  let list = await getTodoListDao();
  ctx.body = {
    data: list,
    code: 1
  };
  await next();
}
