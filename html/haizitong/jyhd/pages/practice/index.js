tempApp.controller('practiceIndexCtrl', function ($scope, $route, $http, $rootScope, $routeParams, $timeout) {
  $scope.type=1;

  $scope.getData=function (type) {
    $scope.type=type;
  }


})


