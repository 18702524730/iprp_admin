angular.module('iprpAdminApp').controller('AddServiceChargeAllocationCtrl', function ($scope,bill_template_id,bs_id,feed_back_name,bill_feed_back_id,BusinessesService,BillTemplateFeedService,$location) {

    $scope.feed_back_name = feed_back_name;
    $scope.bill_template_feed_back_obj = { };
    $scope.bill_template_feed_back_obj.sp_commission_type = 1;
    $scope.bill_template_feed_back_obj.pr_commission_type = 1;
    $scope.bill_template_feed_back_obj.sp_bill_time_type = 0;
    $scope.bill_template_feed_back_obj.pe_bill_time_type = 0;
    $scope.bill_template_feed_back_obj.pr_bill_time_type = 0;
    $scope.bill_template_feed_back_obj.sp_commission_rate = 0;
    $scope.bill_template_feed_back_obj.pr_commission_rate = 0;
    BusinessesService.detail_businessService({bs_id:bs_id},function(data){
        $scope.businessService_detail = data;
    },function(error){
        alert(error.data.msg)
    });

    $scope.type = 0;
    $scope.bill_data = [{
        "bill_name":"服务费"
    },{
        "bill_name":"官费"
    },{
        "bill_name":"促销"
    }];

    //切换table
    $scope.bill_screen = function(index) {
        $scope.type = index;
    };

    $scope.sp_comm_type = function(msg){
        if(msg === 2){
            $scope.bill_template_feed_back_obj.sp_commission_rate = 0;
        }
    };

    $scope.pr_comm_type = function(msg){
        if(msg === 2){
            $scope.bill_template_feed_back_obj.pr_commission_rate = 0;
        }
    }

    //编辑模板
    $scope.bill_temp_error = "";
    $scope.editBillTpl = function(){
        if($scope.bill_template_feed_back_obj.pr_commission_type === 1 || $scope.bill_template_feed_back_obj.pr_commission_type === '1'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.bill_template_feed_back_obj.pr_commission_rate))){
                pr_rate_1();
                return;
            }
        }else if($scope.bill_template_feed_back_obj.pr_commission_type === 2 || $scope.bill_template_feed_back_obj.pr_commission_type === '2'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.bill_template_feed_back_obj.pr_commission_rate))
                || (Number($scope.bill_template_feed_back_obj.pr_commission_rate) > 100)){
                pr_rate_2();
                return;
            }
        }
        if(($scope.bill_template_feed_back_obj.pr_bill_time_type === 2 || $scope.bill_template_feed_back_obj.pr_bill_time_type === '2')
            || ($scope.bill_template_feed_back_obj.pr_bill_time_type === 3 || $scope.bill_template_feed_back_obj.pr_bill_time_type === '3')){
            if(!$scope.bill_template_feed_back_obj.pr_bill_times){
                pr_bill_time();
                return;
            }
        }
        if($scope.bill_template_feed_back_obj.sp_commission_type === 1 || $scope.bill_template_feed_back_obj.sp_commission_type === '1'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.bill_template_feed_back_obj.sp_commission_rate))){
                sp_rate_1();
                return;
            }
        }else if($scope.bill_template_feed_back_obj.sp_commission_type === 2 || $scope.bill_template_feed_back_obj.sp_commission_type === '2'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.bill_template_feed_back_obj.sp_commission_rate))
                || (Number($scope.bill_template_feed_back_obj.sp_commission_rate) > 100)){
                sp_rate_2();
                return;
            }
        }
        if(($scope.bill_template_feed_back_obj.sp_bill_time_type === 2 || $scope.bill_template_feed_back_obj.sp_bill_time_type === '2')
            || ($scope.bill_template_feed_back_obj.sp_bill_time_type === 3 || $scope.bill_template_feed_back_obj.sp_bill_time_type === '3')){
            if(!$scope.bill_template_feed_back_obj.sp_bill_times){
                sp_bill_time();
                return;
            }
        }
        if(($scope.bill_template_feed_back_obj.pe_bill_time_type === 2 || $scope.bill_template_feed_back_obj.pe_bill_time_type === '2')
            || ($scope.bill_template_feed_back_obj.pe_bill_time_type === 3 || $scope.bill_template_feed_back_obj.pe_bill_time_type === '3')){
            if(!$scope.bill_template_feed_back_obj.pe_bill_times){
                pe_bill_time();
                return;
            }
        }
        $scope.bill_template_feed_back_obj.bs_class_name = $scope.businessService_detail.bs_class_name;
        $scope.bill_template_feed_back_obj.bs_name = $scope.businessService_detail.name;
        $scope.bill_template_feed_back_obj.bs_feedback_name = feed_back_name;
        $scope.bill_template_feed_back_obj.bs_feedback_id = bill_feed_back_id;
        $scope.bill_template_feed_back_obj.bs_id = bs_id;
        $scope.bill_template_feed_back_obj.bill_template_id = bill_template_id;
        BillTemplateFeedService.bill_tpl_feed.add_feed_back({},$scope.bill_template_feed_back_obj,function(data){
            $scope.$close({sp_commission_type:$scope.bill_template_feed_back_obj.sp_commission_type,
                sp_commission_rate:$scope.bill_template_feed_back_obj.sp_commission_rate
            });
        },function(error){
            alert(error.data.msg);
        })
    };

    //促销
    function pr_rate_1(){
        $scope.$watch("bill_template_feed_back_obj.pr_commission_rate",function (data) {
            if(data != undefined || data != null){
                if(!/^(0|\+?[1-9][0-9]*)$/.test(data)){
                    $scope.temp_error = "促销固定金额使用正整数";
                }else{
                    $scope.temp_error = "";
                }
            }else if(data === undefined){
                $scope.temp_error = "促销固定金额不能为空";
            }
        })
    }

    //促销 比例结算
    function pr_rate_2(){
        $scope.$watch("bill_template_feed_back_obj.pr_commission_rate",function (data) {
            if(data != undefined || data != null){
                if(!/^(0|\+?[1-9][0-9]*)$/.test(data)){
                    $scope.temp_error = "促销比例结算使用正整数";
                }else{
                    if(Number(data) > 100){
                        $scope.temp_error = "促销结算比例不大于100";
                    }else{
                        $scope.temp_error = "";
                    }
                }
            }else if(data === undefined){
                $scope.temp_error = "促销比例结算不能为空";
            }
        })
    }

    //固定金额
    function sp_rate_1() {
        $scope.$watch("bill_template_feed_back_obj.sp_commission_rate",function (data) {
            if(data != undefined || data != null){
                if(!/^(0|\+?[1-9][0-9]*)$/.test(data)){
                    $scope.temp_error = "服务费固定金额使用正整数";
                }else{
                    $scope.temp_error = "";
                }
            }else if(data === undefined){
                $scope.temp_error = "服务费固定金额不能为空";
            }
        })
    }

    //固定金额
    function sp_rate_2() {
        $scope.$watch("bill_template_feed_back_obj.sp_commission_rate",function (data) {
            if(data != undefined || data != null){
                if(!/^(0|\+?[1-9][0-9]*)$/.test(data)){
                    $scope.temp_error = "服务费比例结算使用正整数";
                }else{
                    if(Number(data) > 100){
                        $scope.temp_error = "服务费结算比例不大于100";
                    }else{
                        $scope.temp_error = "";
                    }
                }
            }else if(data === undefined){
                $scope.temp_error = "服务费比例结算不能为空";
            }
        })
    }
    function pr_bill_time(){
        $scope.$watch("bill_template_feed_back_obj.pr_bill_times",function (data) {
            if(data != undefined || data != null){
                $scope.temp_error = "";
            }else if(data === undefined){
                $scope.temp_error = "促销结算周期不能为空";
            }
        })
    }

    function sp_bill_time(){
        $scope.$watch("bill_template_feed_back_obj.sp_bill_times",function (data) {
            if(data != undefined || data != null){
                $scope.temp_error = "";
            }else if(data === undefined){
                $scope.temp_error = "服务费结算周期不能为空";
            }
        })
    }
    function pe_bill_time(){
        $scope.$watch("bill_template_feed_back_obj.pe_bill_times",function (data) {
            if(data != undefined || data != null){
                $scope.temp_error = "";
            }else if(data === undefined){
                $scope.temp_error = "官费结算周期不能为空";
            }
        })
    }
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
