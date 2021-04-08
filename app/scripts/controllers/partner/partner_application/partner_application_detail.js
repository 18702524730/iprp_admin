
angular.module('iprpAdminApp').controller('PartnerApplicationDetailCtrl', function ($scope,$modal,$stateParams, ChannelApplicationService) {
    $('#partner_application').siblings().removeClass("selected");
    $('#partner_application').addClass("selected");
		setTimeout(function(){
			init_label_data();
		},0)
      //上传图片

    $scope.sellerApplicationDetail = {}
    $scope.partner_id = $stateParams.partner_id
    // 初始化数据
    // 初始化数据
    function init_label_data(){
      console.log('parterid', $scope.partner_id)
      ChannelApplicationService.seller_detail({id: $stateParams.partner_id}, function(data){
        $scope.audit_data = data;
        console.log(data)
      }, function(error){
        alert(error.data.msg);
      })
    }

  });

