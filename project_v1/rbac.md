rbac 权限划分系统 Role-Based Access Control

1: 超级管理员
2: 管理员
3: 普通用户


以学生成绩平台为例子
超管 就是开发人员
管理员 就是 教务处,

辅导员就是普通用户A
学生就是普通用户b

如有些功能
查看 首页通知公告

这个页面 是1 2 3都有权限

比如查看所有老师的联系方式  1  2 才能看
比如给普通用户 授权成为管理员 1 或者2


user 用户信息
role  角色表 role_id , role_name,
operate 操作表  operate_id, operate_name, path

// 1 - 访问学生成绩 - /student/score
// 2- 修改个人信息 - /user/update
授权的过程

longpanping  - 3/普通用户 - [1, 2, 10]
1-1-n

建立关联关系:
user - role 1对1
userRole表 user_id, role_id
roleOperate表 1对多 role_id, operate_id

{
  role_id = 1
  operate_id = 2
}
{
  role_id = 1
  operate_id = 10
}


页面上
3个东西
1: 用户列表
2: 角色组管理
3: 操作组管理
分别管理 user role operate  级联管理 userRole roleOperate 这5张表

path 是前端 和 后端 后期拿来做权限过滤的 auth
