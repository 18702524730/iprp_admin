angular.module('iprpAdminApp').controller('dunhuangDetailCtrl',function($scope,$modal,session,$cookies,orderService,bsOrderService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
    $('#dunhuang_list').addClass("selected").siblings().removeClass("selected");

    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    /**
     * 订单详情
     */
    orderService.dunhuangDetail({orderFuwuId:$stateParams.orderFuwuId},function(data){
        $scope.order_detail = data;
        if (!$scope.order_detail) {
            $scope.loading_text = "没有符合条件的记录";//加载页面内容
        }
        // if($scope.order_detail.fileUrl){
        //     bsOrderService.channelPrevImg({
        //         pdf_url: $scope.order_detail.fileUrl
        //     },function(data){
        //         $scope.firstUrl = data.urls[0];
        //     },function(err){
        //         console.log(err)
        //     })
        // }
    },function(error){
        console.log(error)
        // alert(error.data.msg);
    });
    // $scope.openmodal = function(opensrc){
    //     $modal.open({
    //         resolve:{
    //             ngsrc : function(){
    //                 return opensrc;
    //             }
    //         },
    //         templateUrl: 'package\\modal\\bs_order\\imgprev.html',
    //         controller: 'imgprevControl'
    //     }).result.then(function (result) {
            
    //     })
    // };
    // $scope.changeimg = function(url){
    //     bsOrderService.channelPrevImg({
    //         pdf_url: url
    //     },function(data){
    //         var urls = data.urls;
    //         $scope.openmodal(urls)
    //         console.log(data)
    //     },function(err){
    //         console.log(err)
    //     })
    // }
    // $scope.prevImg = function(src){
    //     $scope.changeimg(src)
    // }
    $scope.setState = function(order_detail){
        $modal.open({
            resolve:{
                order_detail : function(){
                    return order_detail;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bs_order\\set_state.html',
            controller: 'setStateCtrl'
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
});

