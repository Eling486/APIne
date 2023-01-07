const fs = require('fs')
const path = require('path')

/**
 * 根据Json文件生成路由
 * @param {*} file 存放路由信息的json文件
 * @param {*} routerList 路由列表
 * @returns routerList 路由列表
 */
function json2Router(file, routerList = {}) {
    let json = fs.readFileSync(file);
    json = JSON.parse(json).routes

    function parseRouterJSON(json, base_path, key = "") {
        for (item in json) {
            if (typeof json[item] == "object") {
                parseRouterJSON(json[item], path.join(base_path, item), item)
            } else {
                if (item == "active") {
                    if (json.active == true) {
                        let router = base_path
                        let router_path = path.join("./routes", base_path)
                        // */a/index.js -> */a
                        // */a/b.js -> */a/b
                        if (key == "/" && base_path.length > 1) {
                            router = base_path.substr(0, base_path.length - 1)
                            router_path = path.join(router_path, "index")
                        }
                        if (json.path && json.path !== []) {
                            router_path = path.join("./routes", base_path.substr(0, base_path.length - key.length), json.path)
                        }
                        router = router.split(path.sep).join('/')
                        router_path = path.join(__dirname, `./${router_path}.js`.split(path.sep).join('/'))
                        if (fs.existsSync(router_path)) {
                            routerList[router] = router_path
                        } else {
                            console.warn(`Cannot find '${router_path}' for '${router}'!`)
                        }
                    }
                }
            }
        }
    }
    parseRouterJSON(json, "/")
    return routerList
}

module.exports = json2Router