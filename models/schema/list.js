import { TodoList } from '../mongo/db'
import { promises } from 'fs'

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
  let res = await TodoList.create({
    code: data.code, // 用户标识
    title: data.title, // -todo内容
    timer: new Date().getTime(), // 时间戳
    sort: 1, // 排序
    priority: data.grade // 优先级
  })
  return res
}

/**
 * 删除单条todo数据
 * @param {String} id
 */
export async function deleteTodoListDao(id) {
  try {
    let res = await TodoList.deleteOne({ _id: id })
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject()
  }
}

/**
 * 查询单条数据
 * @param {String} id
 */
export async function findByIdTodoListDao(id) {
  return await TodoList.findById(id)
}

/**
 * 更新单个todo文字
 * @param {string} id
 * @param {string} title
 */
export async function updateByIdTitleDao(id, title) {
  try {
    let res = TodoList.findByIdAndUpdate(id, { $set: { title } })
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(error)
  }
}
