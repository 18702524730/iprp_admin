angular.module('iprpAdminApp').controller('couponListCtrl', function ($scope,$modal,BusinessService,PaginationService,$location,PartnerService,marKetList) {
    $('#coupon_list').siblings().removeClass("selected");
    $('#coupon_list').addClass("selected");

     // 添加时间控件 初始化
    $('#createTimeStart,#createTimeEnd').datetimepicker({
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn:  1,
        autoclose:  true
    }); 

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

    $scope.createTimeStart = $scope.obj.createTimeStart && MsecFormat($scope.obj.createTimeStart);
    $scope.createTimeEnd = $scope.obj.createTimeEnd && MsecFormat($scope.obj.createTimeEnd );

    $scope.obj.createTimeStart = null;
    $scope.obj.createTimeEnd = null;
    //获取存证时间 createTimeStart
    var get_usageTimeStart = function () {
      if (!$scope.createTimeStart ) {
        return ''
      } else {
        if (!$scope.obj.createTimeStart) {
          return new Date($scope.createTimeStart).getTime();
        } else {
          if (typeof $scope.obj.createTimeStart != 'string') {
            return new Date($scope.obj.createTimeStart).getTime()
          } else {
            return $scope.obj.createTimeStart - 0;
          }
        }
      }
    };
    $scope.firstCategory = {
        bsClassId:''
    };
    //获取时间  createTimeEnd
    var get_usageTimeEnd = function () {
      if(!$scope.createTimeEnd) {
        return ''
      } else {
        if(!$scope.obj.createTimeEnd) {
          return new Date($scope.createTimeEnd).getTime() + 86399000
        } else {
          if(typeof $scope.obj.createTimeEnd != 'string' ) {
            return new Date($scope.obj.createTimeEnd).getTime() ;
          } else {
            return parseInt($scope.obj.createTimeEnd,10) ;
          }
        }
      }
    };
    serviceTypeList();
    init_business_list();
    function init_business_list(){
        console.log($scope.createTimeStart)
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function (pg_index, pg_count, cb) {
          var pageConfig = {
            "pgIndex":pg_index,
            "pgCount":pg_count,
            "createTimeStart": get_usageTimeStart () || null,
            "createTimeEnd": get_usageTimeEnd () || null,
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          console.log(object,'测试')
          $location.path('main/business_home/coupon_list').search(object);
          PartnerService.findPartnerGoods(object, cb);
        };

        $scope.pagination = new PaginationService(OweNer,15, 1, true);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.businessList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.businessList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

   

    $scope.search_order = function(){
        console.log($scope.obj)
        init_business_list();
    }
    $scope.serviceType = function(){//选中左边的
        for(var i in $scope.serviceCategoryList){
           if($scope.serviceCategoryList[i].bsClassId == $scope.obj.firstCategory){
                $scope.serviceList = $scope.serviceCategoryList[i].childs;
                console.log($scope.serviceList)
           }
        }
    }
    $scope.search_reset = function() {
        $scope.obj = {};
        $scope.createTimeStart = '';
        $scope.createTimeEnd = '';
        init_business_list();
    }
    $scope.serviceCategory = [];
    $scope.serviceCategoryList = [];//总的数据
    function serviceTypeList() {
        marKetList.findAllCategory(function(data) {
            $scope.serviceCategoryList = data;
            if(data.length){
                for(var i in data){//数据一次性返回，前端做拆分
                    if(data[i].bsClassId&&data[i].bsClassName){
                        var item = {
                            bsClassId:data[i].bsClassId,
                            bsClassName:data[i].bsClassName
                        }
                        $scope.serviceCategory.push(item)
                    }
                }
            }
            if($scope.obj.firstCategory){
                $scope.serviceType();
            }
            console.log($scope.obj,'测试循环')
        },function(err) {
            // body...
        })
    }

    $scope.onShelves = function(item) {//上架
        var data = {
            id : item.id,
            isPartnerProduct:1
        }
        layer.open({
            title: '提示'
            ,content: '是否确认上架？'
            ,yes:function (index, layero) {
                layer.close(index);
                PartnerService.partnerGoodsUpperDown(data,function(resp) {
                   $scope.search_order() 
                },function (argument) {
                   $scope.search_order() 
                })
            }
        })
        
    }
    $scope.offShelf = function(item) {//下架
        var data = {
            id : item.id,
            isPartnerProduct:0
        }
        PartnerService.partnerGoodsUpperDown(data,function(resp) {
           $scope.search_order() 
        },function (argument) {
           $scope.search_order() 
        })
    }

    $scope.lookChange = function(item) {//查看详情
        console.log(item)
        $location.path('main/business_home/coupon_redact/'+item.id);
    }
    
});
