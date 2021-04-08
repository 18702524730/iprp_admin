angular.module('iprpAdminApp').controller('EditGoodDetailCtrl',function($scope,$sce,ProductService,$modal,$stateParams,$location){
    $scope.goodInfo_new = {};
    /**
     * 订单详情
     */
    ProductService.good_detail({productPriceId:$stateParams.productPriceId},function(data){
        $scope.goodInfo_new = data;
        $scope.businessIntroduction = data.businessIntroduction;
        $scope.applyProcess = data.applyProcess;
        $scope.commonProblem = data.commonProblem;
    },function(error){
        layer.alert(error.data.msg);
    });

    // 业务编码
    ProductService.businessCodes(function(resp){
        if(resp.code == 'success'){
            $scope.businessCodes = resp.data;
        }else {
            console.error(resp.msg);
        }
    })

    //修改价格-确定
    $scope.sureEditPrice = function(){
        var goodInfo_new = $scope.goodInfo_new;
        if(!$scope.myForm.$valid){
            layer.alert('红色*为必填项，请正确填写，数字最多2位小数');
            return;
        }
        var sp = goodInfo_new.standardPrice - 0;
        var dp = goodInfo_new.depositPrice - 0;
        var yp = goodInfo_new.preferentialPrice - 0;
        if (sp === 0) {
            layer.alert('请设置价格');
            return;
        }
        if (dp > sp) {
            layer.alert('订金不能大于标准价');
            return;
        }
        if (dp != 0 && yp >= dp) {
            layer.alert('订金优惠价只能小于定金价或为0');
            return;
        }
        
        var businessCodes = $scope.businessCodes;
        $.each(businessCodes, function(i, item){
            if (item.code == goodInfo_new.codes) {
                goodInfo_new.codesDescriptions = item.name;
            }
        });

        var ret = {
            introduce: goodInfo_new.introduce,
            productPriceId: goodInfo_new.priceId,
            standardPrice: goodInfo_new.standardPrice,
            depositPrice: goodInfo_new.depositPrice,
            preferentialPrice: goodInfo_new.preferentialPrice,
            codes: goodInfo_new.codes,
            descriptions: $scope.businessIntroduction,
            applyProcess: $scope.applyProcess,
            commonProblem: $scope.commonProblem,
            codesDescriptions: goodInfo_new.codesDescriptions
        }
        console.log($scope.businessIntroduction)
        ProductService.update_good_price(ret, function(resp){
            if(resp.code == 'success'){
                layer.alert('操作成功');
            }else{
                layer.alert(resp.msg);
            }
        });
    }
});

