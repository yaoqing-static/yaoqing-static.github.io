myApp.controller('feedback', ["$scope", "$http", "$timeout",function ($scope, $http, $timeout) {

    $scope.role=getQueryString('role');

    $scope.CONFIG={
        whoType: {
            kid: 0,//孩子
            dad: 1,//爸爸
            mom: 2,//妈妈
            nurseTeacher: 9,//保健老师
            teacher: 10,//老师
            master: 11,//园长
            admin: 12//管理员
        },
        gender: {
            secret: 0,
            female: 1,
            male: 2
        },
    }
    var openPhotoSwipe = function(items) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        // build items array
        // define options (if needed)
        //按钮样式设置
        var options = {
            // history & focus options are disabled on CodePen
            index:1,//控制打开的一张图片
            history: false,
            focus: false,
            closeEl:true,
            barsSize:{top:0,bottom:0},
            captionEl:false,
            fullscreenEl:false,
            shareEl:false,
            bgOpacity:0.85,
            tapToClose:true,
            tapToToggleControls:false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
            indexIndicatorSep: ' / ',

        };
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    function getWidthHeight(url,callback) {
        var image = new Image();
        image.src = url;
        image.onload = function(){
            var obj={}
            obj.w=image.width
            obj.h=image.height;
            callback(obj)
        }
    }

    $scope.preview=function (data) {
        if(data.type=='i'){
            var image = new Image();
            image.src = data.url;
            image.onload=function () {
                var items = [
                    {
                        src: data.url,
                        w: image.width,
                        h: image.height
                    }
                ];
                openPhotoSwipe(items)
            }
        }else {
            var video=$('<video src="" controls="controls">您的浏览器不支持 video 标签。</video>')
            //video.attr('src',data.url)
            // video.get(0).play()
            $(".videoBG").show()
            $("#video").attr('src',data.url)
            
        }
        
    }
    
    $(".videoBG").click(function () {
           $(".videoBG").hide();
           $("#video").get(0).pause();
    })
    $(".videoBG video").click(function (evt) {
        evt.stopPropagation();
    })


    $scope.open=function (event) {
        var target=event.target;
        var addH=parseInt($(".feed2 .a4 .con .list").height())+20;
        if($(target).parents('.a4').hasClass("open")){
            $(target).parents('.a4').removeClass("open")
            $(".feed2 .a4 .zk span").html('查看各领域柱状图');
            var n=parseInt(document.body.offsetHeight)-addH;

            callNative("pageInfo", 1, '{"height": '+n +'}',"fun" + Math.random());
        }else {
            $(target).parents('.a4').addClass("open")
            $(".feed2 .a4 .zk span").html('隐藏各领域柱状图')
            console.log(document.body.offsetHeight+addH )
            var n=parseInt(document.body.offsetHeight)+addH;
            callNative("pageInfo", 1, '{"height": '+n +'}',"fun" + Math.random());
        }
    }



    //全局配置
    $scope.qualityId='all';
    $scope.statisticById={};
    var barData=[];


    var option = {
        tooltip : {
            trigger: 'item',
            triggerOn:'click',  //触发条件，mousemove，click，mousemove|click，none
            show:false
        },
        color: ["#ffb500","#7bc91d","#88cfff","#b4b4b4"],
        series : [
            {
                type: 'pie',
                radius : ['40%', '70%'], //大小
                center: ['70%', '50%'],
                hoverAnimation:false,
                selectedMode:false,
                data:barData,
                label: {
                    normal: {
                        show:false
                    }
                },
                itemStyle: {
                    normal: {
                    },
                    emphasis: {
                    }
                }
            }
        ]
    };

    //获取质量领域列表
    $.ajax({
        url: '/2/s/evaluate/quality/list',
        type: 'GET',
        dataType: 'json',
        async:false,
        headers: {
            "Authorization": window.authInfo
        },
        success: function(data) {
            $scope.qualities=data.data;
            var endArr=$scope.qualities.splice($scope.qualities.length-1,1);
            $scope.qualities.unshift(endArr[0])
            $timeout(function () {
                var mySwiper1 = new Swiper('#header',{
                    freeMode : true,
                    slidesPerView : 'auto',
                });
            })

        },
        error: function(e,status) {
            if(e.status==401){
                console.log("no auth");
                callNative("tokenExpire", 1, {},"fun" + Math.random());
                //callNative("tokenExpire", 1, {},"fun" + Math.random(), true);
            }

        }
    });
    $scope.chartData=[];
    $scope.getDetail=function () {
        $.ajax({
            url: '/2/s/evaluate/record/detail?recordId='+getQueryString('recordId'),
            type: 'GET',
            dataType: 'json',
            async:false,
            headers: {
                "Authorization": window.authInfo
            },
            success: function(data) {
                if(data.code==0){
                    $scope.allData=data.data;
                    console.log($scope.allData)
                    //$scope.allData.files.push({type:'v',url:'http://192.168.0.195:3500/2/ali/v/de41b8ca51254f62beae6fd45fb3c933'})
                    $scope.standardRemark=$scope.allData.standardRemark
                    $scope.chartData=$scope.allData.statistic;
                    if(($scope.role==1||$scope.role==2)&&($scope.allData.creatorWho!=1&&$scope.allData.creatorWho!=2)){
                        $scope.type=2;
                    }


                    if($scope.type==2){//家长查看老师的记录
                        $.ajax({//获取颜色配置
                            url: '/2/s/evaluate/config/default',
                            type: 'GET',
                            dataType: 'json',
                            headers: {
                                "Authorization": window.authInfo
                            },
                            success: function(data) {
                                $scope.qualitiesColor=data.data;
                            },
                            error: function(e,status) {
                                if(e.status==401){
                                    console.log("no auth");
                                    callNative("tokenExpire", 1, {},"fun" + Math.random());
                                    //callNative("tokenExpire", 1, {},"fun" + Math.random(), true);
                                }

                            }
                        });

                    }else {
                        if(!$scope.allData.isMultiple){
                            $(".swiper-wrapper").hide()
                            $("article").addClass("close")
                            $scope.statisticById=$scope.allData.statistic[0];
                            $scope.qualityId=$scope.statisticById.qualityId;
                            $scope.standardRemark=$scope.statisticById.standardRemark;//上面备注文字

                            $scope.levelTypesCount=0;
                            for (var j=0;j<$scope.statisticById.levelTypes.length;j++){
                                barData.push($scope.statisticById.levelTypes[j].count)
                                $scope.levelTypesCount+=$scope.statisticById.levelTypes[j].count
                            }
                            option.series[0].data=barData

                            $timeout(function () {
                                var myChart = echarts.init(document.getElementById('main'));
                                // 使用刚指定的配置项和数据显示图表。
                                myChart.setOption(option);
                                $(window).resize(function () {
                                    myChart.resize()
                                })
                            })
                        }
                    }




                }else {
                    $scope.allData=[];
                    //alert(data.msg)
                }

            },
            error: function(e,status) {
                if(e.status==401){
                    console.log("no auth");
                    callNative("tokenExpire", 1, {},"fun" + Math.random());
                }

            }
        });
    }
    $scope.getDetail();


    $scope.qualitiesChange=function (data,event) {

        $(".circel-share").css({"width":$(window).width(),"height":$("circel-share").height()})
        barData=[]
        var target=event.target;
        $(target).parents('.top-but').find(".swiper-slide").removeClass("dq")
        $(target).addClass("dq");
        $scope.qualityId=data.qualityId;

        if(data.qualityId=='all'){
            $(".feed2 .a5").hide()
            $("article").removeClass("close")
            $(".feed2 .a1 span").show()
            $scope.standardRemark=$scope.allData.standardRemark

        }else {
            $(".feed2 .a5").show()
            $(".feed2 .a1 span").hide()
            $("article").addClass("close")
            for(var i=0;i<$scope.allData.statistic.length;i++){
                if(data.qualityId==$scope.allData.statistic[i].qualityId){
                    $scope.statisticById=$scope.allData.statistic[i];
                    break
                }
            }
            $scope.standardRemark=$scope.statisticById.standardRemark;//上面备注文字

            $scope.levelTypesCount=0;
            for (var j=0;j<$scope.statisticById.levelTypes.length;j++){
                barData.push($scope.statisticById.levelTypes[j].count)
                $scope.levelTypesCount+=$scope.statisticById.levelTypes[j].count
            }
            option.series[0].data=barData
            var myChart = echarts.init(document.getElementById('main'));
            // 使用刚指定的配置项和数据显示图表。
            $timeout(function () {
                myChart.setOption(option);
                $(window).resize(function () {
                    myChart.resize()
                })
            })




        }
        $timeout(function () {
            console.log($('body').height())
            callNative("pageInfo", 1,'{"height": '+$('body').height()+'}',"fun" + Math.random());
        })



        // location.hash = '#' + data.qualityId;
    }




    $scope.see=function () {
        callNative("seeEvalRecordAnswer", 1, '',"fun" + Math.random());
    }



    //页面渲染完成
    $scope.$watch('$viewContentLoaded', function() {
        $("article").show()
        $(".loading").hide()
    });



}])