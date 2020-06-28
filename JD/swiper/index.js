(function () {
    // 创建构造函数
    function Slider(options, wrap) {
        this.wrap = wrap;
        this.animateType = options.animateType || "fade";
        this.isAutoChange = options.isAutoChange !== undefined ? options.isAutoChange : true;
        this.domList = options.domList || [];
        this.showChangeBtn = options.showChangeBtn || "always";
        this.showSportBtn = options.showSportBtn !== undefined ? options.showSportBtn : true;
        this.width = options.width || $(wrap).width();
        this.height = options.height || $(wrap).height();
        this.len = options.domList.length;
        this.nowIndex = options.showIndex || 0;
        this.lock = false;
        this.sportBtnPosition = options.sportBtnPosition || "left";
        this.timer = null;
        this.autoTime = options.autoTime || 4000;
    }
    // 创建轮播图结构
    Slider.prototype.createElement = function () {
        var swiperWrapper = $('<div class="my-swiper"></div>');
        var swiperContent = $('<ul class="my-swiper-content"></ul>');
        var spotBtn = $('<div class="my-swiper-spot"></div>')
        for (var i = 0; i < this.domList.length; i++) {
            var oLi = $('<li class="my-swiper-item"></li>')
            oLi.append($(this.domList[i])).appendTo(swiperContent);
            spotBtn.append("<span></span>")
        }
        // console.log(this.domList[0]);
        if (this.animateType == "animation") {
            $('<li class="my-swiper-item"></li>').append($(this.domList[0]).clone()).appendTo(swiperContent);
        }
        var leftBtn = $('<div class="lBtn contentBtn" onselectstart="return false" οnselect="document.selection.empty()">&lt;</div>');
        var rightBtn = $('<div class="rBtn contentBtn" onselectstart="return false" >&gt;</div>');
        swiperWrapper.append(swiperContent)
            .append(spotBtn)
            .append(leftBtn)
            .append(rightBtn)
            .appendTo($(this.wrap));
    }
    Slider.prototype.initStyle = function () {
        $(".my-swiper", this.wrap).css({
            width: this.width,
            height: this.height,
        }).find(".my-swiper-content")
            .find(".my-swiper-item").css({
                width: this.width,
                height: this.height
            })
            .end().end().find(".my-swiper-spot > span").eq(this.nowIndex).addClass("active")
        if (this.animateType == "fade") {
            $(".my-swiper", this.wrap).find(".my-swiper-content").css({
                width: this.width,
                height: this.height,
                position: "relative",
            }).find(".my-swiper-item").css({
                position: "absolute",
            }).hide().eq(this.nowIndex).show();
        } else if (this.animateType == "animation") {
            $(".my-swiper", this.wrap).find(".my-swiper-content").css({
                width: this.width * (this.len + 1),
                height: this.height,
                left: -this.width * this.nowIndex,
                position: "absolute",
            }).find(".my-swiper-item").css({
                float: "left",
            })
        }
        // 显示小圆点和左右按钮显示的情况
        if (!this.showSportBtn) {
            $(".my-swiper", this.wrap).find(".my-swiper-spot").hide();
        }
        if (this.sportBtnPosition == "center" || this.sportBtnPosition == "right") {
            $(".my-swiper-spot", this.wrap).css({
                textAlign: this.sportBtnPosition,
            })
        }
        if (this.showChangeBtn == "none") {
            $(".my-swiper", this.wrap).find(".contentBtn").hide()
        } else if (this.showChangeBtn == "hover") {
            var self = this;
            $(".my-swiper", this.wrap).find(".contentBtn").hide()
            $(".my-swiper", this.wrap).hover(function () {
                $(".my-swiper", self.wrap).find(".contentBtn").show();
            }, function () {
                $(".my-swiper", self.wrap).find(".contentBtn").hide();
            })
        }

    }
    // 创建点击事件
    Slider.prototype.bindEvent = function () {
        var self = this;
        $(".rBtn", this.wrap).click(function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            if (self.animateType == "animation") {
                if (self.nowIndex == self.len) {
                    $(".my-swiper-content", self.wrap).css({
                        left: 0
                    })
                    self.nowIndex = 1;
                } else {
                    self.nowIndex++;
                }
            } else {
                self.nowIndex++;
            }
            self.changeStyle();
        })
        $(".lBtn", this.wrap).click(function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            if (self.animateType == "animation") {
                if (self.nowIndex == 0) {
                    $(".my-swiper-content", self.wrap).css({
                        left: -self.len * self.width
                    })
                    self.nowIndex = self.len - 1;
                } else {
                    self.nowIndex--;
                }
            } else {
                self.nowIndex--;
            }
            self.changeStyle();
        })
        $(".my-swiper-spot", this.wrap).on("mouseenter", "span", function () {
            // console.log($(this).index());
            if (self.lock) {
                return false;
            }
            self.lock = true;
            self.nowIndex = $(this).index();
            self.changeStyle();
        })
        $(".my-swiper-content", this.wrap).mouseenter(function () {
            // console.log(this);
            clearInterval(self.timer);
        }).mouseleave(function () {
            // console.log(101);
            if (self.isAutoChange) {
                self.autoMove()
            }
        })
    }
    // 切换样式
    Slider.prototype.changeStyle = function () {
        var self = this;
        if (this.animateType == "animation") {
            $(".my-swiper-content", this.wrap).animate({
                left: -this.nowIndex * this.width
            }, function () {
                self.lock = false;
            })
        } else {
            $(".my-swiper-content", this.wrap).find(".my-swiper-item").fadeOut().eq(this.nowIndex % this.len).fadeIn(function () {
                self.lock = false;
            })
        }
        $(".my-swiper", this.wrap).find(".my-swiper-spot > span")
            .removeClass("active")
            .eq(this.nowIndex % this.len)
            .addClass("active");

    }
    Slider.prototype.autoMove = function () {
        var self = this;
        this.timer = setInterval(function () {
            $(".rBtn", self.wrap).trigger("click")
        }, this.autoTime)
    }
    // 创建实例对象方法
    $.fn.extend({
        swiper: function (options) {
            var obj = new Slider(options, this);
            obj.createElement();
            obj.initStyle();
            obj.bindEvent();
            if (obj.isAutoChange) {
                obj.autoMove();
            };
        }
    })
})()
