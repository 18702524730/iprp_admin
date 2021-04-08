angular.module('iprpAdminApp').controller('BillTplListCtrl', function ($scope,$modal,BillTemplateService,PaginationService,$location) {
    $('#bill_manage').siblings().removeClass("selected");
    $('#bill_manage').addClass("selected");

    init_bill_template_list();
    function init_bill_template_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BillTemplateService.bill_tpl.get({
                "pg_index":pg_index,
                "pg_count":pg_count
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.bill_template_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.bill_template_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    /**
     * 编辑模板
     * @param index
     */
    $scope.edit_bill_tpl = function(index){
        $location.path('main/merchant_home/edit_bill_tpl_deploy/'+index);
    }

    /**
     * 删除模板
     * @param template_id
     */
    $scope.delete_bill_tpl = function(template_id){
        if(confirm("您确定删除吗?")){
            BillTemplateService.bill_tpl.delete_template({bill_template_id:template_id},{},function(data){
                init_bill_template_list();
            },function(error){
                alert(error.data.msg);
            })
        }
    }

    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
