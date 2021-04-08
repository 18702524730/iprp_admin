angular.module('iprpAdminApp').controller('MerchantDetailCtrl',function($scope,MerchantManageService, $modal,$stateParams,$state, $location,Upload,session,telService, bsOrderService,ChannelService,ServicerService,BusinessService,PaginationService,BusinessClassService){
		$scope.channel_id = '';
    $scope.flowType = 1;
    $scope.shopUrl = 'https://www.ipsebe.com'
    if (location.host.indexOf('test') == 0) {
    	$scope.shopUrl = 'https://testwww.ipsebe.com'
    }
    if (location.host.indexOf('pre') == 0) {
    	$scope.shopUrl = 'https://prewww.ipsebe.com'
    }

    var once = false;
    // 详情，除了业务资料和服务类目
    var getDetail = function(){
	  	MerchantManageService.detail({spId: $stateParams.spId}, function(data){
	  		console.log(data)
	  		$scope.detail = data;
	  	});
	  }
	  getDetail();

	  // 业务资料
    var getBusinessData = function(){
	  	MerchantManageService.getBusiness({sp_id: $stateParams.spId}, function(data){
	  		console.log(data)
	  		$scope.businessData = data;
	  	});
	  }

	  // 店铺资料
    var getStoreData = function(){
	  	MerchantManageService.getStore({spId: $stateParams.spId}, function(data){
	  		console.log(data)
	  		$scope.storeData = data[0];
	  	});
	  }


	  // 服务类目
    var initServiceClass = function(){
    	var getChannels = function(cb){
	    	ChannelService.channel.channel_all({
	        "pg_index":0,
	        "pg_count":999
		    },function(data){
		        $scope.channel_list = data.elements;
		        cb && cb();
		    });
		  };
		  getChannels();
		  init_service_list();
	    //切换渠道
	    $scope.channelChange = function(channel_id){
	    		$scope.channel_id = channel_id;
	        init_service_list();
	    };

	    $scope.tempServiceBusiness = [];

	    function init_service_list(pageIndex){
	    		$scope.tempServiceBusiness = [];
	        $scope.to_loading = true;//默认 开始 加载
	        $scope.loading_text = "加载中...";//加载页面内容
	        var OweNer = function(pg_index,pg_count,cb){
	        		// 总的服务列表 api/common/businesses
	            BusinessService.findServicebusinessBsById({
	                "pg_index":pageIndex || pg_index,
	                "pg_count":pg_count,
	                channel_id: $scope.channel_id,
	                sp_id: $stateParams.spId,
	                bs_class_parent_id: $scope.bs_class_id, //1级
	                bs_class_id : $scope.s_bs_class_id, //2级
	                bs_id: $scope.t_bs_class_id, //3级
	            }, function(data) {
	            	$scope.allServiceClassData = data;
	            	cb && cb(data);
	            });
	        };
	        $scope.pagination = new PaginationService(OweNer,15);

	        if (pageIndex) {
	            $scope.pagination.curPage = pageIndex;
	        }

	        if (once) {return}
	        once = true;
	        $scope.$watch('pagination.curPageItems',function(newItems){
	        	console.log(newItems)
	            $scope.tempServiceBusiness = [];
	            if(newItems == undefined)
	                return;
	            if ($scope.pagination.curPageItems.length === 0){
	                $scope.loading_text = "没有符合条件的记录";//加载页面内容
	                return;
	            }
	            $scope.tempServiceBusiness = newItems;
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
	    $scope.searchSecond = function(id){
	    		$scope.bs_class_id = id;
	        init_service_list();
	        BusinessClassService.common_findChildByParentId({
	            "pg_index" : 0,
	            "pg_count": 999,
	            "parent_id": id
	        },function(data){
	            $scope.BusinessSrcondclass=data;
	        });
	        $scope.s_bs_class_id = '';
	        $scope.t_bs_class_id = '';
	    };
	    //获取三级
	    $scope.searchThird = function(id){
	    		$scope.s_bs_class_id = id;
	        init_service_list();
	        BusinessClassService.common_findChildByParentId({
	            "pg_index" : 0,
	            "pg_count": 999,
	            "parent_id":id
	        },function(data){
	            $scope.BusinessThreeclass=data;
	        });
	        $scope.t_bs_class_id = '';
	    };
	    $scope.showBusiness = function(id){
	    		$scope.t_bs_class_id = id;
	      	init_service_list();
	    };

	    //查看所有服务
	    $scope.all_service = function(){
	    	  $scope.bs_class_id='';
	    	  $scope.BusinessSrcondclass = {};
	    	  $scope.BusinessThreeclass = {};
	        init_service_list();
	    };
	  }

	  $scope.next = function(index){
	    $scope.flowType = index;
	  }

	  $scope.$watch('flowType', function (flowType) {
			console.log(flowType)
			if (flowType == 1) {}
			if (flowType == 2) {
				getStoreData();
			}
			if (flowType == 3) {}
			if (flowType == 4) {
				getBusinessData();
			}
			if (flowType == 5) {
				initServiceClass();
			}
			if (flowType == 6) {}
		});
});

