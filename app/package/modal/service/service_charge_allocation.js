angular.module('iprpAdminApp').controller('ServiceChargeAllocationCtrl', function ($scope,bill_template_id,bs_id,bill_feed_back_id,BillTemplateFeedService,$location) {

    /**
     * 阶段配置详情
     */
    BillTemplateFeedService.bill_tpl_feed.detail_feed_template({
        bill_template_feedback_id : bill_feed_back_id,
        template_id:bill_template_id,
        bs_id:bs_id
    },function(data){
        $scope.feed_template_detail = data;
    },function(error){
        alert(error.data.msg);
    })

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
            $scope.feed_template_detail.sp_commission_rate = 0;
        }
    }

    //编辑模板
    $scope.bill_temp_error = "";
    $scope.editBillTpl = function(){
        if($scope.feed_template_detail.prCommissionType === 1 || $scope.feed_template_detail.prCommissionType === '1'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.feed_template_detail.prCommissionRate))){
                pr_rate_1();
                return;
            }
        }else if($scope.feed_template_detail.prCommissionType === 2 || $scope.feed_template_detail.prCommissionType === '2'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.feed_template_detail.prCommissionRate))
                || (Number($scope.feed_template_detail.prCommissionRate) > 100)){
                pr_rate_2();
                return;
            }
        }
        if(($scope.feed_template_detail.prBillTimeType === 2 || $scope.feed_template_detail.prBillTimeType === '2')
            || ($scope.feed_template_detail.prBillTimeType === 3 || $scope.feed_template_detail.prBillTimeType === '3')){
            if(!$scope.feed_template_detail.prBillTimes){
                pr_bill_time();
                return;
            }
        }
        if($scope.feed_template_detail.sp_commission_type === '1'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.feed_template_detail.sp_commission_rate))){
                sp_rate_1();
                return;
            }
        }else if($scope.feed_template_detail.sp_commission_type === '2'){
            if(!/^(0|\+?[1-9][0-9]*)$/.test(Number($scope.feed_template_detail.sp_commission_rate))
                || (Number($scope.feed_template_detail.sp_commission_rate) > 100)){
                sp_rate_2();
                return;
            }
        }
        if($scope.feed_template_detail.sp_bill_time_type === '2' || $scope.feed_template_detail.sp_bill_time_type === '3'){
            if(!$scope.feed_template_detail.sp_bill_times){
                sp_bill_time();
                return;
            }
        }
        if($scope.feed_template_detail.pe_bill_time_type === '2' || $scope.feed_template_detail.pe_bill_time_type === '3'){
            if(!$scope.feed_template_detail.pe_bill_times){
                pe_bill_time();
                return;
            }
        }
        BillTemplateFeedService.bill_tpl_feed.update_feed_back({},$scope.feed_template_detail,function(data){
                $scope.$close({sp_commission_type:$scope.feed_template_detail.sp_commission_type,
                    sp_commission_rate:$scope.feed_template_detail.sp_commission_rate
                });
            },function(error){
                alert(error.data.msg);
        })
    }

    //促销
    function pr_rate_1(){
        $scope.$watch($scope.feed_template_detail.prCommissionRate,function (data) {
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
    function pr_rate_2(){
        $scope.$watch($scope.feed_template_detail.prCommissionRate,function (data) {
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

    function pr_bill_time(){
        $scope.$watch($scope.feed_template_detail.prBillTimes,function (data) {
            if(data != undefined || data != null){
                $scope.temp_error = "";
            }else if(data === undefined){
                $scope.temp_error = "促销结算周期不能为空";
            }
        })
    }
    //固定金额
    function sp_rate_1() {
        $scope.$watch($scope.feed_template_detail.sp_commission_rate, function (data) {
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
        $scope.$watch($scope.feed_template_detail.sp_commission_rate, function (data) {
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

    function sp_bill_time(){
        $scope.$watch($scope.feed_template_detail.sp_bill_times,function (data) {
            if(data != undefined || data != null){
                $scope.temp_error = "";
            }else if(data === undefined){
                $scope.temp_error = "服务费结算周期不能为空";
            }
        })
    }
    function pe_bill_time(){
        $scope.$watch($scope.feed_template_detail.pe_bill_times,function (data) {
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