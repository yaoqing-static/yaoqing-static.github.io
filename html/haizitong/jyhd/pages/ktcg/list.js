tempApp.filter('interceptText', function () {
    return function (str,sub_length) {
        if (str == "" || str == null)
            return "";
        var temp1 = str.replace(/[^\x00-\xff]/g, "**"); //精髓
        var temp2 = temp1.substring(0, sub_length);
        //找出有多少个*
        var x_length = temp2.split("\*").length - 1;
        var hanzi_num = x_length / 2;
        sub_length = sub_length - hanzi_num; //实际需要sub的长度是总长度-汉字长度
        var res = str.substring(0, sub_length);
        if (sub_length < str.length) {
            var end = res + "…";
        } else {
            var end = res;
        }
        return end;
    };
})
tempApp.controller('topicListCtrl', function ($scope,$route,$http,$rootScope,$routeParams)
{

    $scope.$route = $route;
    $scope.pageController = '我是controller1';
    $scope.type=1;
    console.log($route)
    $scope.id = $routeParams.id;
	console.log($scope.id)
    $scope.dataTetx="如果你无法简介的表达你的想法，那么只说明你还不够了解它。达你的想法，那么只说明你还不够了解它。达你的想法，那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了那么只说明你还不够了解它不够了";
    $scope.dataList=[1,2,3,4,5];

    $scope.goNext=function (id) {
        window.location.href="#/topicDetail/"+id;
    }
    $scope.getData=function (type) {
      $scope.type=type;
    }

})


