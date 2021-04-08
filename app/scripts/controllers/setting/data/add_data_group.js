angular.module('iprpAdminApp').controller('AddDataGroupCtrl', function ($scope,DateGroupService,BusinessClassService,BusinessService,$location) {
    $('#admin_list').siblings().removeClass("selected");
    $('#admin_list').addClass("selected");

    //获取全部服务分类
    BusinessClassService.business_class(function(data){
        $scope.business_class_all = data;
    },function(error){
        alert(error.data.msg);
    });

    //展开/合并
    $scope.Unfold=function(item, index,$event,flag1,flag2){
        var parent = item[index];
        var jq = angular.element($event.target);
        if(flag1){
            flag1 = false;
            flag2 = false;
            item[index].isOpenFirst = false;
            jq.css("display","none");
            jq.parent().siblings().children().css("display","block");
        }else{
            flag1 = true;
            item[index].isOpenFirst = true;
            jq.parent().siblings().children().css("display","block");
            jq.css("display","none");
        }
    };

    $scope.ChildUnfold=function(params,index,$event,flag1,flag2){
        var second=params;
        var jq = angular.element($event.target);
        if(flag2){
            flag2 = false;
            params.isOpenSecond = false;
            jq.css("display","none");
            jq.parent().siblings().children().css("display","block");
        }else{
            flag2 = true;
            params.isOpenSecond = true;
            jq.parent().siblings().children().css("display","block");
            jq.css("display","none");
        }
    };

    /**
     * 提交
     * @type {Array}
     */
    $scope.stay_checked = [];//待选中变量集合
    $scope.stay_delete_checked = [];//待删除变量集合
    $scope.allId = [];//选中的全部
    $scope.compare_checked = [];//比较选中的，全选按钮
    $scope.checkall = false;
    $scope.add_dataGroup_obj = { };
    $scope.submit=function(){
        if(!$scope.add_dataGroup_obj.name || $scope.allId.length === 0){
            $scope.AddDataGroupForm.submitted = true;
            if($scope.allId.length === 0){
                $scope.is_service_show = true;
            }else{
                $scope.is_service_show = false;
            }
        }else{
            $scope.add_dataGroup_obj.limits = $scope.allId;
            DateGroupService.add_data_group({},$scope.add_dataGroup_obj,function(data){
                $scope.stay_checked = [];
                $scope.stay_delete_checked = [];
                $scope.allId = [];
                $location.path('/main/setting_home/data_group_list')
            },function(err){
                alert(err.data.msg);
            });
        }
    };

    //一级
    $scope.sChooseFirst = function(business_all,business,index){
        init_business_service(business.bs_class_id);
    };
    //二级
    $scope.sChooseSecond = function(business,business_all,index){
        init_business_service(business.bs_class_id);
    };
    //三级
    $scope.sChooseThree = function(business,business_all,index){
        init_business_service(business.bs_class_id);
    };

    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "没有符合条件的记录";//加载页面内容
    function init_business_service(bs_class_id){
        $scope.checkall = false;
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        BusinessService.list({
            "pg_index" : 0,
            "pg_count": 999,
            bs_class_id : bs_class_id
        },function(data){
            $scope.business_service = [];
            $scope.stay_delete_checked = [];
            $scope.stay_checked = [];
            $scope.compare_checked = [];
            if (data.elements.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.business_service = data.elements;
            //待选中
            data.elements.forEach(function(obj){
                $scope.stay_checked.push(obj.bs_id);
            });
            //选中后删除的
            data.elements.forEach(function(obj){
                $scope.stay_delete_checked.push(obj.bs_id);
            });
            //选中的全选按钮就全选
            if($scope.allId.length > 0){
                angular.forEach($scope.allId,function(data){
                    angular.forEach($scope.stay_checked,function(msg){
                        if(data === msg){
                            $scope.compare_checked.push(data);
                        }
                    })
                });
                if($scope.compare_checked.length === $scope.stay_checked.length){
                    $scope.checkall = true;
                }
            }
            $scope.to_loading = false;
        },function(error){
            alert(error.data.msg)
        })
    }
    //单选
    $scope.sChoose = function(id){
        if($scope.allId.indexOf(id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(id),1);
            $scope.checkall = false;
        }else{
            $scope.allId.push(id);
            $scope.is_service_show = false;
        }
    };

    //全选
    $scope.strArr = { };
    $scope.allChoose = function(){
        $scope.checkall = !$scope.checkall;
        if($scope.checkall){
            $scope.allId = angular.copy($scope.stay_checked);
            //做去重操作(分页会造成数据重复)
            for(var i = $scope.allId.length;i--;){
                $scope.strArr[$scope.allId[i]] = $scope.allId[i];
            }
            $scope.temp_ids = [];
            for(var v in $scope.strArr){
                $scope.temp_ids.push($scope.strArr[v]);
            }
            $scope.allId = $scope.temp_ids;
        }else{
            angular.forEach($scope.stay_delete_checked,function(data){
                $scope.allId.splice($scope.allId.indexOf(data),1);
            });
        }
    };
});