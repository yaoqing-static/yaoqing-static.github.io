//设置全局

tempApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.naver = {name:'我是全局'};


  //以下是存储状态
  $rootScope.status={
    comment:''
  };
  if(sessionStorage.getItem('status')){
    $rootScope.status=JSON.parse(sessionStorage.getItem('status'));
  }
  $rootScope.$watch('status',function(newData,oldData){
    sessionStorage.setItem("status",JSON.stringify($rootScope.status))
  },true)



  /* 监听路由的状态变化 */
  $rootScope.$on('$routeChangeStart', function(evt, next, current){
    console.log('route begin change');
  });
  $rootScope.$on('$routeChangeSuccess', function(evt, current, previous) {
    console.log('route have already changed ：'+$location.path());
  });
}])





function isEmptyStr(v) {
    return v == undefined || v == null || $.trim(v) == "" || v == 0;
}
tempApp.config(function ($routeProvider) {
    $routeProvider.
    when('/topicList', {
        templateUrl: 'pages/ktcg/list.html',
        controller:"topicListCtrl",
        controllerAs:"topicList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("pages/ktcg/list.js");}]
        }
    }).
    when('/topicDetail/:id', {
        templateUrl: "pages/ktcg/detail.html",
        controller:"topicDetailCtrl",
        controllerAs:"topicDetailCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("pages/ktcg/detail.js");}]
        }
    }).
    when('/comment/:type/:id', {
      templateUrl: "components/comment.html",
      controller:"commentCtrl",
      controllerAs:"comment",
      resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("components/comment.js");}]
      }
    }).
    when('/topicCommentList/:id', {
      templateUrl: "pages/ktcg/comment-list.html",
      controller:"topicCommentListCtrl",
      controllerAs:"topicCommentListCtrl",
      resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("pages/ktcg/comment-list.js");}]
      }
    }).
    when('/featureIndex', {//特色研究
      templateUrl: "pages/feature/index.html",
      controller:"featureIndexCtrl",
      controllerAs:"featureIndexCtrl",
      resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("pages/feature/index.js");}]
      }
    }).
    when('/featureDetail', {
      templateUrl: "pages/feature/detail.html",
      controller:"featureDetailCtrl",
      controllerAs:"featureDetailCtrl",
      resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("pages/feature/detail.js");}]
      }
    }).
    when('/practiceIndex', {//实践研究
      templateUrl: "pages/practice/index.html",
      controller:"practiceIndexCtrl",
      controllerAs:"practiceIndexCtrl",
      resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("pages/practice/index.js");}]
      }
    }).
    when('/practiceDetail', {//实践研究
      templateUrl: "pages/practice/detail.html",
      controller:"practiceDetailCtrl",
      controllerAs:"practiceDetailCtrl",
      resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){ return $ocLazyLoad.load("pages/practice/detail.js");}]
      }
    })
});



