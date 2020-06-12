var inputText = document.querySelector(".input-text");
var inputBtn = document.querySelector(".input-btn");
var content = document.querySelector(".content");
inputBtn.onclick = function (e) {
    var val = inputText.value;
    if (val) {
        renderContent("mine", val);
        inputText.value = "";
        ajax({
            url: "https://developer.duyiedu.com/edu/turing/chat",
            type: "get",
            data: {
                text: val
            },
            success: function (res) {
                // console.log(res);
                var data = JSON.parse(res).text;
                console.log(data);
                renderContent("robot", data);
            }
        })
    }
}
inputText.onkeyup = function (e) {
    if (e.keyCode == 13) {
        inputBtn.click();
    }
}

// 渲染聊天框函数
function renderContent(who, text) {
    var Odiv = document.createElement("div");
    Odiv.className = who;
    var tamp = `<img class="avator" src = ${who == "mine" ? "./image/3.png" : "./image/dog1.jpg"} alt="">
                <div class="text">
                    ${text}
                </div>`
    Odiv.innerHTML = tamp;
    content.appendChild(Odiv);
    // content.scrollTop = content.scrollHeight;
    content.scrollTop = content.scrollHeight - content.offsetHeight;
}