angular.module('iprpAdminApp').controller('AssignServicerCtrl',function($scope,$modal,ChannelService,ChannelSpService,$stateParams,BusinessService,BusinessClassService,PaginationService,$location){
    $('#channel_list').siblings().removeClass("selected");
    $('#channel_list').addClass("selected");
    //没有选服务分类查看全部服务
    init_channel_list();
    //获取详情
    ChannelService.channel.detail({channel_id:$stateParams.channel_id},function(data){
        $scope.channel_detail = data;
        //取货渠道服务信息
        init_channel_service();
    });
    $scope.bs_ids = [];
    function init_channel_service(){
        //查询渠道下的服务
        ChannelSpService.channelSp.channelByIdService({channel_id:$stateParams.channel_id},function(data){
            $scope.channel_service_list = data;
            if($scope.channel_service_list.length > 0){
                $scope.channel_service_list.forEach(function(data){
                    $scope.bs_ids.push(data.bsId)
                });
                init_channelSp($scope.bs_ids);
            }
        })
    }
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
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.businessList = [];
            $scope.business_bs_id  = "";
            if(newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.businessList = newItems;
            newItems.forEach(function(data){
                $scope.business_bs_id += data.bs_id + ",";
                //作比较根据分类查询服务bs_is和channel_id下有指定的
                sp_count();
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //获取一级服务分类
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
                bs_class_id : bs_class_id
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.businessList = [];
            if(newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.businessList = newItems;
            if($scope.businessList !=undefined && $scope.businessList.elements.length > 0){
                $scope.businessList.elements.forEach(function(data){
                    $scope.bs_ids.push(data.bs_id)
                });
                init_channelSp($scope.bs_ids);
            }
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //根据渠道商和分类下集合服务sp_ids查询有的服务
    function init_channelSp(bs_ids){
        ChannelSpService.channelSp.list({channel_id:$stateParams.channel_id,bs_ids:bs_ids},function(data){
            $scope.channelSp_list = data;
            if($scope.channelSp_list.length > 0){
                //作比较根据分类查询服务bs_is和channel_id下有指定的
                sp_count();
            }
        },function(error){
            alert(error.data.msg);
        })
    }
    function sp_count(){
        angular.forEach($scope.businessList,function(data){
            angular.forEach($scope.channelSp_list,function(message){
                if(data.bs_id === message.bsId){
                    data.countsp = message.countsp;
                }else{
                   //data.countsp = "-";
                }
            })
        })
    }
    //指定服务商modal
    $scope.assgin_service_obj = { };
    $scope.assign = function(bs_id){
        $modal.open({
            resolve:{},
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\service\\service_list.html',
            controller: 'ServiceCtrl'
        }).result.then(function (result) {
            $scope.assgin_service_obj.spIds = result.sp_ids;
            $scope.assgin_service_obj.bsId = bs_id;
            ChannelSpService.channelSp.assignService({channel_id:$stateParams.channel_id},$scope.assgin_service_obj,function(data){
                init_channel_service();
            },function(error){
                alert(error.data.msg);
            })
        });
    };
    /**
     * 跳转到渠道商的服务列表
     */
    $scope.channel_service = function(bs_id){
        $location.path('main/channel_home/channel_service_list/' + $stateParams.channel_id + "/" + bs_id);
    };

    //查看所有服务
    $scope.all_service = function(){
        init_channel_list();
    };
});