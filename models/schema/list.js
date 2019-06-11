import { TodoList } from '../mongo/db';

/**
 * 查询当前todo内部的所有数据
 */
export async function getTodoListDao() {
  let list = await TodoList.find({});
  return list;
}
