
tempApp.controller('topicCommentListCtrl', function ($scope,$route,$http,$rootScope,$routeParams)
{

    $scope.id = $routeParams.id;
	  console.log($scope.id)



	  //发表评论
    $scope.goComment=function () {
      $rootScope.status.comment={page:window.location.hash}
      window.location.href='#/comment/add/'+$scope.id ;
    }

})


