import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/sunlight', {
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', () => {
  console.log('[mongo error]')
})
db.once('open', () => {
  console.log('[mongo start]')
})

// 用户表
const userSchema = new mongoose.Schema({
  email: String, // 邮箱
  pass: String, // 密码
  username: String, // 用户名
  activation: Boolean // 是否激活
})

// 当前未完成的todo表
const todoSchema = new mongoose.Schema({
  code: String, // 用户标识
  title: String, // -todo内容
  timer: Number, // 时间戳
  sort: Number, // 排序
  priority: Number // 优先级
})

// 已经完成的todo表
const carryOutSchema = new mongoose.Schema({
  code: String, // 用户标识
  title: String, // -todo内容
  timer: String, // 时间 xxxx-xx-xx (年月日)
  priority: Number // 优先级
})

export const User = mongoose.model('user', userSchema)
export const TodoList = mongoose.model('todoList', todoSchema)
export const carryOutList = mongoose.model('carryoutList',carryOutSchema)


// User.create({ name: '第一次', code: '312312312312312313123123123' }, err => {
//   if (!err) {
//     console.log('添加成功');
//   }
// });
