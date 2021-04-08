angular.module('iprpAdminApp').controller('PartnerAfterSaleDetailCtrl',function($scope,$modal,RefundService,$stateParams,$location){
    $('#partner_list').siblings().removeClass("selected");
    $('#partner_list').addClass("selected");
    detail();
   function detail() {
        RefundService.refundDetail({refund_id: $stateParams.id}, function (data) {
            $scope.refund_detail = data;
            //console.log($scope.refund_detail.refund_images);
            //console.log($scope.refund_detail);
        }, function (error) {
            alert(error.data.msg);
        })
    }
    /**
     * 退款通过并创建退款
     */
    $scope.auditFun = function(){
        $location.path("/main/trade_home/create_refund/" + $stateParams.refund_id);
    };

    //查看退款原因
    $scope.setAfterStatus = function(item){
        $modal.open({
            resolve:{
                itemData : function(){
                    return item;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bs_order\\refund_setAfterStatus.html',
            controller: 'refundReasonCtrl',
            scope: $scope,
        }).result.then(function (result) {

        });
    }

    //查看订单详情
    $scope.orderDetail = function(order_sn){
        $location.path('/main/trade_home/bs_order_detail/' + order_sn);
    };

    //上传图片放大查看
    $scope.seeLgImg = function(img){
        window.open(img,"_blank");
        /*$modal.open({
            resolve:{
                itemData : function(){
                    return img;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bs_order\\refund_lgImg.html',
            controller: 'refundLgImgCtrl',
            scope: $scope,
        }).result.then(function (result) {

        });*/
    }



    /**
     * 驳回(审核失败)
     */
   $scope.refund_check_reject = function(){
        if(!$scope.refund_detail.audit_message){
            $scope.refund_check_form.submitted = true;
        }else{
            $scope.refund_detail.audit_state = 2;
            //记录退款操作日志
            $scope.refund_detail.content = "审核失败，原因：" + $scope.refund_detail.audit_message;
            RefundService.refundAudit({refund_id : $stateParams.refund_id},$scope.refund_detail,function(data){
                $location.path("/main/trade_home/refund_list");
            },function(error){
                alert(error.data.msg);
            })
        }
   };
});

