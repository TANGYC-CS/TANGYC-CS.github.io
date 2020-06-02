// 看是否有cookie
var account = getCookie("account");
if (account) {
    var username = document.getElementById("username");
    username.innerText = account;
} else {
    location.href = "./login.html"
}
var studentIdTab = document.querySelector(".menuChange dd[data-id=student-id]");
var studentEditInfo = [];
var modal = document.getElementById("modal");
// 切换类名
function bindEvent() {
    var menuChange = document.getElementsByClassName("menuChange")[0];
    menuChange.onclick = function (e) {
        var target = e.target;
        if (target.tagName == "DD") {
            // console.log("dd");
            var siblings = getSiblings(target);
            for (var i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove("active");
            }
            target.classList.add("active");
            // 切换右边的内容
            var id = target.getAttribute("data-id");
            // console.log(id, target.dataset.id);
            var showContent = document.getElementById(id);
            showContent.style.display = "block";
            var siblingsContent = getSiblings(showContent);
            for (var i = 0; i < siblingsContent.length; i++) {
                siblingsContent[i].style.display = "none"
            }
        }
    }
    // 添加学生信息
    var addSubmite = document.getElementById("add-submite");
    addSubmite.onclick = function (e) {
        e.preventDefault();
        var addStudent = document.querySelector(".add-student-form")
        var addStudentInformation = getInformation(addStudent);
        if (addStudentInformation) {
            transformData("/api/student/addStudent", addStudentInformation, function (result) {
                alert(result.msg);
                studentIdTab.click();
                getTableInfo();
            })
        }
    }
    // 添加点击编辑按键
    var tbody = document.getElementById("tbody");
    tbody.onclick = function (e) {
        target = e.target;
        if (target.classList.contains("edit")) {
            var index = target.dataset.index;
            console.log(studentEditInfo[index]);
            modal.style.display = "block";
            renderEditForm(studentEditInfo[index]);
        } else if (target.classList.contains("remove")) {
            // 点击删除
            var dataIndex = target.dataset.index;
            var confirmValue = confirm("确定删除学号为" + studentEditInfo[dataIndex].sNo + "的学生信息吗");
            if (confirmValue) {
                transformData("/api/student/delBySno", { sNo: studentEditInfo[dataIndex].sNo }, function () {
                    getTableInfo();
                })
            }

        }
    }
    // 提交修改好了的学生信息
    var editSubmite = document.getElementById("edit-submite");
    editSubmite.onclick = function (e) {
        e.preventDefault();
        var editStudentForm = document.getElementsByClassName("edit-student-form")[0];
        var formData = getInformation(editStudentForm);
        // console.log(formData);
        transformData("/api/student/updateStudent", formData, function (res) {
            alert(res.msg);
            getTableInfo();
            modal.style.display = "none";
        })

    }
    // 点击灰色区域使编辑弹窗消失
    var modalContent = document.querySelector(".modal-content");
    modal.onclick = function () {
        modal.style.display = "none";
    }
    modalContent.onclick = function (e) {
        e.stopPropagation();
    }



}
bindEvent();
// 获取兄弟节点
function getSiblings(node) {
    var parentNode = node.parentNode;
    var children = parentNode.children;
    var siblings = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i] != node) {
            siblings.push(children[i]);
        }
    }
    return siblings;
}
// 添加学生信息
function getInformation(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var number = form.sNo.value;
    var birthYear = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if (!name || !sex || !email || !number || !birthYear || !phone || !address) {
        alert("信息填写不完整，请校验后填写");
        return false;
    }
    return {
        name: name,
        sex: sex,
        email: email,
        sNo: number,
        birth: birthYear,
        phone: phone,
        address: address,
    }
}
// 获取学生信息
function getTableInfo() {
    transformData("/api/student/findAll", {}, function (data) {
        // console.log(data.data)
        studentEditInfo = data.data;
        // console.log(studentEditInfo)
        renderTableInfo(data);
    })
}
getTableInfo();
// 渲染学生信息
function renderTableInfo(dataInfo) {
    // console.log(dataInfo.data);
    var studentInfo = dataInfo.data
    var str = "";
    for (var i = 0; i < studentInfo.length; i++) {
        // console.log(studentInfo[i]);
        str += `<tr>
        <td>${studentInfo[i].sNo}</td>
        <td>${studentInfo[i].name}</td>
        <td>${studentInfo[i].sex == 0 ? "男" : "女"}</td>
        <td>${studentInfo[i].email}</td>
        <td>${new Date().getFullYear() - studentInfo[i].birth}</td>
        <td>${studentInfo[i].phone}</td>
        <td>${studentInfo[i].address}</td>
        <td>
            <button class="edit" data-index = ${i}>编辑</button>
            <button class="remove" data-index = ${i}>删除</button>
        </td>
    </tr>`
    }
    var tbody = document.getElementById("tbody");
    // console.log(str);
    tbody.innerHTML = str;

}
// 网络请求模板
/**
 * @param {String} url 接口文档地址
 * @param {Object} dataAjax 对象数据
 */
function transformData(url, dataAjax, cb) {
    var str = "appkey=TANGYC_1590676462148";
    for (var prop in dataAjax) {
        str += "&" + prop + "=" + dataAjax[prop];
    }
    ajax("GET", "https://open.duyiedu.com" + url, str, function (result) {
        if (result.status == "success") {
            cb(result);
        } else {
            alert(result.msg);
        }
    })
}
// 编辑数据回填
function renderEditForm(data) {
    var editStudentForm = document.querySelector(".edit-student-form");
    for (var prop in data) {
        if (editStudentForm[prop]) {
            editStudentForm[prop].value = data[prop];
        }
    }
}




