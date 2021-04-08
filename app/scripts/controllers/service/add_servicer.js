angular.module('iprpAdminApp').controller('AddServicerCtrl',function($scope,$state,ServicerService,BillTemplateService,BusinessClassService,BusinessService,PaginationService,SettingService,$location){
    $('#servicer_list').siblings().removeClass("selected");
    $('#servicer_list').addClass("selected");
    $scope.add_service_obj = { };
    $scope.ability_obj = { };
    $scope.next_open_service = false;
    /**
     * 获取所有银行
     */
//    SettingBankService.bank.list(function(data){
//        $scope.bankList = data;
//    });
    BillTemplateService.bill_tpl.no_privilege_get({
        "pg_index":0,
        "pg_count":999
    },function(data){
        $scope.bill_template_list = data;
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
    //创建对象[]
    $scope.localServiceAbility = [];
    /**
     * 添加运费模板
     */
    $scope.addAbility = function(){
        //初始化一个空对象
        $scope.initAbility = {
            virtual_num:""
        };
        $scope.localServiceAbility.push($scope.initAbility);
    };

    $scope.deleteAbility = function(index){
        $scope.localServiceAbility.splice(index,1);
    };


    ServicerService.listEntrustedUnit(function(data){
        $scope.entrustList = data.elements;
    },function(err){
        console.log(err)
    })
    /**
     * 添加服务商
     */

    $scope.add_service = function(){
        $scope.$watch("add_service_obj.areaId",function(data){
            if(!!!data){
                $scope.is_area_show = true;
            }else{
                $scope.is_area_show = false;
            }
        })
        if ($scope.AddServiceForm.$valid && $scope.is_area_show === false) {
            //$scope.add_service_obj.abilityDTO = $scope.ability_obj;
            $scope.add_service_obj.subDTOs = $scope.localServiceAbility;
            $scope.add_service_obj.areaInfo = $scope.add_service_obj.province_name + " " + $scope.add_service_obj.city_name + " " + $scope.add_service_obj.area_name;
            ServicerService.addService({},$scope.add_service_obj,function(data){
                /*$scope.returnServiceInfo = data;
                $scope.next_open_service = true;*/
                $state.go('main.merchant_home.servicer_manage', {sp_id: data.sp_id})
            },function(error){
                alert(error.data.msg)
            })
        } else {
            $scope.AddServiceForm.submitted = true;
        }
    };
    $scope.bs_array = [];
    init_business();//查询所有的服务
    /**
     * 获取一级服务分类
     */
    BusinessClassService.common_findChildByParentId({
        pg_count : 999,
        pg_index : 0,
        parent_id :0
    },function(data){
        $scope.BusinessFirst = data;
    });
    //二级分类
    $scope.searchSecond = function(params){
        if(!!params){
            init_business(params);
        }
        BusinessClassService.common_findChildByParentId({
            "pg_index" : 0,
            "pg_count": 999,
            "parent_id":params
        },function(data){
            $scope.BusinessSrcondclass=data;
        });
    };
    //获取三级
    $scope.searchThird = function(params){
        if(!!params){
            init_business(params);
        }
        BusinessClassService.common_findChildByParentId({
            "pg_index" : 0,
            "pg_count": 999,
            "parent_id":params
        },function(data){
            $scope.BusinessThreeclass=data;
        });
    };
    $scope.showBusiness = function(params){
        if(!!params){
            init_business(params);
        }
    };
    function init_business(bs_class_id){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BusinessService.common_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                bs_class_id : bs_class_id === undefined ? null : bs_class_id
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems) {
            $scope.businessList = [];
            $scope.business_bs_id = "";
            if(newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.businessList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    /**
     * 开通服务商的服务
     */
    $scope.saveService = function(){
        if($scope.bs_array.length > 0){
            BusinessService.addServiceBs({
                sp_id:$scope.returnServiceInfo.sp_id,
                code:$scope.returnServiceInfo.code},$scope.bs_array,function(data){
                $location.path('/main/merchant_home/servicer_list')
            },function(error){
                alert(error.data.msg);
            })
        }else{
            $scope.open_service_show = true;
        }
    };
    //单选
    $scope.checkall = false;
    $scope.sChoose = function(id){
        if($scope.bs_array.indexOf(id) !== -1){
            $scope.bs_array.splice($scope.bs_array.indexOf(id),1);
        }else{
            $scope.bs_array.push(id);
            $scope.open_service_show = false;
        }
    };
    //查看所有服务
    $scope.all_service = function(){
        init_business();//查询所有的服务
    }

    var createIdCode = function(){
        BusinessClassService.getidcode({},function(data){
            $scope.add_service_obj.idCode = data.idCode;
        },function(error){
        });
    }
    createIdCode();
    $scope.manual = createIdCode;
});
