angular.module('iprpAdminApp').controller('AddBadServicerManageCtrl',function($scope,$stateParams,$modal,BadServicerService,$location){
    $('#bad_servicer_list').siblings().removeClass("selected");
    $('#bad_servicer_list').addClass("selected");
    info_bad_service();
    function info_bad_service(){
        BadServicerService.searchBadService({
            sp_id : $stateParams.sp_id
        },function(data){
            if (data.serviceProvider === undefined)
                return;
            if (data.serviceProvider === null){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.badBs_detail = data;
            $scope.to_loading = false;//如果不为空 结束加载页面
        },function(error){
            alert(error.data.msg);
        })
    }
    /**
     * 添加失信服务商
     * @param bs_id
     */
    var badServiceArray = [];
    var badServiceObject = { };
    $scope.break = function(bs_id,bs_class_name,name,is_bad_state,create_time,update_time){
        $modal.open({
            resolve:{
                bs_class_name : function(){
                    return bs_class_name;
                },
                name : function(){
                    return name;
                },
                is_bad_state:function(){
                    return is_bad_state;
                },
                create_time : function(){
                    return create_time;
                },
                update_time : function(){
                    return update_time;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bad_service\\break.html',
            controller: 'BreakCtrl'
        }).result.then(function (result) {
                badServiceObject.bsId = bs_id;
                badServiceObject.spId = $stateParams.sp_id;
                badServiceObject.openTime = result.openTime;
                badServiceArray.push(badServiceObject);
                BadServicerService.addBadService({sp_id : $stateParams.sp_id},badServiceArray,function(data){
                    info_bad_service();
                    badServiceArray = [];
                },function(error){
                    alert(error.data.msg);
                    badServiceArray = [];
                })
            });
    };
    /**
     * 恢复（实际是删除）
     * @param bs_id
     */
    $scope.delete = function(bs_id){
        if(window.confirm("您确定恢复正常吗?")) {
            BadServicerService.badServiceEdit({sp_id: $stateParams.sp_id, bs_id: bs_id}, {}, function (data) {
                info_bad_service();
            }, function (error) {
                alert(error.data.msg);
            })
        }
    };
    /**
     * 返回列表
     */
    $scope.back_list = function(){
        $location.path('/main/merchant_home/bad_servicer_list')
    }
});
