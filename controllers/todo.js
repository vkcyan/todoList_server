import { getTodoListDao, setTodoListDao } from '../models/schema/list'
import jwt from 'jsonwebtoken'
/**
 * 获取todo列表
 * @param {Koa} ctx
 * @param {Next} next
 */
export async function getTodoList(ctx, next) {
  let list = await getTodoListDao()
  let data = []
  list.forEach(res => {
    data.push({
      code: res.code,
      priority: res.priority,
      sort: res.sort,
      timer: res.timer,
      title: res.title
    })
  })
  ctx.body = {
    data,
    code: 1
  }
  await next()
}

/**
 * 添加todo列表
 * @param {Koa} ctx
 * @param {Next} next
 */
export async function setTodoList(ctx, next) {
  const { title, grade } = ctx.request.body
  let token = jwt.verify(ctx.cookies.get('user_token'), 'private')
  const data = {
    code: token.user,
    title,
    grade
  }
  try {
    await setTodoListDao(data)
    ctx.body = {
      data: '保存成功',
      code: 1
    }
  } catch (error) {
    ctx.body = {
      data: '保存失败' + error,
      code: 2
    }
  }
  await next()
}
