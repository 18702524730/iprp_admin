angular.module('iprpAdminApp').controller('BillDetailCtrl', function ($scope,$modal,BillService,BillOrderService,PaginationService,$stateParams,$location) {
    $('#sp_bill').siblings().removeClass("selected");
    $('#sp_bill').addClass("selected");
    /**
     * 结算详情
     */
    BillService.bill.detail({
        bill_id:$stateParams.bill_id
    },function(data){
        $scope.bill_detail = data;
    },function(error){
        alert(error.data.msg);
    });
    /**
     * 结算订单列表
     * @type {{}}
     */
    $scope.obj = {};
    var array = [];
    init_bill_order_list();
    function init_bill_order_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BillOrderService.bill_order.get({
                "pg_index":pg_index,
                 bill_id:$stateParams.bill_id,
                "pg_count":pg_count,
                 order_sn:!$scope.obj.order_sn ? null : $scope.obj.order_sn,
                 state:!$scope.obj.state ? null : $scope.obj.state,
                "bs_name" : !$scope.obj.bs_name ? null : encodeURI($scope.obj.bs_name),
                "bs_class_name" : !$scope.obj.bs_class_name ? null : encodeURI($scope.obj.bs_class_name)
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.allId = [];
            $scope.bill_order_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.bill_order_list = newItems;
            newItems.forEach(function(obj){
                array.push(obj.bill_order_id);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    /**
     * 按条件查询
     */
    $scope.search = function(){
        init_bill_order_list();
    };
    /**
     * 结算审核
     */
    $scope.bill_order_pay_detail = function(bill_order_id,bill_id){
        $modal.open({
            resolve:{
                bill_order_id : function(){
                    return bill_order_id;
                },
                bill_id:function(){
                    return bill_id;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\service\\bill_order_payment.html',
            controller: 'BillOrderPaymentCtrl'
        }).result.then(function (result) {

        });
    };

    //单选
    $scope.checkall = false;
    $scope.sChoose = function(id){
        if($scope.allId.indexOf(id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(id),1);
        }else{
            $scope.allId.push(id);
        }
        if($scope.allId.length === array.length){
            $scope.checkall = true;
        }else{
            $scope.checkall = false;
        }
    };
    //全选
    $scope.allChoose = function(){
        $scope.checkall = !$scope.checkall;
        if($scope.checkall){
            $scope.allId = angular.copy(array);
        }else{
            $scope.allId = [];
        }
    };

    /**
     * 批量审核
     */
    var temp_bill_order_ids= "";
    var temp_bill_order_sn = "";
    var temp_bill_amount = 0;
    $scope.check_bill_order = function(){
        temp_bill_order_sn = "";
        temp_bill_amount = 0;
        if($scope.allId.length === 0){
            alert("请选择审核的结算单!")
        }else{
            angular.forEach($scope.allId,function(data){
                temp_bill_order_ids += "," + data;
            });
            angular.forEach($scope.bill_order_list,function(data){
                if(temp_bill_order_ids.indexOf("," + data.bill_order_id) != -1){
                    temp_bill_amount = temp_bill_amount + data.bill_Amount;
                    temp_bill_order_sn += data.order_sn + ",";
                }
            });
            temp_bill_order_ids = "";
            $modal.open({
                resolve:{
                    temp_bill_order_sn : function(){
                        return temp_bill_order_sn;
                    },
                    temp_bill_amount : function(){
                        return temp_bill_amount;
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\service\\check_bill_order.html',
                controller: 'CheckBillOrderCtrl'
            }).result.then(function (result) {
                BillOrderService.bill_order.check({
                    bill_id:$stateParams.bill_id,
                    bill_order_ids:$scope.allId},{},function(data){
                    temp_bill_order_sn = "";
                    init_bill_order_list();
                },function(error){
                    alert(error.data.msg);
                })
            });
        }
    };

    /**
     * 确认结算
     */
    $scope.bill_order = function(){
        temp_bill_order_sn = "";
        temp_bill_amount = 0;
        if($scope.allId.length === 0){
            alert("请选择确认的结算单!")
        }else {
            angular.forEach($scope.allId,function(data){
                temp_bill_order_ids += "," + data;
            });
            angular.forEach($scope.bill_order_list, function (data) {
                if (temp_bill_order_ids.indexOf("," + data.bill_order_id) != -1) {
                    temp_bill_amount = temp_bill_amount + data.bill_Amount;
                    temp_bill_order_sn += data.order_sn + ",";
                }
            });
            temp_bill_order_ids = "";
            $modal.open({
                resolve:{
                    temp_bill_order_sn : function(){
                        return $scope.allId.length;
                    },
                    temp_bill_amount : function(){
                        return temp_bill_amount;
                    },
                    bill_id:function(){
                        return $stateParams.bill_id;
                    },
                    bill_type:function(){
                        return $scope.bill_detail.bill_type;
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\service\\affirm_bill.html',
                controller: 'AffirmBillCtrl'
            }).result.then(function (result) {
                    BillOrderService.bill_order.con_bill({
                        bill_type : result.bill_type,
                        bill_id:$stateParams.bill_id,
                        bill_order_ids:$scope.allId},{},function(data){
                        temp_bill_order_sn = "";
                        init_bill_order_list();
                    },function(error){
                        alert(error.data.msg);
                    })
            });
        }
    };
    /**
     * 返回结算列表
     */
    $scope.bill_list = function(){
        $location.path('/main/bill_home/statement/' + $scope.bill_detail.sp_id);
    }
});