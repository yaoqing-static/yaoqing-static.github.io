$.cookie('authInfo', 'Basic NThlZWRjZTk5M2EwYjM2MDI5ODkyOGFjOmEyZTY1YWM1ZWIxNWI2MTdiODE1NjMzYjgxYjI1OTM3');
$.cookie('headerVersion', 'YuLong-Coolpad Y75;4.4.4;5.7.3.52;!svn_revision!;1.1');
var myApp = angular.module('myApp', ['ui.router']);
function getQueryString(name) {
    var after = window.location.hash.split("?")[1];
    if (after) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = after.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return null;
        }
    }
}


myApp.directive('templateMould', ['$document', function ($document) {
    return {
        restrict: 'AE',
        scope: {
            type: '=type',
            modelData: '=modelData'
        },
        templateUrl: 'components/template-archives.html',
        link: function (scope, element, attr) {
        }
    };
}]);


var bgColor = $.cookie("themeColor");
var THEME_ORANGE = 0;
var THEME_BLUE = 1;
if (bgColor && bgColor.length > 7) {
    bgColor = "#" + bgColor.substring(3);
} else {
    bgColor = "#FF5722";
}
bgColor = bgColor.toUpperCase();


myApp.run(function ($rootScope) {
    $rootScope.showPrompt = 0;  //1是内容不足10条 2是内容超过30
    $rootScope.themesKey = '';
    $rootScope.pageType = 0;
    $rootScope.allRecord = {};
    $rootScope.introduces = ['meIndex'];
    var url = "";
    $rootScope.termId = getQueryString('termId');
    if ($rootScope.termId) {
        url = "/2/s/archive/student/record/detail?termId=" + getQueryString('termId');
    }
    if (getQueryString('studentRecordId')) {
        url += '&studentRecordId=' + getQueryString('studentRecordId');
    }
    if (getQueryString('studentRecordId')) {
        url = "/2/s/archive/student/record/detail?studentRecordId=" + getQueryString('studentRecordId');
    }
    if (!url) {
        $("#loading-div").html("请求参数不正确");
    }
    $.ajax({
        url: '/2/s/archive/subject/list',
        type: 'GET',
        dataType: 'json',
        headers: {
            "Authorization": $.cookie("authInfo"),
            "X-Kmx-Version": $.cookie("headerVersion")
        },
        success: function (data) {
            var data = data.data;
            $rootScope.themes = data;
        },
        error: function (e, status) {
            if (e.status == 401) {
                HztUtil.callFun("tokenExpire", 1, {}, "fun" + Math.random());
            }
        }
    });


    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": $.cookie("authInfo"),
            "X-Kmx-Version": $.cookie("headerVersion")
        },
        success: function (data) {
            var data = data.data;
            $rootScope.globalData = data;
        },
        error: function (e, status) {
            if (e.status == 401) {
                HztUtil.callFun("tokenExpire", 1, {}, "fun" + Math.random());
            }
        }
    });

    $.ajax({
        url: '/2/s/archive/school/class/cover?studentRecordId=' + $rootScope.globalData.studentRecordId,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": $.cookie("authInfo"),
            "X-Kmx-Version": $.cookie("headerVersion")
        },
        success: function (data) {
            console.log(JSON.stringify(data.data))
            var data = data.data;
            if (data.schoolPhoto) {
                $rootScope.globalData.schoolPhoto = data.schoolPhoto;
            }
            if (data.schoolMessage) {
                $rootScope.globalData.schoolMessage = data.schoolMessage;
            }
            if (data.classPhoto) {
                $rootScope.globalData.photo = data.classPhoto;
            }
            if (data.teachers) {
                $rootScope.globalData.teachers = data.teachers;
            }
            if (data.classMessage) {
                $rootScope.globalData.message = data.classMessage;
            }
        },
        error: function (e, status) {
            if (e.status == 401) {
                HztUtil.callFun("tokenExpire", 1, {}, "fun" + Math.random());
            }
        }
    });


    var data = JSON.parse(JSON.stringify($rootScope.globalData));
    $rootScope.recordArr = [];
    //园长记录12
    $rootScope.modularDataStories = [];
    if (data.stories && data.stories.length > 0) {
        $rootScope.modularDataStories = transformationObj(data, 'stories');
    }
    if (data.inviteStories && data.inviteStories.length > 0) {
        $rootScope.modularDataStories = $rootScope.modularDataStories.concat(transformationObj(data, 'inviteStories'))
    }
    $rootScope.modularDataStories = $rootScope.modularDataStories.sort(function (a, b) {
        return b.createAt - a.createAt
    })

    //个人记录14
    $rootScope.modularDataJiaStories = [];
    if (data.jiaStories && data.jiaStories.length > 0) {
        $rootScope.modularDataJiaStories = transformationObj(data, 'jiaStories');
    }
    $rootScope.modularDataJiaStories = $rootScope.modularDataJiaStories.sort(function (a, b) {
        return b.createAt - a.createAt
    });

    $rootScope.allRecord = {
        me: $rootScope.modularDataJiaStories,
        yuan: $rootScope.modularDataStories
    }


    //判断处理
    $rootScope.innerPageCount = 1;
    $rootScope.introduces = ['meIndex'];
    var gardenCount = 0,
        meCount = $rootScope.modularDataJiaStories.length;
    if ($rootScope.globalData.schoolPhoto) {//园所首页
        gardenCount++;
        $rootScope.introduces.push('schoolIndex');
    }
    if ($rootScope.globalData.photo) {//全家福
        gardenCount++;
        $rootScope.introduces.push('classIndex');
    }
    if ($rootScope.globalData.labels && $rootScope.globalData.labels.length > 0) {//期末寄语默认
        gardenCount++;
        $rootScope.introduces.push('ydIndex');
    }

    var allGardenCount = gardenCount + $rootScope.modularDataStories.length;
    var allMeCount = meCount + 1;

    if (allGardenCount + allMeCount <= 30) {
        $rootScope.recordArr = $rootScope.recordArr.concat($rootScope.modularDataStories, $rootScope.modularDataJiaStories);
    } else {
        if (allGardenCount < 15 && allMeCount > 15) {
            $rootScope.recordArr = $rootScope.recordArr.concat($rootScope.modularDataStories, $rootScope.modularDataJiaStories.slice(0, 30 - allGardenCount - 1));
        }
        else if (allGardenCount > 15 && allMeCount < 15) {
            $rootScope.recordArr = $rootScope.recordArr.concat($scope.modularDataStories.slice(0, 30 - allMeCount), $rootScope.modularDataJiaStories);
        } else {
            $rootScope.recordArr = $rootScope.recordArr.concat($scope.modularDataStories.slice(0, 15 - gardenCount), $rootScope.modularDataJiaStories.slice(0, 14));
        }
    }
    console.log($rootScope.recordArr)

    $rootScope.resetPrompt = function (count) {
        if (count < 6) {
            $rootScope.showPrompt = 1;
        }
        if (count > 30) {
            $rootScope.showPrompt = 2;
        }
        setTimeout(function () {
            $rootScope.showPrompt = 0;
            $rootScope.$apply();
        }, 10000);
    }
    var allCount=$rootScope.allRecord.me.length+$rootScope.allRecord.yuan.length+$rootScope.introduces.length;
    $rootScope.resetPrompt(allCount);


})


//计算年龄
function getAgeMonth(str) {
    var da = str.split("-");
    var nowD = new Date();  //
    var rtn = {};
    rtn.year = nowD.getFullYear() - da[0];
    rtn.month = nowD.getMonth() + 1 - da[1];
    if (rtn.month < 0) {
        rtn.year--;
        rtn.month += 12;
    }
    return rtn;
}
myApp.directive('myInformation', ['$document', function ($document) {
    return {
        restrict: 'AE',
        templateUrl: 'components/my-information.html',
        link: function (scope, element, attr) {
        }
    };
}]);


myApp.filter('imgFile', function () {
    return function (arr) {
        var da = arr + '/m';
        return da;
    };
})

myApp.filter('formatStr', function () {
    return function (arr) {
        return moment(arr).format("YYYY-MM-DD");
    };
})


function isEmptyStr(v) {
    return v == undefined || v == null || $.trim(v) == "" || v == 0;
}

myApp.filter('getAge', function () {
    return function (arr) {
        var str = '';
        //var dqDate=moment().format("YYYY-MM-DD");
        var birthDay = moment(arr).format("YYYY-MM-DD");
        var d = getAgeMonth(birthDay)
        if (d.year != 0) {
            str += d.year + "岁";

        }
        if (d.month != 0) {
            str += d.month + "月";
        }
        return str;
    };
})

var clickType=true;
function transformationObj(data, arrName) {
    var arr = [];
    for (var k = 0; k < data[arrName].length; k++) {
        if (data[arrName][k].detail) {
            var ob = data[arrName][k];
            var detail = JSON.parse(data[arrName][k].detail);
            ob.detail = detail;
            arr.push(ob);
        }
    }
    return arr;
}
myApp.factory('factory_getValue', function () {
    var myData = {};

    function _getter() {
        console.log(myData);
        return JSON.parse(JSON.stringify(myData));
    }

    function _setter(a) {
        myData = a;

    }

    return {
        getter: _getter,
        setter: _setter
    };
})
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("dyym", {
            url: '/dyym',
            templateUrl: "dyym-v3.html",
            controller: 'dyymCtl'
        })
        .state("sort", {
            url: '/sort',
            templateUrl: "growth-archives-sort-v3.html",
            controller: 'sortCtl'
        })
        .state("footprint", {
            url: '/footprint',
            templateUrl: "footprint-v3.html",
            controller: 'footprintCtl'
        })
});
myApp.controller('dyymCtl', function ($stateParams, $scope, $http, $timeout, $rootScope, factory_getValue) {
    var $slider = $('#slider');
    var sliderType = 1;
    var maxCount;
    var dqIndex = 0;
    $scope.themeColor = bgColor;
    var myThemeSwiper = new Swiper('.theme-box', {
        freeMode: true,
        slidesPerView: 'auto',
    });
    $(".theme-but").unbind('click').bind('click', function () {
        var type = $(this).attr("data-type");
        $(".theme-box").width($(window).width())
        if (type == 0) {
            $(".theme-box").slideDown(200);
            myThemeSwiper.init();
            $(this).attr("data-type", 1).text('收起');

        } else {
            $(".theme-box").slideUp(200);
            $(this).attr("data-type", 0).text('展开');
        }
    })

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        spaceBetween: 20,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        onSlideChangeEnd: function (swiper) {
            sliderType = 2;
            var pageIndex = swiper.activeIndex + 1;

            $slider.slider("value", pageIndex);
            $(".slider-box .page").html(pageIndex + "/" + maxCount);
        },
        onTouchEnd: function (swiper) {
            if (dqIndex != swiper.activeIndex) {
                dqIndex = swiper.activeIndex;
                sliderType = 2;
                var pageIndex = swiper.activeIndex + 1;
                $slider.slider("value", pageIndex);
                // console.log(swiper.activeIndex)
                $(".slider-box .page").html(pageIndex + "/" + maxCount);
            }
        }
    });
    $scope.perInfImg = true;
    $scope.themeId = bgColor == "#FF5722" ? THEME_ORANGE : THEME_BLUE;
    $scope.loadData = function () {
        $rootScope.innerPageCount = 1;
        var data = JSON.parse(JSON.stringify($rootScope.globalData));
        //jiaStories是个人记录
        // stories,inviteStories  园长记录
        $scope.data = data;
        $scope.recordArr = [];

        if ($rootScope.pageType == 0) {
            $scope.recordArr = $rootScope.recordArr;
        }
        if ($rootScope.pageType == 1) {
            $scope.recordArr = factory_getValue.getter();

            //factory_getValue.setter($scope.recordArr);
        }

        //判断内页
        if (($scope.recordArr.length + $rootScope.introduces.length) % 2 == 0) {
            $rootScope.innerPageCount = 2;
        }

        $scope.viewAlbumGAItem = function (type, event, d, storeIndex) {
            var data = null;
            var _this = event.currentTarget;
            var position = $(_this).index();
            if (type == 1) {
                data = {
                    schoolPhoto: $rootScope.globalData.schoolPhoto,
                    schoolMessage: $rootScope.globalData.schoolMessage
                }
            }
            if (type == 2) {
                data = {
                    photo: $rootScope.globalData.photo,
                    className: $rootScope.globalData.className,
                    teachers: $rootScope.globalData.teachers,
                    message: $rootScope.globalData.message
                }
            }
            if (type == 3) {
                data = {
                    kidName: $rootScope.globalData.kidName,
                    kidIcon: $rootScope.globalData.kidIcon,
                    birthDay: $rootScope.globalData.birthDay,
                    fruit: $rootScope.globalData.fruit,
                    color: $rootScope.globalData.color,
                    toy: $rootScope.globalData.toy,
                    hobby: $rootScope.globalData.hobby,
                    cartoon: $rootScope.globalData.cartoon
                }
            }
            if (type == 4) {
                data = {
                    labels: $rootScope.globalData.labels,
                    remark: $rootScope.globalData.remark
                }
            }
            if (type == 5) {
                data = d;
                position = storeIndex;
            }
            console.log(data)
            console.log("type=" + type + " position=" + position);
            callNative('viewAlbumGAItem', 1, JSON.stringify({
                type: type,
                studentRecordId: $rootScope.globalData.studentRecordId,
                position: position,
                theme: $rootScope.themesKey,
                data: JSON.stringify(data)
            }));
        }

        $scope.goSort = function () {
            if(!clickType){
                return false;
            }
            clickType=false;
            window.location.href = '#/sort';
            callNative('doGAAction', 1, JSON.stringify({type: 'sort'}));
            factory_getValue.setter($scope.recordArr);
            window.location.href = '#/sort';
        }


        $scope.goSelectFootprint = function () {

            if(!clickType){
                return false;
            }
            clickType=false;
            window.location.href = '#/footprint';
            factory_getValue.setter($scope.recordArr);
            callNative('doGAAction', 1, JSON.stringify({type: 'selectFootprint'}));

        }
        $scope.addContent = function () {
            var count = $scope.recordArr.length + $rootScope.introduces.length;
            console.log(count)
            if (count >= 30) {
                callNative('showMessage', 1, '可打印页数已经满了！如果想要新增的话，请先在选择足迹中减少一页。');
            } else {
                callNative('viewAlbumGAItem', 1, JSON.stringify({
                    type: 6,
                    studentRecordId: $rootScope.globalData.studentRecordId,
                    position: -1,
                    theme: $rootScope.themesKey
                }));
            }
        }

        $scope.chanceThemes = function (data) {
            $rootScope.themesKey = data.key;
            console.log($rootScope.themesKey)
        }
        $scope.buy = function () {
            //提交数据回调
            callNative('doGAAction', 1, JSON.stringify({type: 'buy', data: ''}));

        }


        slider();
        //$scope.$apply();   //暂时隐藏下
        ///height  weight leftEye rightEye hematin
        if (isEmptyStr($scope.data.fruit) && isEmptyStr($scope.data.color) && isEmptyStr($scope.data.toy) && isEmptyStr($scope.data.cartoon) && isEmptyStr($scope.data.hobby)) {
            $scope.perInfImg = false;
        }

        $scope.resetItemStyle(false);

    }



    $scope.hideMessage = function () {
        $rootScope.showPrompt = 0;
    }

    $scope.addStory = function (story) {
        $scope.recordArr.push(story.data);
        $rootScope.allRecord.me.push(story.data);
        $scope.resetItemStyle(true);
        $scope.$apply();
    }

    $scope.resetItemStyle = function (isInit) {
        $timeout(function () {
            var w = $(window).width() - 70;

            var h = $(window).height() - 220;
            var ratio = 560 / 790;
            var setWidth = h * ratio;
            var setHeight = w / ratio;
            var targetHeight = setHeight;
            var targetWidth = w;
            if (setHeight > h) {
                targetHeight = h;
                targetWidth = targetHeight * ratio;
            }
            $(".swiper-container .swiper-slide").css({"width": targetWidth, "height": "auto"})
            $(".slider-box.new").css("width", targetWidth)
            $(".box-new").css({"height": targetHeight, "width": targetWidth})
            var innerRatio = targetWidth / 750;
            $(".page-dd").css({
                "transform": "scale(" + innerRatio + ")",
                "-ms-transform": "scale(" + innerRatio + ")",
                "-moz-transform": "scale(" + innerRatio + ")",
                "-webkit-transform": "scale(" + innerRatio + ")",
                "-o-transform": "scale(" + innerRatio + ")"
            });
            slider()
            swiper.init();
            $("#loading-div").css("display", "none");
            $("article").css("visibility", "visible");

            if (isInit) {
                swiper.slideTo($(".swiper-slide.recode").length - 1, 0, true); //初始化卡片定向
            }

            callNative('setNavigatorTitle', 1, '相册预览');

        }, 0)
    }

    $scope.loadData();

    function slider() {
        maxCount = $(".swiper-container .swiper-slide").length;
        if ($slider.length > 0) {
            $slider.slider({
                max: maxCount,
                min: 1,
                step: 1,
                value: 1,
                orientation: 'horizontal',
                range: 'min',
                slide: function () {
                    sliderType = 1;
                },
                change: function () {
                    if (sliderType == 1) {
                        var dqindex = $slider.slider("value");
                        $(".slider-box .page").html(dqindex + "/" + maxCount);
                        swiper.slideTo(dqindex - 1);
                    }

                }
            })
        }
        $(".ui-slider-handle,.ui-slider-range").css("background", bgColor)
    }

})
myApp.controller('sortCtl', function ($stateParams, $scope, $http, $timeout, $rootScope, factory_getValue) {

    sortable = Sortable.create(document.getElementById("sort-container"), {
        draggable: ".sortItem",
        ghostClass: 'ghost',
        sort: true,
        scroll: true,
        delay: 400,
        onEnd: function (evt) {
            $scope.printStoryId();
            if (evt.oldIndex < evt.newIndex) {
                for (var i = evt.oldIndex; i < evt.newIndex; i++) {
                    $scope.swipeItem(i, i + 1);
                }
            } else {
                for (var i = evt.oldIndex; i > evt.newIndex; i--) {
                    $scope.swipeItem(i, i - 1);
                }
            }
            isSorted = true;

            console.log("oldIndex=" + evt.oldIndex + " newIndex=" + evt.newIndex);
            $scope.printStoryId();
        },
        onChoose: function (evt) {
            console.log("onChoose", evt);
        }
    });

    $scope.printStoryId = function () {
        for (e in $scope.modularData) {
            console.log($scope.modularData[e].storyId);
        }
    }
    $scope.confirmSort = function () {
        factory_getValue.setter($scope.modularData);
        $rootScope.pageType = 1;
        window.location.href = '#/dyym?termId=' + $rootScope.termId;
    }


    $scope.swipeItem = function (from, to) {
        var tmp = $scope.modularData[from];
        $scope.modularData[from] = $scope.modularData[to];
        $scope.modularData[to] = tmp;
    }

    $scope.perInfImg = true;

    $scope.themeId = bgColor == "#FF5722" ? THEME_ORANGE : THEME_BLUE;

    $scope.loadData = function () {
        function isEmptyStr(v) {
            return v == undefined || v == null || $.trim(v) == "" || v == 0;
        }

        $scope.modularData = [];
        $scope.modularData = factory_getValue.getter();
        //$scope.modularData =JSON.parse(sessionStorage.getItem('recordArr'));
        console.log($scope.modularData);
        $timeout(function () {
            resetCard();
            callNative('setNavigatorTitle', 1, '排序');
        },0)
    }


    $scope.loadData();


})
myApp.controller('footprintCtl', function ($stateParams, $scope, $http, $timeout, $rootScope, factory_getValue) {
    console.log($rootScope.introduces)
    var storys = factory_getValue.getter();
    var introduces = [];
    $scope.themeId = bgColor == "#FF5722" ? THEME_ORANGE : THEME_BLUE;
    $scope.perInfImg = true;
    $scope.loadData = function () {
        var data = JSON.parse(JSON.stringify($rootScope.globalData));

        $scope.data = data;
        if (isEmptyStr($scope.data.fruit) && isEmptyStr($scope.data.color) && isEmptyStr($scope.data.toy) && isEmptyStr($scope.data.cartoon) && isEmptyStr($scope.data.hobby)) {
            $scope.perInfImg = false;
        }

        $scope.modularData = $rootScope.allRecord;

        console.log($scope.modularData);
        $timeout(function () {
            for (var i = 0; i < storys.length; i++) {
                $("div[data-storyid='" + storys[i].storyId + "']").addClass('active')
            }
            for (var i = 0; i < $rootScope.introduces.length; i++) {
                $("div[data-storyid='" + $rootScope.introduces[i] + "']").addClass('active')
            }

            $(".confirm-but-bottom span").text(storys.length + $rootScope.introduces.length + '/30')
            resetCard()

            callNative('setNavigatorTitle', 1, '选择足迹');
        })
    }

    $scope.loadData();


    console.log(storys)
    $scope.checkTeam = function (event) {


        var _this = event.currentTarget;
        var dataTid = $(_this).attr('data-tid');


        if ($(_this).hasClass("active")) {
            if (storys.length + $rootScope.introduces.length <= 6) {
                return false;
            }
            $(_this).removeClass("active")
        } else {
            if (storys.length + $rootScope.introduces.length >= 30) {
                return false;
            }
            $(_this).addClass("active")
        }
        if (dataTid == 'me') {
            $rootScope.introduces = [];
            $(".swiper-slide.me.active").each(function (index, el) {
                var d = $(this).attr("data-storyid");
                $rootScope.introduces.push(d);
            });

        } else {
            storys = [];
            $(".swiper-slide.record.active").each(function (index, el) {
                var d = $(this).attr("data-storyid");
                storys.push(getStore(d));
            });

        }


        $(".confirm-but-bottom span").text(storys.length + $rootScope.introduces.length + '/30')
        // console.log('introduces',$rootScope.introduces)
        // console.log('storys',storys)
    }
    $scope.confirmSelect = function () {
        factory_getValue.setter(storys);
        $rootScope.pageType = 1;
        window.location.href = '#/dyym?termId=' + $rootScope.termId;
    }


    function getStore(id) {
        for (var i = 0; i < $rootScope.allRecord.me.length; i++) {
            if (id == $rootScope.allRecord.me[i].storyId) {
                return $rootScope.allRecord.me[i]
            }
        }
        for (var i = 0; i < $rootScope.allRecord.yuan.length; i++) {
            if (id == $rootScope.allRecord.yuan[i].storyId) {
                return $rootScope.allRecord.yuan[i]
            }
        }
    }

})

function resetCard() {
    var w = $(window).width() - 80;
    var h = $(window).height();
    var ratio = 750 / 1061;
    var setWidth = h * ratio;
    var setHeight = w / ratio;

    var targetHeight = setHeight;
    var targetWidth = w;
    if (setHeight > h) {
        targetHeight = h;
        targetWidth = setWidth;
    }

    var innerRatio = targetWidth / 750 / 3;

    var padding = 20 * innerRatio;
    if (padding < 5) padding = 3;
    console.log("padding:", padding)

    $(".swiper-slide").css({"width": targetWidth / 3, "height": targetHeight / 3})
    $(".swiper-inner").css({
        "width": targetWidth / 3,
        "height": targetHeight / 3,
        "padding-top": padding,
        "padding-bottom": padding
    });

    $(".page-dd").css({
        "transform": "scale(" + innerRatio + ")",
        "-ms-transform": "scale(" + innerRatio + ")",
        "-moz-transform": "scale(" + innerRatio + ")",
        "-webkit-transform": "scale(" + innerRatio + ")",
        "-o-transform": "scale(" + innerRatio + ")"
    });

    innerRatio *= 2.5;
    var deleteBtnWidth = 48 * innerRatio;

    $(".delete-btn").css({
        "width": deleteBtnWidth,
        "height": deleteBtnWidth,
        "margin-right": -deleteBtnWidth / 2
    });
    clickType=true;
    $("#loading-div").css("display", "none");
    $("article").css("visibility", "visible");
}




function modifyGAItem(result) {
    if (result.type == 3) {
        //修改学生信息
        setBabyInfo(result.data);
    } else if (result.type == 5) {
        //修改故事
        setStory(result.data);
    } else if (result.type == 6) {
        //添加故事
        addStory(result.data);
    }
}
function addStory(story) {
    var appElement = document.querySelector('.dyymCtl');
    var $scope = angular.element(appElement).scope();
    var detail = JSON.parse(story.data.detail);
    story.data.detail = detail;
    $scope.addStory(story);
}

function setStory(story) {
    var appElement = document.querySelector('.dyymCtl');
    var $scope = angular.element(appElement).scope();
    $scope.recordArr[story.position] = story.data;
    var detail = JSON.parse(story.data.detail);
    story.data.detail = detail;
    $scope.$apply();
}


function setBabyInfo(babyInfo) {
    var appElement = document.querySelector('.dyymCtl');
    var $scope = angular.element(appElement).scope();
    console.log(babyInfo)
    $.each(babyInfo, function (key, val) {
        $scope.data[key] = val;
    })
    if (isEmptyStr($scope.data.fruit) || isEmptyStr($scope.data.color) || isEmptyStr($scope.data.toy) || isEmptyStr($scope.data.cartoon) || isEmptyStr($scope.data.hobby)) {
        $scope.perInfImg = true;
    }
    console.log($scope.data)
    $scope.$apply();
}









