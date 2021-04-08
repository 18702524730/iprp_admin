angular.module('iprpAdminApp') .controller('BackFillExpressCtrl', function ($scope,InvoiceService,AreaService,orderService,$stateParams,PaginationService,ExpressService,$location) {
    $('#unopen_list').siblings().removeClass("selected");
    $('#unopen_list').addClass("selected");
    //详情
    InvoiceService.invoice.detail({invoice_id : $stateParams.invoice_id},function(date){
        $scope.invoice_detail = date;
    },function(error){
        alert(error.data.msg);
    });
    //查询所有快递公司
    ExpressService.express_all.all(function(data){
        $scope.expressAll = data;
    },function(error){
        alert(error.data.msg);
    });
    //填写物流信息
    $scope.save = function(invoice_id,invoice_sn){
        if(!$scope.invoice_detail.express_id || !$scope.invoice_detail.express_number || !$scope.invoice_detail.express_message){
            $scope.invoice_form.submitted = true;
        }else{
            for(var i in $scope.expressAll.elements){
                if($scope.invoice_detail.express_id === $scope.expressAll.elements[i].express_id){
                    $scope.invoice_detail.express_name = $scope.expressAll.elements[i].name;
                }
            }
            InvoiceService.backfill_express.update({invoice_id:$stateParams.invoice_id},$scope.invoice_detail,function(date){
                $location.path('/main/finance_home/open_list')
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});