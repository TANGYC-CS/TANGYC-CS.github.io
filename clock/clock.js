
var seccondIndicator = document.querySelector(".second");
var minuteIndicator = document.querySelector(".minute");
var hourIndicator = document.querySelector(".hour");
setInterval(function () {
    var secondNum = new Date().getSeconds();
    var minuteNum = new Date().getMinutes();
    var hourNum = new Date().getHours();
    var numSecond = 180.5 + secondNum * 6;
    var numMinute = 180.5 + minuteNum * 6;
    var more = minuteNum / 60 * 30;
    var numHour = 181 + hourNum * 30 + more;
    console.log(minuteNum);
    console.log(more);
    seccondIndicator.style.transform = "rotate(" + numSecond + "deg)";
    minuteIndicator.style.transform = "rotate(" + numMinute + "deg)";
    hourIndicator.style.transform = "rotate(" + numHour + "deg)";
}, 0)

