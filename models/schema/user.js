import { User } from '../mongo/db';

export async function getUserListDao() {
  let data = await User.find({});
  return data;
}

/**
 * 注册 Dao层
 *
 * @export
 * @param {Srting} email 邮箱
 * @param {String} username 用户名
 * @param {String} MD5password md5 加密后的密码
 */
export async function registryDao(email, username, pass) {
  // 存储之前先查用户是否存在
  let userList = await User.find({ email });
  if (userList.length > 0) {
    return Promise.reject('当前邮箱已经注册');
  }
  let userNameList = await User.find({ username });
  if (userNameList.length > 0) {
    return Promise.reject('当前用户名已经存在');
  }
  let res = await User.create({
    email,
    pass,
    username,
    activation: false
  });
  return res;
}

/**
 *登录验证接口
 *
 * @export
 * @param {String} email 邮箱
 * @param {String} pass 密码
 * @returns
 */
export async function LoginDao(email, pass) {
  let user = await User.find({ email });
  if (user.length == 0) {
    return Promise.reject('当前邮箱未注册');
  }
  // 密码正确
  if (user.pass == pass) {
    return Promise.resolve();
  }
}
