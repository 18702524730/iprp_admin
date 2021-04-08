angular.module('iprpAdminApp').controller('AddBusinessFeedBackCtrl', function ($scope,$modal,$stateParams,BusinessesService,BusinessFeedBackService,$location) {
    $('#business_list').siblings().removeClass("selected");
    $('#business_list').addClass("selected");

    /***
     * 获取详情
     */
    init_detail();
    function init_detail(){
        BusinessesService.detail_businessService({bs_id:$stateParams.bs_id},function(data){
            $scope.businessService_detail = data;
        },function(error){
            alert(error.data.msg)
        });
    };
    //创建一个模板空对象
    $scope.initBusinessFeedBack ={ };

    info_business_feed_back();
    function info_business_feed_back(){
        BusinessFeedBackService.BusinessFeedBack({
            "pg_index":0,
            "pg_count":999,
            "bs_id":$stateParams.bs_id
        },{},function(data){
            $scope.business_feed = data;
        },function(error){
            alert(error.data.msg);
        })
    }
    /**
     * 添加服务阶段配置
     */
    $scope.addBusinessFeedBack = function(){
        if(!$scope.initBusinessFeedBack.name || !/^[A-Za-z\u4e00-\u9fa5]{2,50}$/.test($scope.initBusinessFeedBack.name)){
            alert("阶段不能为空,只支持中英文，长度不能超过2~50字符");
            return;
        }
        if(!$scope.initBusinessFeedBack.code || !/^[a-zA-Z_]{2,30}$/.test($scope.initBusinessFeedBack.code)){
            alert("阶段编码只能为字母和下划线，长度不能超过2~30字符");
            return;
        }
        $scope.initBusinessFeedBack.bs_id = $stateParams.bs_id;
        BusinessFeedBackService.add_BusinessFeedBack({},$scope.initBusinessFeedBack,function(data){
            $scope.initBusinessFeedBack ={ };
            info_business_feed_back();
        },function(error){
            alert(error.data.msg);
        })
    };
    /**
     * 编辑服务
     * @param bs_id
     */
    $scope.edit_business = function(bs_id){
        localStorage.setItem("temp_bs_id", bs_id);
        $modal.open({
            resolve:{
                bs_id : function(){
                    return bs_id;
                }
            },
            templateUrl: 'package\\modal\\business\\business_edit.html',
            controller: 'BusinessEditCtrl'
        }).result.then(function (result) {
            init_detail();
        });
    }

    var original = "";
    //获取焦点
    $scope.focus = function(mag){
        original = mag;
    }
    $scope.temp_business_feedback_obj = {};
    $scope.blur = function (tem_obj,obj,ind,str) {
        if("name" === str){
            if (tem_obj === "") {
                alert("此项不能为空");
                obj[ind].name = original;
                return;
            }
            if (!/^[A-Za-z\u4e00-\u9fa5]+$/.test(tem_obj)) {
                alert("阶段只支持中英文");
                obj[ind].name = original;
                return;
            }
            if(tem_obj.length > 20){
                alert("阶段名字长度不能超过40字");
                obj[ind].name = original;
                return;
            }
            if (tem_obj != original) {
                obj[ind].name = tem_obj;
                $scope.temp_business_feedback_obj.bs_feedback_id = obj[ind].bs_feedback_id;
                $scope.temp_business_feedback_obj.name = obj[ind].name;
                BusinessFeedBackService.edit_BusinessFeedBack({bs_feedback_id:obj[ind].bs_feedback_id},$scope.temp_business_feedback_obj,function(data){
                    init_detail();
                },function(error){
                    alert(error.data.msg);
                })
            }
        }else{
            if (tem_obj === "") {
                alert("阶段编码不能为空");
                obj[ind].code = original;
                return;
            }
            if(tem_obj.length > 30){
                alert("阶段编码长度不能超过30字");
                obj[ind].code = original;
                return;
            }
            if (!/^[a-zA-Z_]+$/.test(tem_obj)) {
                alert("阶段编码只能为字母和下划线");
                obj[ind].name = original;
                return;
            }
            if (tem_obj != original) {
                obj[ind].code = tem_obj;
                $scope.temp_business_feedback_obj.bs_feedback_id = obj[ind].bs_feedback_id;
                $scope.temp_business_feedback_obj.code = obj[ind].code;
                BusinessFeedBackService.edit_BusinessFeedBack({bs_feedback_id:obj[ind].bs_feedback_id},$scope.temp_business_feedback_obj,function(data){
                    init_detail();
                },function(error){
                    alert(error.data.msg);
                })
            }
        }
    }


    /***
     * 删除服务阶段配置
     * @param bs_feedback_id
     */
    $scope.bs_feedback_ids = [];
    $scope.deleteBusinessFeedBack = function(bs_feedback_id){
        $scope.bs_feedback_ids.push(bs_feedback_id);
        if(window.confirm("您确定删除吗?")) {
            BusinessFeedBackService.deleteBatch({bs_feedback_ids :$scope.bs_feedback_ids },{},function(data){
                $scope.bs_feedback_ids = [];
                info_business_feed_back();
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});

