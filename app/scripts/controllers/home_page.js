angular.module('iprpAdminApp')
    .controller('HomePageCtrl', function ($scope,MemberStatisticsService,$http,session,$location,InvoiceStatisticsService,TradeStatisticsService) {
        //点击改变左边的class
        $scope.select=function($event){
            var jq = angular.element($event.target);
            jq.addClass("selected");
            jq.parent().siblings().children().removeClass("selected");
        };
        $scope.showobj={}
        // 根据订单模块显示内容
        if(session.order_list_show === false){
            $scope.showobj.order_list_show = true
        }
        
        //会员
        $scope.member = function($event){
            var bt = angular.element($event.target);
            if(session.member_list_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.member_list_show === false){}
                bt.context.href = "#/main/user_home/user_list";
                
        };
        //集团会员
        $scope.memberApplication = function($event){
            var bt = angular.element($event.target);
            if(session.memberApplication_list_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.memberApplication_list_show === false)
                bt.context.href = "#/main/user_home/apply_user_list";
                
        };
        //发票权限
        $scope.unopen_btn = function($event){
            var bt = angular.element($event.target);
            if(session.unopen_invoice_list_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.unopen_invoice_list_show === false)
                bt.context.href = "#/main/finance_home/unopen_list";
        };
        //服务
        $scope.business = function($event){
            var bt = angular.element($event.target);
            if(session.business_list_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.business_list_show === false)
                bt.context.href = "#/main/business_home/business_list";
        };
        //商家
        $scope.Service = function($event){
            var bt = angular.element($event.target)
            if(session.servicer_list_show === true){
                bt.context.href = "JavaScript:void(0);";
            }else if(session.servicer_list_show === false){
                bt.context.href = "#/main/merchant_home/merchantList";
            }
        };
        //渠道商
        $scope.channel = function($event){
            var bt = angular.element($event.target);
            if(session.channel_list_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.channel_list_show === false)
                bt.context.href = "#/main/channel_home/channel_list";
        };
        //订单
        $scope.order = function($event){
            var bt = angular.element($event.target);
            if(session.order_list_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.order_list_show === false)
                bt.context.href = "#/main/trade_home/order_list";
        };
        //退款
        $scope.refund = function($event){
            var bt = angular.element($event.target);
            if(session.refund_list_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.refund_list_show === false)
                bt.context.href = "#/main/after_sale_home/refund_list";
        };

        //发票今日新增
        $scope.today_invoice = function($event){
           var bt = angular.element($event.target);
            if(session.invoice_manage_show === true)
                bt.context.href = "JavaScript:void(0);";
            if(session.invoice_manage_show === false)
                bt.context.href = "#/main/finance_home/unopen_list";
        };
        //红冲发票待开
        $scope.red_unopen_btn = function($event){
            var bt = angular.element($event.target);
            if(session.red_unopen_invoice_list_show === true){
                bt.context.href = "JavaScript:void(0);";
            }else if(session.red_unopen_invoice_list_show === false){
                bt.context.href = "#/main/finance_home/red_open_list";
            }
        };
        //红冲发票申请
        $scope.red_check_btn = function($event){
            var bt = angular.element($event.target);
            if(session.red_invoice_check_list_show === true){
                bt.context.href = "JavaScript:void(0);";
            }else if(session.red_invoice_check_list_show === false){
                bt.context.href = "#/main/finance_home/red_open_list";
            }
        };
        //集团会员统计
        MemberStatisticsService.member_count(function(data){
            $scope.MemberCount = data;
            if($scope.MemberCount[0] != 0){
                $('#userToday').addClass("w25pre high");
            }else{
                $('#userToday').addClass("w25pre normal");
            }
            if($scope.MemberCount[2] != 0){
                $('#userMonth').addClass("w25pre high");
            }else{
                $('#userMonth').addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
        //集团会员统计
        MemberStatisticsService.application_member_count(function(data){
            $scope.ApplicationMemberCount = data;
            if($scope.ApplicationMemberCount[0] != 0){
                $('#applicationToday').addClass("w25pre high");
            }else{
                $("#applicationToday").addClass("w25pre normal");
            }
            if($scope.ApplicationMemberCount[2] != 0){
                $('#applicationMonth').addClass("w25pre high");
            }else{
                $("#applicationMonth").addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
        //服务统计
        TradeStatisticsService.Statistics.businessCount(function(data){
            $scope.business_count = data;
            if($scope.business_count[0] != 0){
                $('#businessToday').addClass("w25pre high");
            }else{
                $("#businessToday").addClass("w25pre normal");
            }
            if($scope.business_count[1] != 0){
                $('#businessMonth').addClass("w25pre high");
            }else{
                $("#businessMonth").addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
        //发票统计
        InvoiceStatisticsService.invoice_count(function(data){
            $scope.invoiceCount = data;
            if($scope.invoiceCount[0] != 0){
                $('#new_add_invoice').addClass("w25pre high");
            }else{
                $("#new_add_invoice").addClass("w25pre normal");
            }
            if($scope.invoiceCount[1] != 0){
                $('#redApply').addClass("w25pre high");
            }else{
                $("#redApply").addClass("w25pre normal");
            }
            if($scope.invoiceCount[2] != 0){
                $('#redUnOpen').addClass("w25pre high");
            }else{
                $("#redUnOpen").addClass("w25pre normal");
            }
            if($scope.invoiceCount[3] != 0){
                $('#unOpen').addClass("w25pre high");
            }else{
                $("#unOpen").addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
        //商家统计
        TradeStatisticsService.Statistics.serviceCount(function(data){
            $scope.servicesCount = data;
            if($scope.servicesCount[0] != 0){
                $('#todayService').addClass("w25pre high");
            }else{
                $("#todayService").addClass("w25pre normal");
            }
            if($scope.servicesCount[1] != 0){
                $('#monthService').addClass("w25pre high");
            }else{
                $("#monthService").addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
        //渠道商统计
        TradeStatisticsService.Statistics.channelCount(function(data){
            $scope.channelCount = data;
            if($scope.channelCount[0] != 0){
                $('#todayChannel').addClass("w25pre high");
            }else{
                $("#todayChannel").addClass("w25pre normal");
            }
            if($scope.channelCount[1] != 0){
                $('#monthChannel').addClass("w25pre high");
            }else{
                $("#monthChannel").addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
        //订单统计
        TradeStatisticsService.Statistics.orderCount(function(data){
            $scope.orderCount = data;
            if($scope.orderCount[0] != 0){
                $('#todayOrder').addClass("w25pre high");
            }else{
                $("#todayOrder").addClass("w25pre normal");
            }
            if($scope.orderCount[1] != 0){
                $('#monthOrder').addClass("w25pre high");
            }else{
                $("#monthOrder").addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
        //退款统计
        TradeStatisticsService.Statistics.refundCount(function(data){
            $scope.refundCount = data;
            if($scope.refundCount[0] != 0){
                $('#todayRefund').addClass("w25pre high");
            }else{
                $("#todayRefund").addClass("w25pre normal");
            }
        },function(error){
            alert(error.data.msg);
        });
});
