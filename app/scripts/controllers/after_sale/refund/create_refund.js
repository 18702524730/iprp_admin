angular.module('iprpAdminApp').controller('CreateRefundCtrl',function($scope,$stateParams,RefundService,OrderPaymentService,$location){
    $('#refund_list').siblings().removeClass("selected");
    $('#refund_list').addClass("selected");
    /**
     * 退款详情
     */
    $scope.Refund_Apply_Array = [ ];
    $scope.check_ids = [ ];
    $scope.checked_ids = "";
    $scope.is_checked = false;
    RefundService.refundDetail({
        refund_id:$stateParams.refund_id
    },function(data){
        $scope.refund_detail = data;
        if($scope.refund_detail != undefined){
            angular.forEach($scope.refund_detail.orderPayDTOs,function(data){
                $scope.checked_ids += "," + data.id + ',';
            });
            angular.forEach($scope.refund_detail.refundChildDTOs,function(data){
                if($scope.checked_ids.indexOf(","+ data.order_pay_id + ",") != -1){
                    $scope.check_ids.push(data.order_pay_id);
                    $scope.is_checked = true;
                    get_order_pay_detail('push',data,data.order_pay_id);
                }
            })
        }
    },function(error){
        alert(error.data.msg);
    });

    //平台或服务商承担
    $scope.child_responsibility = function(ind,index){
        if(ind[index].refund_child_responsibility === 0){
            ind[index].refund_child_responsibility = 1;
        }else{
            ind[index].refund_child_responsibility = 0;
        }
    };

    /**
     * 勾选支付单生成退款单
     * @param ind
     * @param index
     */
    $scope.refund_apply_obj = { };
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
    function get_order_pay_detail(msg,ind,order_pay_id){
        OrderPaymentService.detail({
            order_pay_id:order_pay_id
        },function(data){
            $scope.order_pay_detail = data;
            if($scope.order_pay_detail != undefined){
                if(msg === 'push'){
                    $scope.refund_apply_obj.order_pay_id = $scope.order_pay_detail.id;
                    $scope.refund_apply_obj.payment_sn = $scope.order_pay_detail.payment_sn;
                    $scope.refund_apply_obj.payment_pe_amount = $scope.order_pay_detail.payment_pe_amount;
                    $scope.refund_apply_obj.payment_sp_amount = $scope.order_pay_detail.payment_sp_amount;
                    $scope.refund_apply_obj.refund_child_real_pe_amount = $scope.order_pay_detail.refund_child_real_pe_amount;
                    $scope.refund_apply_obj.refund_child_real_sp_amount = $scope.order_pay_detail.refund_child_real_sp_amount;
                    $scope.refund_apply_obj.payment_description = $scope.order_pay_detail.payment_description;
                    $scope.refund_apply_obj.refund_child_responsibility = 0;
                    $scope.Refund_Apply_Array.push($scope.refund_apply_obj);
                }else{
                    $scope.Refund_Apply_Array.splice(ind,1);
                }
            }
        },function(error){
            alert(error.data.msg);
        })
    }


    /**
     * 是否退款并关闭订单
     */
    $scope.is_close_order = function(msg){
        if(msg === 0){
            $scope.refund_detail.orderDTO.order_closed = 1;
            $scope.is_checked = false;
        }else{
            $scope.refund_detail.orderDTO.order_closed = 0;
            $scope.is_checked = false;
        }
    };
    /**
     * 退费金额(官费)
     * @param ind
     */
    $scope.pe_amount = function(ind,index){
        if(null != ind[index].refund_child_real_pe_amount && "" != ind[index].refund_child_real_pe_amount && undefined != ind[index].refund_child_real_pe_amount){
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
        if(null != ind[index].refund_child_real_sp_amount && "" != ind[index].refund_child_real_sp_amount && undefined != ind[index].refund_child_real_sp_amount){
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
     * 创建退款
     */
    var pe_flag;
    var sp_flag;
    $scope.create_refund = function(){
        if($scope.Refund_Apply_Array.length > 0){
            save_add_refund();
        }else{
            $scope.payment_error_manage = "请选择支付单!!";
        }
    }
    function save_add_refund(){
        angular.forEach($scope.Refund_Apply_Array,function(data){
            if(null != data.refund_child_real_pe_amount && "" != data.refund_child_real_pe_amount && undefined != data.refund_child_real_pe_amount){
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
            if(null != data.refund_child_real_sp_amount && "" != data.refund_child_real_sp_amount && undefined != data.refund_child_real_sp_amount){
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
            if(!$scope.refund_detail.return_message){
                $scope.create_refund_form.submitted = true;
            }else{
                if($scope.refund_detail.orderDTO.order_closed === 1){
                    $scope.refund_detail.order_is_close = 1;
                }else{
                    $scope.refund_detail.order_is_close = 0;
                }
                $scope.refund_detail.audit_state = 1;
                $scope.refund_detail.state = 1;
                $scope.refund_detail.refundChildDTOs = $scope.Refund_Apply_Array;
                //记录退款操作日志
                $scope.refund_detail.content = "审核成功并创建退款，原因：" + $scope.refund_detail.audit_message;
                RefundService.refundAdd({},$scope.refund_detail,function(data){
                    $location.path("/main/trade_home/refund_list");
                },function(error){
                    alert(error.data.msg);
                })
            }
        }
    }
});