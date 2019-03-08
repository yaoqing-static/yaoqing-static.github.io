
tempApp.controller('topicDetailCtrl', function ($scope,$route,$http,$rootScope,$routeParams)
{
    $scope.$route = $route;
    $scope.pageController = '我是controller1';
    console.log($route)
    $scope.id = $routeParams.id;
	  console.log($scope.id)
    $scope.dataTetx="如果你无法简介的表达你的想法，那么只说明你还不够了解它。达你的想法，那么只说明你还不够了解它。达你的想法，那么只说明你还不够了解它不够了…";

    $scope.page='page1';

    $http.get("/2/archive/student/record/show?studentRecordId=5aba0c15bc576257b7e28c1f").success(function (data) {
      console.log(data)
    }).error(function (e) {
      console.log(e)
    })




  //发表评论
	  $scope.addComment=function (type) {
      $rootScope.status.comment={page:window.location.hash}
	    if(type){
        $rootScope.status.comment.name='张三';
        window.location.href='#/comment/reply/2';
      }else {

        window.location.href='#/comment/add/2';
      }

    }
    $scope.switchPage=function (type,event) {
      var target=event.target;
      $scope.page=type;
      $(".comment .but dd a").removeClass('active');
      $(target).addClass('active');
    }

    $scope.praise=function () {
      alert('点赞成功！')
    }

})


