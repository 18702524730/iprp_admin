angular.module('iprpAdminApp').controller('CWOrderDetailCtrl',function($scope,$modal,bsOrderService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location,$state){
    $('#channel_work_order').addClass("selected").parent().siblings().children('a').removeClass("selected");
    /**
     * 订单详情
     */
    $scope.setupList = {};
    $scope.voucherUrl= null;
    $scope.imgUrl = null;
    $scope.pdftourl=function(url,type){
        bsOrderService.channelPrevImg({
            pdf_url: url
        },function(data){
               $scope.voucherUrl = data.urls[0]; 
        },function(err){
            console.log(err)
        })
    }
    $scope.pdftourls=function(url){
        bsOrderService.channelPrevImg({
            pdf_url: url
        },function(data){
                $scope.imgUrl = data.urls[0]; 
        },function(err){
            console.log(err)
        })
    }
    $scope.bsDetail = function(){
        bsOrderService.channelWorkOrderDetail({workOrderSn:$stateParams.order_sn},function(data){
            $scope.order_detail = data;
            $scope.auditstate = data.status;
            if(data.inputChannelOrder.voucherUrl){
                $scope.pdftourl(data.inputChannelOrder.voucherUrl)
            }
            if(data.subject.standby1){
                $scope.pdftourls(data.subject.standby1)
            }
             // 获取服务商
            // bsOrderService.setupList({bsId:$scope.order_detail.bs_id},{},function(data){
            //     $scope.setupList = data.elements;
            // });
            if ($scope.order_detail) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
            }
        },function(error){
            alert(error.data.msg);
        });
    };
    
    $scope.bsDetail();
    $scope.prevshow = {};
    $scope.prevshow.show = false;
    $scope.prevshow.src = '';
    $scope.openmodal = function(opensrc){
        $modal.open({
            resolve:{
                ngsrc : function(){
                    return opensrc;
                }
            },
            templateUrl: 'package\\modal\\bs_order\\imgprev.html',
            controller: 'imgprevControl'
        }).result.then(function (result) {
            
        })
    };
    $scope.changeimg = function(url){
        bsOrderService.channelPrevImg({
            pdf_url: url
        },function(data){
            var urls = data.urls;
            // var urls = [
            //     'https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/77E0CA3F7C6B117EE6687DB5ABF24C92.jpg',
            //     "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/A67013EAB141A2EEE28008B1B2B5149D.jpg"
            // ]
            $scope.openmodal(urls)
            console.log(data)
        },function(err){
            console.log(err)
        })
    }
    $scope.preview = function(src){
        $scope.changeimg(src)
        
    }
    
    $scope.auditstatus = {};
    $scope.auditstatus.audit = false;
    $scope.comment = {};
    $scope.comment.memo = '';
    $scope.ispass = {};
    $scope.ispass.step = '';
    $scope.ispass.errmsg = '';
    $scope.auditorder = function(){
        bsOrderService.channelWorkOrderAudit({
            workOrderSn: $stateParams.order_sn,
            memo: $scope.comment.memo,
            step: $scope.ispass.step,
        },function(data){
            alert('操作成功')
            $state.reload()
        },function(err){
            alert(err.data.msg)
        })
    };
    
    $scope.showaudit=function(){
        $modal.open({
            resolve:{
                serviceType : function(){
                    return false;
                }

            },
            templateUrl: 'package\\modal\\bs_order\\orderaudit.html',
            controller: 'CWOrderDetailCtrl'
        }).result.then(function (result) {
            console.log(1111)
        })
    }
    $scope.closeaudit=function(){
        // $('.auditbox').hide()
        $scope.$dismiss("cancel");
        $scope.ispass.errmsg = '';
        $scope.ispass.step = '';
        $scope.comment.memo = ''
    }
    $scope.submitdata=function(){
        if($scope.ispass.step==''){
            $scope.ispass.errmsg = '请选择是否通过'
        }else{
            $scope.auditorder();
            $scope.closeaudit()
        }
        
    }
    
    /**
     * 设置服务状态
     */
    $scope.setServiceState = function(order_detail){
        $modal.open({
            resolve:{
                order_detail : function(){
                    return order_detail;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bs_order\\set_service_state.html',
            controller: 'setServiceStateCtrl'
        }).result.then(function (result) {
            console.log(result);
                /*$scope.order_detail.sp_id = result.sp_id;
                $scope.order_detail.sp_code = result.sp_code;
                $scope.order_detail.sp_name = result.sp_name;
                bsOrderService.regainOrAllot({
                    order_id:$stateParams.order_id,
                    is_rebuild_sp:2
                },$scope.order_detail,function(data){
                    $location.path('/main/trade_home/order_list')
                },function(error){
                    alert(error.data.msg);
                })*/
        });
    };
    
    //查看退款原因
    $scope.refund_reason = function(item){
        $modal.open({
            resolve:{
                itemData : function(){
                    return item;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bs_order\\refund_reason.html',
            controller: 'refundReasonCtrl'
        }).result.then(function (result) {
                /*$scope.order_detail.sp_id = result.sp_id;
                $scope.order_detail.sp_code = result.sp_code;
                $scope.order_detail.sp_name = result.sp_name;
                bsOrderService.regainOrAllot({
                    order_id:$stateParams.order_id,
                    is_rebuild_sp:2
                },$scope.order_detail,function(data){
                    $location.path('/main/trade_home/order_list')
                },function(error){
                    alert(error.data.msg);
                })*/
        });
    };
    //设置服务商
    $scope.refund_setup = function(item,setup){
        $modal.open({
            resolve:{
                itemData : function(){
                    return item;
                },
                setup : function(){
                    return setup;
                },
                serviceType : function(){
                    return false;
                }

            },
            templateUrl: 'package\\modal\\bs_order\\setup.html',
            controller: 'SetupCtrl'
        }).result.then(function (result) {
            $scope.bsDetail();
        })
    }
});

