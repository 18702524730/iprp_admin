angular.module('iprpAdminApp').directive('mtPagination', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            pagination:'=paginationObj',
            formPageOne:'=formPageOne'
        },
        templateUrl: 'package/directive/mt-pagination/mt-pagination.html',
        link: function($scope, element, attrs, fn) {
        		var isFormPageOne = !!$scope.formPageOne;
            $scope.isLast = true;
            $scope.curPage = isFormPageOne ? 1 : 0;

            $scope.first=function(){
                if($scope.curPage === 1) {
                    return;
                }
                $scope.pagination.firstPage();
            };
            $scope.last=function(){
                if($scope.isLast){
                    return;
                }
                $scope.pagination.lastPage();
            };
            $scope.prev = function(){
                if($scope.curPage === (isFormPageOne ? 1 : 0)) {
                    return;
                }
                $scope.pagination.prePage();
            };
            $scope.next=function(){
                if($scope.isLast){
                    return;
                }
                $scope.pagination.nextPage();
            };

            if(!$scope.pagination){
                return;
            }

            $scope.$watch(function(){ return {newCurPage:$scope.pagination.curPage, newTotalCount:$scope.pagination.totalCount}},function(newVal){
                $scope.curPage = newVal.newCurPage;
                $scope.isLast = ((isFormPageOne ? $scope.pagination.curPage : $scope.pagination.curPage+1) === Math.ceil(($scope.pagination.totalCount)/$scope.pagination.countPerPage));
                var index = isFormPageOne ? $scope.pagination.curPage-1 : $scope.pagination.curPage;
                var maxCount = $scope.pagination.totalCount;
                var count = $scope.pagination.countPerPage;
                $scope.pageCount = Math.ceil(maxCount/count);
                var pages = [];
                pages.push({
                    text: index + 1,
                    index: index+1
                });
                for(var counter = 1; counter != 3; ++counter)
                {
                    if(maxCount/count <= index + 1)
                    {
                        break;
                    }
                    pages.push({
                        text: index + counter + 1,
                        index: index + counter +1
                    });
                    if(maxCount/count <= index + 2)
                    {
                        break;
                    }
                }

                for(var counter = 1; counter != 3; ++counter)
                {
                    if (index - counter < 0)
                        break;

                    pages.unshift({
                        text: index - counter + 1,
                        index: index - counter +1
                    });
                }

                $scope.pages=pages;
            }, true);


            var gotoPageTimer = null;
            $scope.$watch('curPage',function(newCurPage){
            	  var curPage = $scope.pagination.curPage;
                if(gotoPageTimer){
                    $timeout.cancel(gotoPageTimer);
                }
                if(!newCurPage){
                    return;
                }
                if(newCurPage === curPage || newCurPage < 1 ||
                    newCurPage > parseInt(($scope.pagination.totalCount-1)/$scope.pagination.countPerPage +1) || !/^[0-9]*$/.test(newCurPage)){
                    $scope.curPage = curPage;
                    return;
                }else {
                    gotoPageTimer = $timeout(function(){
                        $scope.gotoPage(newCurPage - 1);
                        return null;
                    },2000);
                }
            });

            $scope.gotoPage = function(page){
                $scope.pagination.gotoPage(page);
            };

        }
    };
});
