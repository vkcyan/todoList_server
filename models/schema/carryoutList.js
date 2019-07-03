import { carryOutList } from '../mongo/db'

/**
 * 查询已经完成的todo内部的所有数据
 */
export async function getCarryOutListDao() {
  let list = await carryOutList.find({})
  return list
}

/**
 * 存储已经完成的todo
 * @param {Object} data
 */
export async function setCarryOutListDao(data) {
  let list = {
    code: data.code, // 用户标识
    title: data.title, // -todo内容
    timer: data.timer, // 时间 xxxx-xx-xx (年月日)
    priority: data.priority // 优先级
  }
  return await carryOutList.create(list)
}
