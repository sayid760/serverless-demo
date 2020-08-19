import { request } from './index'

/**
 * 登录
 * @param {}
 */
export const login = (data) => request.post('/login', data)

/**
 * 退出
 * @param {}
 */
export const loginOut = (data) => request.post('/logout', data)



export const getUserInfor = () => request.get('/getUserInfor')