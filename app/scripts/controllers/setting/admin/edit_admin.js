angular.module('iprpAdminApp').controller('EditAdminCtrl', function ($scope,AdminService,$stateParams,LimitsService,DateGroupService,$location) {
    $('#admin_list').siblings().removeClass("selected");
    $('#admin_list').addClass("selected");
    //去掉同级selected
    $('#news_list').removeClass("selected");
    $('#order_set').removeClass("selected");
    $('#payment_list').removeClass("selected");
    $('#express_list').removeClass("selected");
    $('#email_tpl').removeClass("selected");
    $('#log_list').removeClass("selected");

    $scope.Pattern = /^(?![a-zA-Z]+$)(?![!\"#\$%&\'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`\{\|\}~]+$)(?!\d+$)\S{10,32}$/;

    /**
     * 获取详情
     */
    AdminService.getDetail({admin_id:$stateParams.admin_id},function(date){
        $scope.admin_detail = date;
    },function(error){
        alert(error.date.msg);
    });
    /**
     * all权限组
     */
    LimitsService.groups.common_group({"pg_index":0,"pg_count":999},function(date){
        $scope.limit_group = date;
    },function(error){
        alert(error.date.msg);
    });
    /**
     * 查询all业务组
     */
    DateGroupService.common_data_group_list({"pg_index":0,"pg_count":999},function(data){
        $scope.data_group_list = data
    },function(error){
        alert(error.date.msg);
    });

    /**
     * 修改管理员
     */
    $scope.editAdmin = function(){
        if(!$scope.admin_detail.fg_id || !$scope.admin_detail.dg_id){
            $scope.$watch("admin_detail.fg_id",function(value){
                if(!!value){
                    $scope.gAdminShow=false;
                }else{
                    $scope.gAdminShow=true;
                }
            },true);
            $scope.$watch("admin_detail.dg_id",function(value){
                if(!!value){
                    $scope.dAdminShow=false;
                }else{
                    $scope.dAdminShow=true;
                }
            },true);
        }else{
            if(!$scope.admin_detail.description){
                $scope.admin_form.submitted = true;
            }else{
            		if ($scope.admin_detail.password) {
            			$scope.admin_detail.password = $.md5($scope.admin_detail.password);
            		}
                AdminService.update({admin_id:$stateParams.admin_id},$scope.admin_detail,function(date){
                    $location.path('/main/setting_home/admin_list')
                },function(error){
                    alert(error.date.msg)
                })
            }
        }
    };
    //监听r_password 是否相同
    $scope.$watch("r_password",function(date){
        if(!!date) {
            if (!!date && !(date != $scope.admin_detail.password)) {
                $scope.repeatPassword = false;
            } else {
                $scope.repeatPassword = true;
            }
        }
    },true);
});
