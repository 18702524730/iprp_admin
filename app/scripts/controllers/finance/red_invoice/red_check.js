angular.module('iprpAdminApp')
    .controller('RedCheckCtrl', function ($scope,RedInvoiceService,$stateParams,orderService,$location) {
        $('#red_check_list').siblings().removeClass("selected");
        $('#red_check_list').addClass("selected");
        $scope.red_obj = { };
        $scope.choiceA = true;
        $scope.turnOn = function(){
            $scope.choiceA = true;
        };
        $scope.turnOff = function(){
            $scope.choiceA = false;
        };
        /**
         * 详情
         */
        RedInvoiceService.invoiceDetail({invoice_id : $stateParams.invoice_id},function(data){
            $scope.invoice_detail = data;
            if($scope.invoice_detail.invoice_amount != null){
                $scope.tax_amount = $scope.invoice_detail.invoice_amount * 0.06;
            }
            if($scope.invoice_detail.order_id != null){
                get_invoice_order($scope.invoice_detail.order_id);
            }
        },function(error){
            alert(error.data.msg);
        });

        function get_invoice_order(order_id){
            orderService.orderDetail({order_id:order_id},{},function(data){
                $scope.order_detail = data;
            },function(error){
                alert(error.data.msg)
            })
        }
        /**
         * 审核
         */
        $scope.save = function(invoice_id,invoice_sn){
            if(!$scope.red_obj.audit_message){
                $scope.invoice_form.submitted = true;
            }else{
                if($scope.choiceA === true){
                    $scope.red_obj.audit_state = 1;
                }else if($scope.choiceA === false){
                    $scope.red_obj.audit_state = 2;
                }
                $scope.red_obj.invoice_sn = invoice_sn;
                RedInvoiceService.red_invoice_check({invoice_id:$stateParams.invoice_id},$scope.red_obj,function(data){
                    $location.path('/main/finance_home/red_check_list')
                },function(error){
                    alert(error.data.msg)
                })
            }
        }
});