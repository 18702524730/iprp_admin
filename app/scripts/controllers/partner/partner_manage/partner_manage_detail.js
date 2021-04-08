angular.module('iprpAdminApp').controller('PartnerDetailCtrl', function ($cookies,$scope,$modal,$stateParams, PartnerService, PaginationService,$location, Upload) {
    $('#partner_manage').siblings().removeClass("selected");
    $('#partner_manage').addClass("selected");

    // 合伙人详情
    $scope.partnerBaseInfo = {};  //基本信息
    $scope.realNameInfo = {};  //实名信息
    $scope.partnerAsset = {};  //合伙人资产
    $scope.inviteRelation = {};  //邀请关系

    // 初始化查询合伙人详情
    function getTmDetailFn () {
      PartnerService.findPartnerDetail({memberSn: $stateParams.memberSn}, function(data){
        $scope.partnerBaseInfo = data.partnerBaseInfo;
        $scope.realNameInfo = data.realNameInfo;  //实名信息
		    $scope.partnerAsset = data.partnerAsset;  //合伙人资产
		    $scope.inviteRelation = data.inviteRelation;  //邀请关系
      });
    }
    getTmDetailFn();  //初始化查询初始化查询合伙人详情

    // 查询下级合伙人列表
    function findSubPartnerListFn (){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function(pg_index,pg_count,cb){
        var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count, memberSn: $stateParams.memberSn});
        PartnerService.findSubPartnerList(params,cb);
      };
      $scope.pagination = new PaginationService(OweNer,20, 1);

      $scope.$watch('pagination.curPageItems',function(newItems){
        $scope.labelList = [];
        if (newItems == undefined)
            return;
        if ($scope.pagination.curPageItems.length === 0){
            $scope.loading_text = "没有符合条件的记录";//加载页面内容
            return;
        }
        $scope.labelList = newItems;
        $scope.to_loading = false;//如果不为空 结束加载页面
	    });
    }
    findSubPartnerListFn();
    $scope.showInvit = function (id) {
      console.log(location.host)
      var miniAppType = 5;
      if (location.host.indexOf('admin') !== 0) {
        miniAppType = 7;
      }
      PartnerService.showQrCode({memberSn: id, miniAppType: miniAppType}, function (data) {
        if (data.qrCodeUrl){
          layer.open({
            title: '邀请码'
            ,content: '<img style="width: 300px;height: 300px;" src="' + data.qrCodeUrl + '" />'
          });
        }
      })
    }
  });

