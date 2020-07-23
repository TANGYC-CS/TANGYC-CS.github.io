const workDays = $(".workday").find("input"),
    overTimes = $(".over-time").find("input"),
    isFull = $(".is-full").find("input"),
    systemPay = $(".system-pay").find("input"),
    monitor = $(".monitor").find("input"),
    totalPerson = $(".total-person"),
    payBtn = $(".pay-btn"),
    workDaysLists = [],  //工日数组
    overTimesLists = [], //加班数组
    isFullLists = [],    //是否全勤数组
    systemPayLists = [],    //是否有制度奖数组
    monitorLists = [],   //是否为班长有无奖金数组
    personSalaryLists = [];    //计算后每个人工资的数组


// const workmonth = prompt("请输入需要计算工资的月份", "")
// const workdays = prompt("这个月是有多少天", "");
// workDays.val(workdays);  //设置这个月有多少天
// $("caption")[0].innerText = workmonth + "月份的工资表"   //设置表头几月份信息

payBtn.click(() => {
    if (workDaysLists.length > 0) {
        workDaysLists.length = 0;
    }
    if (overTimesLists.length > 0) {
        overTimesLists.length = 0;
    }
    if (isFullLists.length > 0) {
        isFullLists.length = 0;
    }
    if (systemPayLists.length > 0) {
        systemPayLists.length = 0;
    }
    if (monitorLists.length > 0) {
        monitorLists.length = 0;
    }
    if (personSalaryLists.length > 0) {
        personSalaryLists.length = 0;
    }


    //是否全勤，做出相应判断
    for (let i = 0; i < workDays.length; i++) {
        workDaysLists.push(workDays[i].value)
        if (workDays[i].value == 31) {
            isFull[i].value = "是";
        } else {
            isFull[i].value = "否";
        }
    }
    for (let i = 0; i < overTimes.length; i++) {
        overTimesLists.push(overTimes[i].value)
    }
    for (let i = 0; i < isFull.length; i++) {
        isFullLists.push(isFull[i].value)
    }
    for (let i = 0; i < systemPay.length; i++) {
        systemPayLists.push(systemPay[i].value)
    };
    for (let i = 0; i < monitor.length; i++) {
        monitorLists.push(monitor[i].value)
    };
    calculate()
})

// 计算各个人的工资
function calculate() {
    for (let i = 0; i < workDaysLists.length; i++) {
        if (isFullLists[i] == "是" && systemPayLists[i] == "是") {
            personSalaryLists.push(parseInt(workDaysLists[i]) * 120 + parseInt(overTimesLists[i]) * 60 + 500 + 100 + parseInt(monitorLists[i]));
        } else if (isFullLists[i] == "是" && systemPayLists[i] == "否") {
            personSalaryLists.push(parseInt(workDaysLists[i]) * 120 + parseInt(overTimesLists[i]) * 60 + 500 + 0 + parseInt(monitorLists[i]));
        } else if (isFullLists[i] == "否" && systemPayLists[i] == "是") {
            personSalaryLists.push(parseInt(workDaysLists[i]) * 120 + parseInt(overTimesLists[i]) * 60 + 0 + 100 + parseInt(monitorLists[i]));
        } else if (isFullLists[i] == "否" && systemPayLists[i] == "否") {
            personSalaryLists.push(parseInt(workDaysLists[i]) * 120 + parseInt(overTimesLists[i]) * 60 + 0 + 0 + parseInt(monitorLists[i]));
        }

    }
    console.log(personSalaryLists);
    fillSalary()
}
// 填充每个人的工资
function fillSalary() {
    for (let i = 0; i < totalPerson.length; i++) {
        totalPerson[i].innerText = personSalaryLists[i];
    }
}



