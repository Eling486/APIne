const status = [
    {
        code: 0,
        msg: {
            zh_cn: 'ok'
        }
    },
    {
        code: -404,
        msg: {
            zh_cn: '路由不存在'
        }
    },
    {
        code: -500,
        msg: {
            zh_cn: '服务器异常',
            en: 'Server exception'
        }
    },
    {
        code: -501,
        msg: {
            zh_cn: '用户相关异常'
        },
        children: [
            {
                code: -50101,
                msg: {
                    zh_cn: '用户未登录'
                },
            },
            {
                code: -50102,
                msg: {
                    zh_cn: '用户权限不足'
                },
            },
            {
                code: -50103,
                msg: {
                    zh_cn: '登陆已过期'
                },
            },
            {
                code: -50104,
                msg: {
                    zh_cn: '用户不存在'
                },
            },
            {
                code: -50105,
                msg: {
                    zh_cn: '用户被封禁'
                },
            },
            {
                code: -50106,
                msg: {
                    zh_cn: 'Token不合法'
                },
            },
        ]
    },
    {
        code: -502,
        msg: {
            zh_cn: '请求失败'
        }
    },
    {
        code: -503,
        msg: {
            zh_cn: '参数有误'
        }
    },
    {
        code: -504,
        msg: {
            zh_cn: '请求超时'
        }
    },
]

module.exports = status