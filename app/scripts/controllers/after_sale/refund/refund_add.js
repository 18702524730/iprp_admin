angular.module('iprpAdminApp').controller('RefundAddCtrl',
    function($scope,RefundService,orderService,$stateParams,$location,OrderPaymentService){
        $('#refund_list').siblings().removeClass("selected");
        $('#refund_list').addClass("selected");

        //添加退款
        $scope.refund = {};
        $scope.refund.order_is_close = 0;
        $scope.Refund_Apply_Array = [ ];
        $scope.check_ids = [ ];

       //获取订单信息（order_sn）
        $scope.searchOrder = function(){
            if(!$scope.order_sn){
                $scope.AddRefund_form.submitted = true;
            }else{
                $scope.AddRefund_form.submitted = false;
                if($scope.order_sn != null && $scope.order_sn.length > 0){
                    orderService.orderDetail_sn({order_sn:$scope.order_sn},function(data){
                        $scope.order_detail = data;
                        if($scope.order_detail != null && $scope.order_detail.order_id != null){
                            init_order_payment();
                        }
                    },function(error){
                        alert(error.data.msg);
                    })
                }
            }
        };
        /**
         * 是否退款并关闭订单
         */
        $scope.is_close_order = function(msg){
            if(msg === 0){
                $scope.refund.order_is_close = 1;
            }else{
                $scope.refund.order_is_close = 0;
            }
        };

        $scope.is_checked = function(ind,index){
            if(ind[index].refund_child_responsibility === 0){
                ind[index].refund_child_responsibility = 1;
            }else{
                ind[index].refund_child_responsibility = 0;
            }
        };
        /**
         * 订单支付单
         */
        function init_order_payment(){
            OrderPaymentService.list({
                order_id:$scope.order_detail.order_id,
                pg_index : 0,
                pg_count : 999
            },function(data){
                $scope.order_payment_list = data;
            },function(error){
                alert(error.data.msg);
            });
        }

        /**
         * 退费金额(官费)
         * @param ind
         */
        $scope.pe_amount = function(ind,index){
            if(null != ind[index].refund_child_real_pe_amount &&
                "" != ind[index].refund_child_real_pe_amount && undefined != ind[index].refund_child_real_pe_amount){
                if(!/^[0-9]\d*$/.test(ind[index].refund_child_real_pe_amount)){
                    ind[index].error_manages = "官费只能使用数字";
                }else{
                    if(Number(ind[index].refund_child_real_pe_amount) > Number(ind[index].payment_pe_amount)){
                        ind[index].error_manages = "不能大于可退官费";
                    }else{
                        ind[index].error_manages = "";
                    }
                }
            }else{
                ind[index].error_manages = "官费只不能为空仅是数字";
            }
        };

        /**
         * 退费金额(服务费)
         * @param ind
         */
        $scope.sp_amount = function(ind,index){
            if(null != ind[index].refund_child_real_sp_amount &&
                "" != ind[index].refund_child_real_sp_amount && undefined != ind[index].refund_child_real_sp_amount){
                if(!/^[0-9]\d*$/.test(ind[index].refund_child_real_sp_amount)){
                    ind[index].error_manages = "服务费只能使用数字";
                }else{
                    if(Number(ind[index].refund_child_real_sp_amount) > Number(ind[index].payment_sp_amount)){
                        ind[index].error_manages = "不能大于可退服务费";
                    }else{
                        ind[index].error_manages = "";
                    }
                }
            }else{
                ind[index].error_manages = "服务费只不能为空仅是数字";
            }
        };

        /**
         * 勾选支付单生成退款单
         * @param ind
         * @param index
         */
        $scope.check_payment = function(ind,index,order_pay_id){
            if($scope.check_ids.indexOf(index) !== -1){
                $scope.check_ids.splice($scope.check_ids.indexOf(index),1);
                get_order_pay_detail('splice',ind,order_pay_id);
            }else{
                $scope.check_ids.push(index);
                get_order_pay_detail('push',ind,order_pay_id);
                $scope.payment_error_manage = "";
            }
        };
        $scope.refund_apply_obj = { };
        function get_order_pay_detail(msg,ind,order_pay_id){
            OrderPaymentService.detail({
                order_pay_id:order_pay_id
            },function(data){
                $scope.order_pay_detail = data;
                if($scope.order_pay_detail != undefined){
                    if(msg === 'push'){
                        $scope.refund_apply_obj.order_pay_id = $scope.order_pay_detail.id;
                        $scope.refund_apply_obj.payment_sn = $scope.order_pay_detail.payment_sn;
                        $scope.refund_apply_obj.payment_sn = $scope.order_pay_detail.payment_sn;
                        $scope.refund_apply_obj.payment_pe_amount = $scope.order_pay_detail.payment_pe_amount;
                        $scope.refund_apply_obj.payment_sp_amount = $scope.order_pay_detail.payment_sp_amount;
                        $scope.refund_apply_obj.refund_child_real_pe_amount = $scope.order_pay_detail.refund_child_real_pe_amount;
                        $scope.refund_apply_obj.refund_child_real_sp_amount = $scope.order_pay_detail.refund_child_real_sp_amount;
                        $scope.refund_apply_obj.payment_description = $scope.order_pay_detail.payment_description;
                        $scope.refund_apply_obj.refund_child_responsibility = 0;
                        $scope.Refund_Apply_Array.push($scope.refund_apply_obj);
                        $scope.refund_apply_obj = { };
                    }
                    else{
                        $scope.Refund_Apply_Array.splice(ind,1);
                    }
                }
            },function(error){
                alert(error.data.msg);
            })
        }
        /**
         * 创建退款
         */
        var pe_flag;
        var sp_flag;
        $scope.apply = function(){
            if($scope.Refund_Apply_Array.length > 0){
                save_add_refund();
            }else{
                $scope.payment_error_manage = "请选择支付单!!";
            }
        };
        function save_add_refund(){
            angular.forEach($scope.Refund_Apply_Array,function(data){
                if("" !=data.refund_child_real_pe_amount && null !=data.refund_child_real_pe_amount && undefined != data.refund_child_real_pe_amount){
                    if(/^[0-9]\d*$/.test(data.refund_child_real_pe_amount) && (Number(data.refund_child_real_pe_amount) > Number(data.payment_pe_amount))){
                        data.error_manages = "官费使用数字,不能大于可退官费";
                        pe_flag = true;
                        return;
                    }else{
                        data.error_manages = "";
                        pe_flag = false;
                    }
                }else{
                    data.error_manages = "官费只不能为空并且使用数字";
                    pe_flag = true;
                    return;
                }
                if("" != data.refund_child_real_sp_amount && null != data.refund_child_real_sp_amount && undefined != data.refund_child_real_sp_amount){
                    if(/^[0-9]\d*$/.test(data.refund_child_real_sp_amount) && (Number(data.refund_child_real_sp_amount) > Number(data.payment_sp_amount))){
                        data.error_manages = "服务费使用数字,不能大于可退服务费";
                        sp_flag = true;
                        return;
                    }else{
                        data.error_manages = "";
                        sp_flag = false;
                    }
                }else{
                    data.error_manages = "服务费只不能为空并且使用数字";
                    sp_flag = true;
                    return;
                }
            });
            if(sp_flag === false && pe_flag === false){
                if(!$scope.refund.audit_message){
                    $scope.AddRefund_form.submitted = true;
                }else{
                    $scope.refund.order_sn = $scope.order_detail.order_sn;
                    $scope.refund.bs_code = $scope.order_detail.order_bs[0].bs_code;
                    $scope.refund.refundChildDTOs = $scope.Refund_Apply_Array;
                    $scope.refund.audit_state = 1;
                    $scope.refund.state = 1;
                    RefundService.refundAdd({},$scope.refund,function(data){
                        $location.path('main/trade_home/refund_list')
                    },function(err){
                        alert(err.data.msg);
                    })
                }
            }
        }
});

