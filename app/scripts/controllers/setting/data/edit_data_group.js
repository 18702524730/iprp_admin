angular.module('iprpAdminApp').controller('EditDataGroupCtrl', function ($scope,DateGroupService,BusinessService,$stateParams,$location) {
    $('#admin_list').siblings().removeClass("selected");
    $('#admin_list').addClass("selected");
    /**
     * 获取权限组name
     */
    DateGroupService.data_group_detail({dg_id:$stateParams.dg_id},function(data){
        $scope.detail= data;
    },function(error){
        alert(error.data.msg)
    });
    /**
     * 获取数据权限的处理过详情
     */
    DateGroupService.getDealDataGroup({dg_id:$stateParams.dg_id},function(data){
        $scope.dataGroupDetail = data;
    },function(error){
        alert(error.data.msg);
    })

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
    $scope.edit_dataGroup_obj = { };
    $scope.stay_checked = [];
    $scope.stay_delete_checked = [];
    $scope.compare_checked = [];
    $scope.allId = [];
    $scope.submit=function(){
        if(!$scope.detail.name || $scope.allId.length === 0){
            $scope.EditDataGroupForm.submitted = true;
            if($scope.allId.length === 0){
                $scope.is_service_show = true;
            }else{
                $scope.is_service_show = false;
            }
        }else{
            list_unIp();
            $scope.allId = $scope.temp_ids;
            $scope.detail.limits=$scope.allId;
            DateGroupService.put({dg_id:$stateParams.dg_id},$scope.detail,function(data){
                $scope.edit_dataGroup_obj = { };
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
    $scope.sChooseFirst = function(business){
        init_business_service(business.bs_class_id);
    };
    //二级
    $scope.sChooseSecond = function(business){
        init_business_service(business.bs_class_id);
    };
    //三级
    $scope.sChooseThree = function(business){
        init_business_service(business.bs_class_id);
    };

    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "没有符合条件的记录";//加载页面内容
    function init_business_service(bs_class_id){
        //单选
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
            //遍历已存在的勾选
            angular.forEach($scope.detail.limits,function(data){
                $scope.allId.push(data);
            });
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
                list_unIp();
                $scope.allId = $scope.temp_ids;
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
    $scope.sChoose = function(ind,index){
        if($scope.allId.indexOf(ind[index].bs_id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(ind[index].bs_id),1);
            $scope.detail.limits.splice($scope.detail.limits.indexOf(ind[index].bs_id),1);
            $scope.checkall = false;
        }else{
            $scope.allId.push(ind[index].bs_id);
            //做去重操作(分页会造成数据重复)
            list_unIp();
            $scope.allId = $scope.temp_ids;
            $scope.detail.limits = $scope.allId;
            $scope.is_service_show = false;
        }
    };

    //全选
    $scope.allChoose = function(){
        $scope.checkall = !$scope.checkall;
        if($scope.checkall){
            angular.forEach($scope.stay_checked,function(data){
                $scope.allId.push(data);
                $scope.detail.limits.push(data);
            });
            //做去重操作(分页会造成数据重复)
            list_unIp();
            $scope.allId = $scope.temp_ids;
        }else{
            angular.forEach($scope.stay_delete_checked,function(data){
                $scope.allId.splice($scope.allId.indexOf(data),1);
                angular.forEach($scope.detail.limits,function(msg){
                    if(data === msg){
                        $scope.detail.limits.splice($scope.detail.limits.indexOf(data),1);
                    }
                });
            });
        }
    };

    //做去重操作(分页会造成数据重复)
    function list_unIp(){
        $scope.strArr = { };
        for(var i = $scope.allId.length;i--;){
            $scope.strArr[$scope.allId[i]] = $scope.allId[i];
        }
        $scope.temp_ids = [];
        for(var v in $scope.strArr){
            $scope.temp_ids.push($scope.strArr[v]);
        }
    }
});