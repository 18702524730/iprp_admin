angular.module('iprpAdminApp').controller('PartnerCashDetailCtrl', function ($cookies,$scope,$modal,$stateParams, PartnerService, PaginationService, $location, Upload) {
    $('#partner_cash').siblings().removeClass("selected");
    $('#partner_cash').addClass("selected");

    // 提现详情
    $scope.audit_data = {};
    // 分页数据
    $scope.pagination = {};

    // 查询提现详情
    function getCashDetailFn () {
      PartnerService.findWithdrawAuditDetail({id: $stateParams.id}, function(data){
        $scope.audit_data = data;
        findSubPartnerListFn(data.memberSn);
      });
    }
    getCashDetailFn();  //查询提现详情

    // 查询下级合伙人列表
    function findSubPartnerListFn (sn){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function(pg_index,pg_count,cb){
        var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count, memberSn: sn, id: $stateParams.id});
        PartnerService.findWithdrawAuditDetailRecordList(params,cb);
      };
      $scope.pagination = new PaginationService(OweNer,15, 1);

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

    // 审核
    $scope.checkFn = function(type) {
      var data = {
        id: $stateParams.id,
        withdrawState: type,
        remark: ''
      }
      PartnerService.auditWithdrawDetail(data);
    };

    // 审核弹窗
    $scope.checkFn = function(id){
      $modal.open({
          resolve:{
            id : function(){
                return $stateParams.id;
            }
          },
          templateUrl: 'package\\modal\\partner\\check.html',
          controller: 'partnerCheckCtrl'
      }).result.then(function (result) {
          getCashDetailFn();  //查询提现详情
      });
    };
	  

  });

