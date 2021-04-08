angular.module('iprpAdminApp').controller('EmailTplCtrl',function($scope,MailTemplateService,PaginationService,$location){

    $('#email_tpl').siblings().removeClass("selected");
    $('#email_tpl').addClass("selected");
    /**
     * 邮件模板列表
     * @type {Array}
     */
    var array = [];
    init_mailTpl_list();
    function init_mailTpl_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function (pg_index, pg_count, cb) {
            MailTemplateService.mailTpl_list({
                "pg_index": pg_index,
                "pg_count": pg_count
            }, cb);
        };
        $scope.pagination = new PaginationService(OweNer, 15);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.allId = [];
            $scope.MailTemplateList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.MailTemplateList = newItems;
            newItems.forEach(function (obj) {
                array.push(obj.code);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    /**
     * 编辑
     * @param code
     */
    $scope.edit_email_tpl = function(code){
        $location.path('/main/setting_home/email_tpl_edit/' + code);
    }

    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});