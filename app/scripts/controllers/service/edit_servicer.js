angular.module('iprpAdminApp').controller('EditServicerCtrl',function($scope,$stateParams,BillTemplateService,SettingService,ServicerService,$location){
    $('#servicer_list').siblings().removeClass("selected");
    $('#servicer_list').addClass("selected");
    $scope.edit_service_obj = {};
    $scope.turnOn = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.service_detail.state = 1;
    };
    $scope.turnOff = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.service_detail.state = 0;
    };
    /**
     * 获取服务商详情
     */
    ServicerService.serviceDetail({sp_id:$stateParams.sp_id},function(data){
        $scope.service_detail  = data;
    },function(error){
        alert(error.data.msg)
    });
    /**
     * 根据name查询
     */
    SettingService.setting.detail({
        "name":"bank"
    },function(data){
        $scope.bankDetail = data;
        $scope.bankArry = eval($scope.bankDetail.value);
    });
    /**
     * 结算模板
     */
    BillTemplateService.bill_tpl.no_privilege_get({
        "pg_index":0,
        "pg_count":999
    },function(data){
        $scope.bill_template_list = data;
    });
    /**
     * 添加
     */
    $scope.addAbility = function(){
        //初始化一个空对象
        $scope.initAbility = {
            spAbility:""
        };
        $scope.service_detail.subDTOs.push($scope.initAbility);
    };

    ServicerService.listEntrustedUnit(function(data){
        $scope.entrustList = data.elements;
    },function(err){
        console.log(err)
    });
    /**
     * 删除
     * @param index
     */
    $scope.deleteAbility = function(index){
        $scope.service_detail.subDTOs.splice(index,1);
    };
    /**
     * 编辑服务商
     */
    var flag = false;
    $scope.update_service = function(){
        $scope.$watch("service_detail.areaId",function(data){
            if(!!!data){
                $scope.is_area_show = true;
            }else{
                $scope.is_area_show = false;
            }
        });
        setTimeout(function(){
            if ($scope.EditServiceForm.$valid && $scope.is_area_show === false) {
                if ($scope.is_area_show) {return;}
                if($scope.service_detail.areaName != undefined){
                    $scope.service_detail.areaInfo = $scope.service_detail.provinceName + " " + $scope.service_detail.cityName + " " + $scope.service_detail.areaName;
                }
                $scope.service_detail.bank = $scope.service_detail.bank;
                ServicerService.serviceEdit({sp_id:$stateParams.sp_id},$scope.service_detail,function(data){
                    $location.path('/main/merchant_home/servicer_list')
                },function(error){
                    alert(error.data.msg)
                })
            } else {
              $scope.EditServiceForm.submitted = true;
            }
        },100);
    }
});
