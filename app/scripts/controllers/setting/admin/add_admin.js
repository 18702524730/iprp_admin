angular.module('iprpAdminApp').controller('AddAdminCtrl',function ($scope,AdminService,DateGroupService,$location,LimitsService) {
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
   //定义一空对象
    $scope.add_admin = { };
    /**
     * all权限组
     */
    LimitsService.groups.common_group({"pg_index":0,"pg_count":999},function(date){
        $scope.limit_group = date;
    },function(error){
        alert(error.data.msg);
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
     * 添加管理员
     */
    $scope.addAdmin=function(){
        if(!$scope.add_admin.name || !$scope.add_admin.password
            || !$scope.add_admin.fg_id || !$scope.add_admin.dg_id || !$scope.add_admin.description){
            //监听gid
            $scope.$watch("add_admin.fg_id",function(value){
                if(!!value){
                    $scope.gAdminShow = false;
                }else{
                    $scope.gAdminShow = true;
                }
            },true);
            //监听gid
            $scope.$watch("add_admin.dg_id",function(value){
                if(!!value){
                    $scope.dAdminShow = false;
                }else{
                    $scope.dAdminShow = true;
                }
            },true);
            $scope.AddAdminForm.submitted = true;
        }else{
            if($scope.add_admin.password != $scope.r_password){
                //监听rpassword
                $scope.$watch("r_password",function(newValue){
                    if(newValue != null && newValue != undefined){
                        if(newValue === $scope.add_admin.password){
                            $scope.repeatPassword=false;
                        }else{
                            $scope.repeatPassword=true;
                        }
                    }else{
                        $scope.repeatPassword=true;
                    }
                });
                $scope.repeatPassword = true;
            }else{
            		$scope.add_admin.password = $.md5($scope.add_admin.password);
                AdminService.add_admin({},$scope.add_admin,function(data){
                    $location.path('/main/setting_home/admin_list')
                },function(error){
                    alert(error.data.msg);
                });
            }
        }
    };
});
