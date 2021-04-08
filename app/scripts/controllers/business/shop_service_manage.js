angular.module('iprpAdminApp').controller('BusinessShopServiceManageCtrl',function($scope,$modal,mallServiceClassService, bsOrderService, PaginationService,$stateParams, $location, $state){
  $('#shop_service_manage').addClass("selected").parent().siblings().children().removeClass("selected");

  var arr=[];

  // 添加时间控件 初始化
  /*$('#feedbackTimeBegin,#feedbackTimeEnd,#checkTimeBegin,#checkTimeEnd').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  });
  $('.datetimepicker').css('display','none');

  // 获取服务商
  ServicerService.common_service_list(function(data){
      $scope.spList = data.elements;
  });*/

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
  $scope.typeobj = {};
  /*$scope.feedbackTimeBegin = $scope.obj.feedbackTimeBegin && MsecFormat($scope.obj.feedbackTimeBegin);
  $scope.feedbackTimeEnd = $scope.obj.feedbackTimeEnd && MsecFormat($scope.obj.feedbackTimeEnd-86399000);
  $scope.checkTimeBegin = $scope.obj.checkTimeBegin && MsecFormat($scope.obj.checkTimeBegin);
  $scope.checkTimeEnd = $scope.obj.checkTimeEnd  && MsecFormat($scope.obj.checkTimeEnd-86399000);*/
  init_order_list();

  function init_order_list(needInit) {
  		$scope.allId = [];
      if (needInit) {
          $scope.obj = $location.search() || {};
      }
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容

      //获取时间
      var get_time = function (name, isEnd) {
        if (!$scope[name] ) {
          return ''
        } else {
          var t = new Date($scope[name]).getTime();
          return isEnd ? t + 86399000 : t;
        }
      };
      // 组装后台字段bs_calss_id值
      var get_bs_calss_id = function(){
          var ret = '';
          if ($scope.obj.fir_id) {
              ret = $scope.obj.fou_id || $scope.obj.thi_id || $scope.obj.sec_id || $scope.obj.fir_id
          }else{
              ret = $scope.typeobj.fou_id || $scope.typeobj.thi_id || $scope.typeobj.sec_id || $scope.typeobj.fir_id
          }
          return ret;
      };
      // 组装后台字段bs_calss_type值
      var get_bs_calss_type = function(){
          var ret = '';
          if ($scope.obj.fir_id) {
              ret = $scope.obj.fou_id ? 4 : $scope.obj.thi_id ? 3 : $scope.obj.sec_id ? 2 : $scope.obj.fir_id ? 1 : ''
          }else{
              ret = $scope.typeobj.fou_id ? 4 : $scope.typeobj.thi_id ? 3 : $scope.typeobj.sec_id ? 2 : $scope.typeobj.fir_id ? 1 : ''
          }
          return ret;
      };

      var OweNer = function (pg_index, pg_count, cb) {
          //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
          if ($scope.obj.pg_index) {
              pg_index = $scope.obj.pg_index;
              $scope.obj.pg_index = '';
          }
          var pageConfig = {
              "pg_index": pg_index,
              "pg_count": pg_count,
              "first_category": $scope.typeobj.fir_id || '',
              "second_category": $scope.typeobj.sec_id || '',
              "third_category":$scope.typeobj.thi_id || '',
              /*"feedbackTimeBegin": get_time("feedbackTimeBegin"),
              "feedbackTimeEnd": get_time("feedbackTimeEnd", true),
              "checkTimeBegin": get_time("checkTimeBegin"),
              "checkTimeEnd": get_time("checkTimeEnd", true)*/
          };
          var object = $.extend({}, $scope.obj, pageConfig);

          mallServiceClassService.manageList(object, cb);
          var o = $.extend({}, object, $scope.typeobj);
          $location.search(o).replace();
      };
      $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);

      $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.OrderList = [];
          if (newItems == undefined)
              return;
          if ($scope.pagination.curPageItems.length === 0) {
              $scope.loading_text = "没有符合条件的记录";//加载页面内容
              return;
          }
          $scope.OrderList = newItems;
          arr = newItems.map(item => item.bs_id);
          console.log(arr)
          $scope.to_loading = false;//如果不为空 结束加载页面
      });
  }
  //按条件查询
  $scope.search_order = function(){
      init_order_list();
  }

  $scope.search_reset = function () {
      $scope.obj = { };
      $scope.typeobj = {};
      $scope.feedbackTimeBegin = null;
      $scope.feedbackTimeEnd = null;
      $scope.checkTimeBegin = null;
      $scope.checkTimeEnd = null;
      init_order_list();
  }

  $scope.bs_type_change = function(type, id, callback){
      if (id) {
        if (type == 3) {
          bsOrderService.serviceStatus({
              bsId: id
          },function(data){
            $scope['fouTypeData'] = data.data;
            if (callback) {
                callback();
            }else{
                $scope.typeobj.fou_id='';
            }
          },function(error){
            alert(error.data.msg);
          })
        }else{
          bsOrderService.productType({
              type:type,
              parent_id: id
          },function(data){
              if (type == 1) {
                  $scope['secTypeData'] = data;
                  if (callback) {
                      callback();
                  }else{
                      $scope.typeobj.sec_id='';
                      $scope.typeobj.thi_id='';
                      $scope.typeobj.fou_id='';
                      $scope['thiTypeData']=[];
                      $scope['fouTypeData']=[];
                  }
              }else if(type == 2){
                  $scope['thiTypeData'] = data;
                  if (callback) {
                      callback();
                  }else{
                      $scope.typeobj.thi_id='';
                      $scope.typeobj.fou_id='';
                      $scope['fouTypeData']=[];
                  }
              }
          },function(error){
              alert(error.data.msg);
          })
        }
      }else{
          if (type == 1) {
              $scope.typeobj.sec_id='';
              $scope.typeobj.thi_id='';
              $scope.typeobj.fou_id='';
              $scope['secTypeData']=[];
              $scope['thiTypeData']=[];
              $scope['fouTypeData']=[];
          }else if(type == 2){
              $scope.typeobj.thi_id='';
              $scope.typeobj.fou_id='';
              $scope['thiTypeData']=[];
              $scope['fouTypeData']=[];
          }else if(type == 3){
              $scope.typeobj.fou_id='';
              $scope['fouTypeData']=[];
          }
      }
  }

  //获取商品一级分类
  bsOrderService.productType(function(data){
      $scope.firTypeData = data;
      $scope.typeobj.fir_id = $scope.obj.fir_id-0 || '';
  },function(error){
      alert(error.data.msg);
  });

  //获取商品二级分类
  if ($scope.obj.fir_id) {
      $scope.bs_type_change(1, $scope.obj.fir_id, function(){
          $scope.typeobj.sec_id = $scope.obj.sec_id-0 || '';
      });
  }

  //获取商品三级分类
  if ($scope.obj.sec_id) {
      $scope.bs_type_change(2, $scope.obj.sec_id, function(){
          $scope.typeobj.thi_id = $scope.obj.thi_id-0 || '';
      });
  }

  //获取四级服务状态
  if ($scope.obj.thi_id) {
      $scope.bs_type_change(3, $scope.obj.thi_id, function(){
          $scope.typeobj.fou_id = $scope.obj.fou_id-0 || '';
      });
  }

  //查看
  $scope.view = function(id){
    $state.go('main.business_home.shop_service_detail', {id: id});
  }

  //提示操作
  $scope.hint=false;
  $scope.hints = function(){
      $scope.hint = !$scope.hint;
  }

  $scope.allId = [];
  $scope.checkall = false;
  $scope.sChoose = function(id){
      if($scope.allId.indexOf(id) !== -1){
          $scope.allId.splice($scope.allId.indexOf(id),1);
      }else{
          $scope.allId.push(id);
      }
      if($scope.allId.length === arr.length){
          $scope.checkall = true;
      }else{
          $scope.checkall = false;
      }
  };

  $scope.allChoose = function(){
      $scope.checkall = !$scope.checkall;
      if($scope.checkall){
          $scope.allId = angular.copy(arr);
      }else{
          $scope.allId = [];
      }
  }

  $scope.checkPass = function(isPass){
  	if (!$scope.allId.length) {
  		layer.alert('请先选择服务');
  		return;
  	}
  	var verify_status = isPass === 1 ? 1 : 2;
  	layer.confirm(`确定${isPass==1? '审核通过':'审核不通过'}么？`, {
      btn: ['确定','取消'] //按钮
    }, function(index){
      mallServiceClassService.checkPass({
	  		verify_status: verify_status,
	  		id_list: $scope.allId
	  	}, function(data){
				init_order_list();
	      layer.msg('操作成功！');
		  }, function(data){
		    layer.alert(data.data.msg);
		  });
    }, function(){
    });

  }
})
