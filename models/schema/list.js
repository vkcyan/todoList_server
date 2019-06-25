import { TodoList } from '../mongo/db'

/**
 * 查询当前todo内部的所有数据
 */
export async function getTodoListDao() {
  let list = await TodoList.find({})
  return list
}

/**
 * 保存todo
 * @param {Object} data
 */
export async function setTodoListDao(data) {
  let res = TodoList.create({
    code: data.code, // 用户标识
    title: data.title, // -todo内容
    timer: new Date().getTime(), // 时间戳
    sort: 1, // 排序
    priority: data.grade // 优先级
  })
  return res
}
