angular.module('iprpAdminApp').controller('ApplyUserListCtrl', function ($scope,$location,MemberApplicationService,PaginationService) {

        $('#apply_user_list').siblings().removeClass("selected");
        $('#apply_user_list').addClass("selected");
          /**
           * 用户申请列表
           * @type {Array}
           */
         $scope.obj = { };
         init_member_list();
         function init_member_list(){
             $scope.to_loading = true;//默认 开始 加载
             $scope.loading_text = "加载中...";//加载页面内容
             var OweNer = function(pg_index,pg_count,cb){
                 MemberApplicationService.member_all({
                     "pg_index":pg_index,
                     "pg_count":pg_count,
                     "company_name":$scope.obj.company_name == ""|| $scope.obj.company_name == undefined ? null : encodeURI($scope.obj.company_name),
                     "status":$scope.obj.status == ""|| $scope.obj.status == undefined ? null : $scope.obj.status
                 },cb);
             };
             $scope.pagination = new PaginationService(OweNer,15);

             $scope.$watch('pagination.curPageItems',function(newItems){
                 $scope.member_list = [];
                 if (newItems == undefined)
                     return;
                 if ($scope.pagination.curPageItems.length === 0){
                     $scope.loading_text = "没有符合条件的记录";//加载页面内容
                     return;
                 }
                 $scope.member_list = newItems;
                 $scope.to_loading = false;//如果不为空 结束加载页面
             });
         };
        /**
         * 审核
         * @param index
         */
         $scope.check = function(index){
            $location.path('/main/user_home/apply_user_detail/'+ index);
         };
        /**
         * 获取详情
         * @param index
         */
         $scope.detail = function(index){
             $location.path('/main/user_home/apply_user_detail/'+ index);
         };
        /**
         * 按条件查询
         */
        $scope.search = function(){
            init_member_list();
        }

        //提示操作
        $scope.hint=true;
        $scope.hints = function(){
            $scope.hint = !$scope.hint;
        }
});
