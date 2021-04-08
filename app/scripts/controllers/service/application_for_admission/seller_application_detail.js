
angular.module('iprpAdminApp').controller('SellerApplicationDetailCtrl', function ($scope,$modal,$stateParams, SellerApplicationService) {
    $('#seller_application').siblings().removeClass("selected");
    $('#seller_application').addClass("selected");
    init_data();
      //上传图片

    $scope.sellerApplicationDetail = {}
    $scope.seller_id = $stateParams.seller_id
    // 初始化数据
    function init_data () {
        SellerApplicationService.seller_detail({seller_id: $stateParams.seller_id}, function(data){
        $scope.sellerApplicationDetail = data;
      }, function(error){
        alert(error.data.msg);
      })
    }

  });
  