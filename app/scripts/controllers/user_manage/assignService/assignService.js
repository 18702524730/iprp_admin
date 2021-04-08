angular.module('iprpAdminApp').controller('AssignServiceCtrl', function ($scope,MemberService,ChannelService,AssignService,BusinessClassService,$stateParams,$modal,BusinessService,PaginationService) {
    $('#assignService_list').siblings().removeClass("selected");
    $('#assignService_list').addClass("selected");

    //渠道列表
    ChannelService.channel.channel_all({
        "pg_index":0,
        "pg_count":999
    },function(data){
        $scope.channel_list = data.elements;
        if ($scope.channel_list.length) {
            $scope.channel_id = $scope.channel_list[0].channel_id;
            $scope.channel_name = $scope.channel_list[0].name;
            info_AssignService();
            init_channel_list();
        }
    });

    $scope.channelChange = function(channel_id){
        var channel_name = '';
        $.each($scope.channel_list, function(i, item){
            if (item.channel_id == channel_id) {
                channel_name = item.name;
                return false;
            } 
        });
        $scope.channel_name = channel_name;
        sp_count();
    }; 
    /**
     * 获取详情
     */
    assign_service_detail();
    function assign_service_detail(){
        AssignService.Assign.detail({designation_id : $stateParams.designation_id},function(data){
            $scope.assgin_detail = data;
        },function(error){
            alert(error.data.msg);
        });
    }
    //info_AssignService();
    //查询会员下服务
    function info_AssignService(){
        AssignService.Assign.spService({
            designation_id : $stateParams.designation_id
        },function(data){
            $scope.member_service_list = data;
            if($scope.member_service_list.length > 0){
                sp_count();
            }
        })
    }
    //没有选服务分类查看全部服务
    init_channel_list();
    $scope.business_bs_id = ""; //声明一个字符串和服务比较处理
    function init_channel_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BusinessService.common_list({
                "pg_index":pg_index,
                "pg_count":pg_count
            },cb);
        };
        $scope.channel_page = new PaginationService(OweNer,15);
        $scope.$watch('channel_page.curPageItems',function(newItems){
            $scope.businessList = [];
            $scope.business_bs_id  = "";
            if(newItems == undefined )
                  return;
            if ($scope.channel_page.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.businessList = newItems;
            //下一页再比较
            sp_count();
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
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
        var OweNer = function(pg_index,pg_count,cb){
            BusinessService.common_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                bs_class_id : bs_class_id
            },cb);
        };
        $scope.channel_page = new PaginationService(OweNer,15);

        $scope.$watch('channel_page.curPageItems',function(newItems){
            $scope.businessList = [];
            if(newItems == undefined)
                return;
            if ($scope.channel_page.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.businessList = newItems;
            //下一页再比较
            sp_count();
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //作比较根据分类查询服务bs_id和channel_id下有指定的
    function sp_count(){
        angular.forEach($scope.businessList,function(data){
            data.sp_name = '';
            data.channel_id = '';
            data.member_sp_id = '';
            angular.forEach($scope.member_service_list,function(message){
                if(data.bs_id === message.bs_id && $scope.channel_id === message.channel_id){
                    data.sp_name = message.name;
                    data.channel_id = message.channel_id;
                    data.member_sp_id = message.member_sp_id;
                }
            })
        })
    }
    //指定服务商modal
    $scope.assgin_service_obj = { };
    $scope.assign_servicer = function(bs_id){
        $modal.open({
            resolve:{
                bs_id : function(){
                    return bs_id;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\service\\member_allot_service.html',
            controller: 'MemberAllotServiceCtrl'
        }).result.then(function (result) {
                $scope.assgin_service_obj.channelId = $scope.channel_id;
                $scope.assgin_service_obj.spId = result.sp_id;
                $scope.assgin_service_obj.bsId = bs_id;
                $scope.assgin_service_obj.designation_id = $stateParams.designation_id;
                console.log($scope.assgin_service_obj)
                AssignService.Assign.assgin_service({designation_id : $stateParams.designation_id},$scope.assgin_service_obj,function(data){
                    info_AssignService();
                },function(error){
                    alert(error.data.msg);
                })
            });
    };
    /**
     * 取消指定服务商
     * @param id
     */
    $scope.delete_assign_servicer = function(id){
        AssignService.Assign.delete({member_sp_id : id},{},function(data){
            init_channel_list();
            info_AssignService();
        },function(error){
            alert(error.data.msg);
        })
    };
    //查看所有服务
    $scope.all_service = function(){
        init_channel_list();
    }
});

