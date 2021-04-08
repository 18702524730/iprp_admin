angular.module('iprpAdminApp').controller('KeeperManagerCtrl',function($scope,$modal,keerperReport,$stateParams,$location,Upload,$state){
    $('#keerper_admin_list').addClass("selected").parent().siblings().children().removeClass("selected");
    $scope.choose = false;
    //获取传过来的id
    keerberbj();
    function keerberbj() {
        $scope.number = $stateParams.keeper_id;
        //订单详情
        $scope.obj = {};
        keerperReport.detail({reportId:$stateParams.keeper_id},function(data){
            $scope.obj = data;
            //上传按钮判断
            $scope.upfile = data.state;
            if($scope.obj.contactState){
                $scope.obj.contactState = $scope.obj.contactState.toString();
            }
            $scope.obj.state = $scope.obj.state.toString();
        },function(error){
            alert(error.data.msg);
        });
    };
    //设置布尔值,用以判断是否跳转弹框（暂时无用）
    var bool = false;
    $scope.chooseState = function(state){
        if(state==$scope.upfile){
            bool = true;
        }else{
            bool = false;
        }
    };
    $scope.keerper_form = function(){
        var data = {
             "id":$scope.obj.id,
             "state":$scope.obj.state,//报告状态
             "contactState":$scope.obj.contactState,//联系状态
             "url":$scope.passData.url[0]
        };
        //只有报告状态为4的时候才有弹框
        if($scope.obj.state == 4){
            $modal.open({
                resolve:{
                    data : function(){
                        return data;
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\keerper\\keerper_file.html',
                windowClass:'elements',
                controller: 'keerperFileCtrl'
              }).result.then(function (result) {
                //跳转回列表页
                $state.go('main.fast_home.keeper_list');
              });
        }else{
            keerperReport.note(data,function(data){
                //跳转回列表页
                $state.go('main.fast_home.keeper_list');
            },function(error){
                alert(error.data.msg);
            });
        }      
    };
    /**
     * 上传文件
     */
    $scope.passData={
        url:[]
    };
    $scope.successfile = false;
    $scope.uploadFile = function (file) {
        var filetype = file.type.split("/");
        var MAX_POST_SIZE = 10 * 1024 * 1024;
        if(file.size > MAX_POST_SIZE){
            alert("上传的文件请小于10M");
        }else if(filetype[1] != "pdf"){
            alert("请上传pdf格式文件");
        }else{
            Upload.upload({
                url: options.api.base_url + '/file/upload',
                data: {Filedata: file}
            }).then(function (resp) {
                resp = resp.data;
                //url初始化
                $scope.passData.url = [];
                if(resp.url != undefined){
                    $scope.passData.url.push(resp.url);
                    $scope.successfile = true;
                    // alert("上传文件成功！")
                }
            }, function (resp) {
                resp = resp.data;
            });
        }
    };
    //下载文件
    $scope.downFile = function(url){
        keerperReport.downfile({url:url});
    }
});

