angular.module('iprpAdminApp').controller('EditServicer', function ($scope,itemD,MemberService,$location) {

    $scope.itemD = itemD;

    //客服列表
    MemberService.linkman({
        "pg_index":0,
        "pg_count":999
    },function(data){
        $scope.linkman_list = data;
    });

    /**
     * 审核
     */
    $scope.error = "";

    $scope.save = function(){
        if(!$scope.itemD.linkman_name){
            $scope.error = "请选择客服联系人";
            return;
        }else{
            MemberService.update({
                member_id:itemD.member_id
            },{
                memberLinkman:$scope.itemD.linkman_name,
                memberLinkmanMemo:$scope.itemD.memo
            },function(date){
                $scope.$close({});
            },function(error){
                alert(error.data.msg);
            })
        }
    };

    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});