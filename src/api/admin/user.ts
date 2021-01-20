import request from '@/utils/request'

// 后台用户登录
const Login = (data: any) => request.post('/admin/login', data)

const GetUserInfo = () => request.get('/admin/userinfo')

export { Login, GetUserInfo }
