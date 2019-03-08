tempApp.controller('featureDetailCtrl', function ($scope, $route, $http, $rootScope, $routeParams, $timeout) {
  $scope.dataTetx = "如果你无法简介的表达你的想法，那么只说明你还不够了解它。达你的想法，那么只说明你还不够了解它。，那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了";
  $scope.type=1;
  $scope.textMore=function () {
    var a=false;
    var h = $(".right p span").height();
    if (h > 40) {
      a=true;
    }
    return a;
  }
  $scope.getData=function (type) {
    $scope.type=type;
  }


})


