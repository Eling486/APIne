const network = {
    /**
     * 端口标准化
     * @param {*} val 
     * @returns 
     */
    normalizePort: (val) => {
        let port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }

        if (port >= 0) {
            return port;
        }

        return false;
    },

    /**
     * 获取设备种类
     * @param {*} req 
     * @returns 
     */
    getMachine: (req) => {
        var deviceAgent = req.headers["user-agent"].toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|android)/);
        if (agentID) {
            return "mobile";
        } else {
            return "pc";
        }
    },

    /**
     * IPv4地址的字符串与整数格式互转
     * @param {*} data 
     * @returns 
     */
    ipTrans: (data) => {
        if (data.indexOf('.') < 0) {
            let num = Number(data)
            let ip = new Array();
            ip[0] = (num >>> 24) >>> 0;
            ip[1] = ((num << 8) >>> 24) >>> 0;
            ip[2] = (num << 16) >>> 24;
            ip[3] = (num << 24) >>> 24;
            console.log(ip)
            return ip.join('.')
        } else {
            let ip = data.split('.')
            if (ip.length !== 4) {
                return undefined
            }
            let result = Number(ip[0]) * Math.pow(256, 3) + Number(ip[1]) * Math.pow(256, 2) + Number(ip[2]) * 256 + Number(ip[3])
            return result >>> 0
        }
    },
}

module.exports = network;