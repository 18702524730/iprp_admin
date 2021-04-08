angular.module('iprpAdminApp').controller('GAdminListCtrl', function ($scope,LimitsService,PaginationService,$location) {
    $('#admin_list').siblings().removeClass("selected");
    $('#admin_list').addClass("selected");
    /**
     * 权限列表
     * @type {Array}
     */
    var array = [];
    $scope.promptMSG = "";
    init_gadmin_list();
    function init_gadmin_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function (pg_index, pg_count, cb) {
            LimitsService.groups.all_group({
                "pg_index": pg_index,
                "pg_count": pg_count
            }, cb);
        };
        $scope.pagination = new PaginationService(OweNer, 15);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.allId = [];
            $scope.gAdminList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.gAdminList = newItems;
            newItems.forEach(function (obj) {
                array.push(obj.fg_id);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }


    /**
     * 单个删除
     */
    var delete_gadmin = [ ];
    $scope.delete_gadmin = function(fg_id){
        delete_gadmin.push(fg_id);
        if(confirm("您确定删除吗?")){
            LimitsService.groups.delete({fg_id:fg_id,fg_ids:delete_gadmin},function(data){
                var delete_gadmin = [ ];
                init_gadmin_list();
            },function(error){
                alert(error.data.msg);
            })
        }
    }

    /**
     * 批量删除
     */
    $scope.deleteAll = function(){
        if($scope.allId.length === 0){
            alert("请选择管理员！");
            return;
        }
        if(confirm('您确定要删除吗?')) {
            LimitsService.groups.deleteBatch({fg_ids: $scope.allId}, function (data) {
                init_gadmin_list();
                $scope.allId = [];
                $scope.checkall = false;
                alert("删除成功")
            }, function (result) {
                alert(result.data.msg);
            });
        }
    }
     //单选
     $scope.checkall = false;
     $scope.sChoose = function(id){
        if($scope.allId.indexOf(id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(id),1);
        }else{
            $scope.allId.push(id);
        }
        if($scope.allId.length === array.length){
            $scope.checkall = true;
        }else{
            $scope.checkall = false;
        }
     };
     //全选
     $scope.allChoose = function(){
        $scope.checkall = !$scope.checkall;
        if($scope.checkall){
            $scope.allId = angular.copy(array);
        }else{
            $scope.allId = [];
        }
     };
     /**
      * 修改权限组
      */
      $scope.edit_gadmin = function(index){
          $location.path('/main/setting_home/edit_gadmin/' + index);
      };

    //提示操作
    $scope.hint = false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
