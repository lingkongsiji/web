const get = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest;
        // 监听 statuschange
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    resolve(xhr.response)
                } else {
                    reject({
                        errorType: "onerror",
                        xhr: xhr,
                    });
                }
            }
        }
        //发送请求
        xhr.open("GET", url, true)
        xhr.send()
    })
}

const post = (url,data) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest;
        // 监听 statuschange
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    resolve(xhr.response)
                } else {
                    reject({
                        errorType: "onerror",
                        xhr: xhr,
                    });
                }
            }
        }
        //发送请求
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Accept", "application/json")
        xhr.send(JSON.parse(data))
    })
}

module.exports = {
    get,
    post,
}