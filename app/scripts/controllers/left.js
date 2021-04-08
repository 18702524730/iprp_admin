angular.module('iprpAdminApp').controller('LeftCtrl', function ($scope,session,$location) {
    $('#nav_dashboard').addClass("link actived");
    //点击改变左边的class
    $scope.select=function($event,message){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        if(message === "setting"){
            if(session.privilege_manage_show === false){
                if(session.admin_list_show === false){
                    $location.path('/main/setting_home/admin_list');
                    return
                }else if(session.gAdminList_show === false){
                    $location.path('/main/setting_home/gadmin_list');
                    return;
                }else if(session.dataList_show === false){
                    $location.path('/main/setting_home/data_group_list')
                    return;
                }
                return;
            }
        }
    };
});
