import {
  getTodoListDao,
  setTodoListDao,
  deleteTodoListDao,
  findByIdTodoListDao,
  updateByIdTitleDao
} from '../models/schema/list'
import { setCarryOutListDao } from '../models/schema/carryoutList'
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
      id: res._id,
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

/**
 * 完成todo 并添加到完成表中
 * @param {Koa} ctx
 * @param {Next} next
 */
export async function carryOutTodo(ctx, next) {
  const { id } = ctx.request.body
  try {
    // 查询单个数据数据
    let data = await findByIdTodoListDao(id)
    // 存储到完成表
    let time = new Date(data.timer)
    let carryTime = `${time.getFullYear()}-${time.getMonth() +
      1}-${time.getDate()}`
    // 深复制
    let datas = JSON.parse(JSON.stringify(data))
    datas.timer = carryTime
    await setCarryOutListDao(datas)
    // 删除当前表信息
    await deleteTodoListDao(id)
    ctx.body = {
      data,
      code: 1
    }
  } catch (error) {
    ctx.body = {
      data: {
        error
      },
      code: 2
    }
  }
  await next()
}

/**
 * 更新单个todo
 * @param {Koa} ctx
 * @param {Next} next
 */
export async function updateTitle(ctx, next) {
  let { id, title } = ctx.request.body
  console.log(id, title)
  // await updateByIdTitleDao(id, title)
  await next()
}
