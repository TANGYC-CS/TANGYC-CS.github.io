function ajax(options) {
    // 创建对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return alert("当前浏览器不支持XMLHttprequest请求");
    }
    // 建立连接
    var dataStr = "";
    if (typeof options.data == "object") {
        for (var prop in options.data) {
            if (options.data.hasOwnProperty(prop)) {
                dataStr += prop + "=" + options.data[prop] + "&";
            }
        }
    } else if (typeof options.data == "string") {
        dataStr = options.data;
    } else {
        // return alert("数据格式只能为对象或者字符串");
        dataStr = "";
    }
    options.type = options.type.toUpperCase();
    // 查看状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                options.success(xhr.responseText);
            }
        }
    }
    if (options.type == "GET") {
        xhr.open(options.type, options.url + "?" + dataStr, options.async);
        // 发送请求，传递数据  
        xhr.send();
    } else if (options.type == "POST") {
        xhr.open(options.type, options.url, options.async);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send(dataStr);
    }
}