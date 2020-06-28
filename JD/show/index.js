$("#sliderBannerWrapper").swiper({
    animateType: "fade",
    isAutoChange: true,
    domList: $("#sliderBannerWrapper > .item"),
    showChangeBtn: "always",
    showSportBtn: true,
    sportBtnPosition: "left",
    width: 590,
    height: 470,
    showIndex: 0,
    autoTime: 3000,
})
$("#focusBrandWrapper").swiper({
    animateType: "fade",
    isAutoChange: true,
    domList: $("#focusBrandWrapper > .item"),
    showChangeBtn: "hover",
    showSportBtn: false,
    sportBtnPosition: "left",
    width: 190,
    height: 470,
    showIndex: 0,
    autoTime: 5000,
})