angular.module('iprpAdminApp').controller('QuickWheatOrderCtrl', function ($scope,$modal,Enterprises,bsOrderService,PaginationService,$location,session,Upload) {
  $('#quick_wheat_order').addClass("selected").siblings().removeClass("selected");
  $scope.obj = {};
	// 添加时间控件 初始化
	$('#orderTimeStart,#orderTimeEnd,#payTimeStart,#payTimeEnd,#deliveryTimeStart,#deliveryTimeEnd').datetimepicker({
		minView: "month", //选择日期后，不会再跳转去选择时分秒
		language:  'zh-CN',
		format: 'yyyy-mm-dd',
		todayHighlight: true,
		todayBtn:  1,
		autoclose:  true
	  });
	  $('.datetimepicker').css('display','none');
	  var MsecFormat = function (input) {
		if(input == null || input=='' || typeof(input) == "undefined"){
		  return "--";
		}
		var _date = new Date(input-0);
		var year = _date.getFullYear();
		var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
		var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
		var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
		var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
		var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
		return year + "-" + month + "-" + day;
	  };
	
	  $scope.obj = $location.search() || {};
	  $scope.orderTimeStart = $scope.obj.orderTimeStart && MsecFormat($scope.obj.orderTimeStart);
	  $scope.orderTimeEnd = $scope.obj.orderTimeEnd && MsecFormat($scope.obj.orderTimeEnd );
	  $scope.payTimeStart = $scope.obj.payTimeStart && MsecFormat($scope.obj.payTimeStart);
	  $scope.payTimeEnd = $scope.obj.payTimeEnd  && MsecFormat($scope.obj.payTimeEnd );
	  $scope.deliveryTimeStart = $scope.obj.deliveryTimeStart && MsecFormat($scope.obj.deliveryTimeStart);
	  $scope.deliveryTimeEnd = $scope.obj.deliveryTimeEnd  && MsecFormat($scope.obj.deliveryTimeEnd );
	  //$scope.obj.is_filter_test = $scope.obj.is_filter_test == '1' ? true : false;
	
	  //前面赋值后重置，避免时间获取潜在bug
	  $scope.obj.orderTimeStart = null;
	  $scope.obj.orderTimeEnd = null;
	  $scope.obj.payTimeStart = null;
	  $scope.obj.payTimeEnd = null;
	  $scope.obj.deliveryTimeStart = null;
	  $scope.obj.deliveryTimeEnd = null;
	  //获取时间 orderTimeStart
  var get_create_start_time = function () {
    if (!$scope.orderTimeStart ) {
      return null
    } else {
      if (!$scope.obj.orderTimeStart) {
        return new Date($scope.orderTimeStart).getTime();
      } else {
        if (typeof $scope.obj.orderTimeStart != 'string') {
          return new Date($scope.obj.orderTimeStart).getTime()
        } else {
          return $scope.obj.orderTimeStart - 0;
        }
      }
    }
  };

  //获取时间  orderTimeEnd
  var get_create_end_time = function () {
    if(!$scope.orderTimeEnd) {
      return null
    } else {
      if(!$scope.obj.orderTimeEnd) {
        return new Date($scope.orderTimeEnd).getTime() + 86399000
      } else {
        if(typeof $scope.obj.orderTimeEnd != 'string' ) {
          return new Date($scope.obj.orderTimeEnd).getTime() ;
        } else {
          return parseInt($scope.obj.orderTimeEnd,10) ;
        }
      }
    }
  };

  //获取时间 payTimeStart
  var get_payment_start_time = function () {
    if (!$scope.payTimeStart ) {
      return null
    } else {
      if (!$scope.obj.payTimeStart) {
        return new Date($scope.payTimeStart).getTime();
      } else {
        if (typeof $scope.obj.payTimeStart != 'string') {
          return new Date($scope.obj.payTimeStart).getTime()
        } else {
          return $scope.obj.payTimeStart - 0;
        }
      }
    }
  };

  //获取时间 payTimeEnd
  var get_payment_end_time = function () {
    if(!$scope.payTimeEnd) {
      return null
    } else {
      if(!$scope.obj.payTimeEnd) {
        return new Date($scope.payTimeEnd).getTime() + 86399000
      } else {
        if(typeof $scope.obj.payTimeEnd != 'string' ) {
          return new Date($scope.obj.payTimeEnd).getTime() ;
        } else {
          return parseInt($scope.obj.payTimeEnd,10) ;
        }
      }
    }
  };
  //获取时间 deliveryTimeStart
  var get_send_start_time = function () {
    if (!$scope.deliveryTimeStart ) {
      return null
    } else {
      if (!$scope.obj.deliveryTimeStart) {
        return new Date($scope.deliveryTimeStart).getTime();
      } else {
        if (typeof $scope.obj.deliveryTimeStart != 'string') {
          return new Date($scope.obj.deliveryTimeStart).getTime()
        } else {
          return $scope.obj.deliveryTimeStart - 0;
        }
      }
    }
  };

  //获取时间 deliveryTimeEnd
  var get_send_end_time = function () {
    if(!$scope.deliveryTimeEnd) {
      return null
    } else {
      if(!$scope.obj.deliveryTimeEnd) {
        return new Date($scope.deliveryTimeEnd).getTime() + 86399000
      } else {
        if(typeof $scope.obj.deliveryTimeEnd != 'string' ) {
          return new Date($scope.obj.deliveryTimeEnd).getTime() ;
        } else {
          return parseInt($scope.obj.deliveryTimeEnd,10) ;
        }
      }
    }
  };
  init_seller_list();

  function init_seller_list () {
    $scope.to_loading = true;//默认 开始 加载  
	$scope.loading_text = "加载中...";//加载页面内容
	var OweNer = function (pgIndex, pgCount, cb) {
		var pageConfig = {
			"pgIndex": pgIndex,
			"pgCount": pgCount,
			"orderTimeStart": get_create_start_time (),
			"orderTimeEnd": get_create_end_time (),
			"payTimeStart": get_payment_start_time (),
			"payTimeEnd": get_payment_end_time (),
			"deliveryTimeStart": get_send_start_time (),
			"deliveryTimeEnd": get_send_end_time (),
		};
		var object = $.extend({}, $scope.obj, pageConfig);
		//console.log($scope.obj)
		$location.path('main/channel_home/quick_wheat_order').search(object);
		bsOrderService.quick_wheat_list(object, cb);
	};
	$scope.pagination = new PaginationService(OweNer, 15,1);

	$scope.$watch('pagination.curPageItems', function (newItems) {
		$scope.OrderList = [];
		if (newItems == undefined)
			return;
		if ($scope.pagination.curPageItems.length === 0) {
			$scope.loading_text = "没有符合条件的记录";//加载页面内容
			return;
		}
		$scope.OrderList = newItems;
		$scope.to_loading = false;//如果不为空 结束加载页面
	});
    // $scope.obj.type = 2;
    // var OweNer = function(pg_index,pg_count,cb) {
    //   var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count})
    //   Enterprises.queryGuogaoList(params,cb);
    // };
    // $scope.pagination = new PaginationService(OweNer,10,1,true);

    // $scope.$watch('pagination.curPageItems',function(newItems){
    //   $scope.labelList = [];
    //   // console.log('newitems', newItems, $scope.pagination.curPageItems)
    //   if (newItems == undefined)
    //       return;
    //   if ($scope.pagination.curPageItems.length === 0){
    //       $scope.loading_text = "没有符合条件的记录";//加载页面内容
    //       return;
    //   }
    //   var pgIndex = ($scope.pagination.curPage-1)*10
    //   $scope.labelList = newItems;
    //   $scope.to_loading = false;//如果不为空 结束加载页面
  	// });
	}

  /**
   * 搜索
   */
  $scope.search = function(){
    init_seller_list();
  };

  $scope.reset = function () {
    $scope.obj = {};
    $scope.orderTimeStart = null;
	  $scope.orderTimeEnd = null;
	  $scope.payTimeStart = null;
	  $scope.payTimeEnd = null;
	  $scope.deliveryTimeStart = null;
	  $scope.deliveryTimeEnd = null;
    init_seller_list();
  }



  // 导出
  $scope.search_export = function(type){
  	var pageConfig = {
  		type: type
    };
    var object = $.extend({}, $scope.obj, pageConfig);
    object.pg_index = null;
    object.pg_count = null;
    object.access_token = session.accessToken;
  	location.href = rootConfig.adminUrl + '/iprp_operator/api/tech/exportExcel?' + $.param(object)
  }

  // 导入
  $scope.uploadFile = function(file){
  	if (!file) {return}
  	Upload.upload({
        url: options.api.base_url + '/addKuaimaiExcel?access_token=' + session.accessToken,
        data: {file: file}
    }).then(function (resp) {
    	layer.alert('导入成功');
    	$scope.search();
    }, function (resp) {
    	resp = resp.data;
      if (resp && resp.msg) {
      	layer.alert(resp.msg);
      }
    });
  }

});
