
tempApp.controller('commentCtrl', function ($scope,$route,$http,$rootScope,$routeParams)
{

  $scope.type = $routeParams.type;
  $scope.id = $routeParams.id;
  console.log($scope.type,$scope.id)
  console.log($rootScope.status.comment)

  $scope.confirmComment=function () {
    window.location.href=$rootScope.status.comment.page;
  }
})


