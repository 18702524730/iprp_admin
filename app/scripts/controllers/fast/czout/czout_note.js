angular.module('iprpAdminApp').controller('CzoutNoteCtrl',function(czOutList,$scope,$modal,ChannelBsService,$stateParams,$location,$state){
    $('#admin_list').addClass("selected").parent().siblings().children().removeClass("selected");
    $scope.choose = false;
    //订单详情
    search();
    function search(){
        czOutList.detail({orderSn:$stateParams.cz_order_sn},function(data){
            console.log(data)
            $scope.note = data.data;
            //判断是否可以上传
            $scope.upstate = data.data.issueStatus;
            if($scope.note.contactStatus){
                $scope.note.contactStatus = $scope.note.contactStatus.toString();
            }
            if($scope.note.issueStatus){
                $scope.note.issueStatus = $scope.note.issueStatus.toString();
            }
        },function(error){
            alert(error.data.msg);
        });
    }
    $scope.chooseState = function(){
        if($scope.apply_state ||　$scope.cz_state){
            $scope.choose = true;
        }else{
            $scope.choose = false;
        } 
    } 
    $scope.cz_form = function(){
        var data = {
            "id":$scope.note.id,
            "contactStatus":$scope.note.contactStatus,
            "issueStatus":$scope.note.issueStatus,
            "memo":$scope.textarea
        };
        if($scope.note.issueStatus>1){
            $modal.open({
                resolve:{
                    data : function(){
                        return data;
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\cz_editor\\cz_editor.html',
                windowClass:'elements',
                controller: 'czEditorCtrl'
              }).result.then(function (result) {
                //跳转回列表页
                $state.go('main.fast_home.czout_list');
              });
        }else{
             czOutList.note(data,function(data){
                //跳转回列表页
                $state.go('main.fast_home.czout_list');
            },function(error){
                alert(error.data.msg);
            });
        }
        
    }
});

