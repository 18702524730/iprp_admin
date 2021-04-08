angular.module('iprpAdminApp').controller('EditGAdminCtrl', function ($scope,LimitsService,$location,$stateParams,PurviewService) {
    $('#admin_list').siblings().removeClass("selected");
    $('#admin_list').addClass("selected");
    //去掉同级selected
    $('#news_list').removeClass("selected");
    $('#order_set').removeClass("selected");
    $('#payment_list').removeClass("selected");
    $('#express_list').removeClass("selected");
    $('#email_tpl').removeClass("selected");
    $('#log_list').removeClass("selected");
    $scope.is_checked_All=false;
    /**
     * 查看权限组详情
     */
    LimitsService.groups.groupDetail({fg_id:$stateParams.fg_id},function(date){
        $scope.g_admin_detail = date;
    },function(error){
        alert(error.date.msg)
    });
    /**
     * 获取数据全向
     */
    get_purview_detail();
    function get_purview_detail(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        PurviewService.getPurview({fg_id:$stateParams.fg_id},function(newItems){
            if (newItems == undefined)
                return;
            if (newItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.get_purview_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        },function(error){
            alert(error.date.msg);
        });
    }
    //展开/合并
    $scope.Unfold_1=function(item,index,$event,flag_1,flag_1_1){
        var parent = item[index];
        var jq = angular.element($event.target);
        if(flag_1){
            flag_1 = false;
            flag_1_1 = false;
            item[index].isOpenFirst = false;
            jq.css("display","none");
            jq.parent().siblings().children().css("display","block");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst = flag_1;
                item[index].childes[d].isOpenSecond = flag_1_1;
            }
        }else{
            flag_1 = true;
            item[index].isOpenFirst = true;
            jq.parent().siblings().children().css("display","block");
            jq.css("display","none");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst = flag_1;
                item[index].childes[d].isOpenSecond = flag_1_1;
            }
        }
    };
    //展开/合并
    $scope.Unfold_2=function(item,index,$event,flag_2,flag_2_2){
        var parent = item[index];
        var jq = angular.element($event.target);
        if(flag_2){
            flag_2 = false;
            flag_2_2 = false;
            item[index].isOpenFirst_1 = false;
            jq.css("display","none");
            jq.parent().siblings().children().css("display","block");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst_1 = flag_2;
                item[index].childes[d].isOpenSecond_1 = flag_2_2;
            }
        }else{
            flag_2 = true;
            item[index].isOpenFirst_1 = true;
            jq.parent().siblings().children().css("display","block");
            jq.css("display","none");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst_1 = flag_2;
                item[index].childes[d].isOpenSecond_1 = flag_2_2;
            }
        }
    };
    //展开/合并
    $scope.Unfold_3=function(item,index,$event,flag_3,flag_3_3){
        var parent = item[index];
        var jq = angular.element($event.target);
        if(flag_3){
            flag_3 = false;
            flag_3_3 = false;
            item[index].isOpenFirst_2 = false;
            jq.css("display","none");
            jq.parent().siblings().children().css("display","block");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst_2 = flag_3;
                item[index].childes[d].isOpenSecond_2 = flag_3_3;
            }
        }else{
            flag_3 = true;
            item[index].isOpenFirst_2 = true;
            jq.parent().siblings().children().css("display","block");
            jq.css("display","none");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst_2 = flag_3;
                item[index].childes[d].isOpenSecond_2 = flag_3_3;
            }
        }
    };
    //展开/合并
    $scope.Unfold_4=function(item,index,$event,flag_4,flag_4_4){
        var parent = item[index];
        var jq = angular.element($event.target);
        if(flag_4){
            flag_4 = false;
            flag_4_4 = false;
            item[index].isOpenFirst_3 = false;
            jq.css("display","none");
            jq.parent().siblings().children().css("display","block");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst_3 = flag_4;
                item[index].childes[d].isOpenSecond_3 = flag_4_4;
            }
        }else{
            flag_4 = true;
            item[index].isOpenFirst_3 = true;
            jq.parent().siblings().children().css("display","block");
            jq.css("display","none");
            for(var d in item[index].childes){
                item[index].childes[d].isOpenFirst_3 = flag_4;
                item[index].childes[d].isOpenSecond_3 = flag_4_4;
            }
        }
    };
    //全选(是/否)
    $scope.sChoose_all = function(){
        if($scope.is_checked_All){
            $scope.is_checked_All=false;
        }else{
            $scope.is_checked_All=true;
        }
        angular.forEach($scope.get_purview_list,function(data_1){
            if($scope.is_checked_All) {
                data_1.checked = true;
            }else {
                data_1.checked = false;
            }
            angular.forEach(data_1.childes, function (data_2) {
                if (!!data_1.checked) {
                    data_2.checked = true;
                }else {
                    data_2.checked = false;
                }
                angular.forEach(data_2.childes, function (data_3) {
                    if (!!data_2.checked){
                        data_3.checked = true;
                    }else{
                        data_3.checked = false;
                    }
                    angular.forEach(data_3.childes, function (data_4) {
                        if (!!data_3.checked){
                            data_4.checked = true;
                        }else{
                            data_4.checked = false;
                        }
                        angular.forEach(data_4.childes, function (data_5) {
                            if (!!data_4.checked){
                                data_5.checked = true;
                            }else{
                                data_5.checked = false;
                            }
                            angular.forEach(data_5.childs, function (data_6) {
                                if (!!data_5.checked){
                                    data_6.checked = true;
                                }else{
                                    data_6.checked = false;
                                }
                            });
                        });
                    });
                });
            });
        })
    };
    //一级选中(是/否)
    $scope.sChoose_1 = function(data_1_1,get_purview_all){
        if(data_1_1.checked){
            data_1_1.checked = false;
            get_purview_all.is_checked_number = 0;
            for(var i = 0;i < get_purview_all.length;i++){
                if(get_purview_all[i].checked === true){
                    get_purview_all.is_checked_number = get_purview_all.is_checked_number+1;
                }
            }
            if(get_purview_all.length != get_purview_all.is_checked_number){
                $scope.is_checked_All = false;
            }
        }else{
            data_1_1.checked = true;
            get_purview_all.is_checked_number = 0;
            for(var i = 0;i < get_purview_all.length;i++){
                if(get_purview_all[i].checked === true){
                    get_purview_all.is_checked_number = get_purview_all.is_checked_number+1;
                }
            }
            if(get_purview_all.length === get_purview_all.is_checked_number){
                $scope.is_checked_All = true;
            }
        }
        angular.forEach(data_1_1.childes, function (data_1_2) {
            if (!!data_1_1.checked){
                data_1_2.checked = true;
            }else{
                data_1_2.checked = false;
            }
            angular.forEach(data_1_2.childes, function (data_1_3) {
                if (!!data_1_2.checked){
                    data_1_3.checked = true;
                }else{
                    data_1_3.checked = false;
                }
                angular.forEach(data_1_3.childes, function (data_1_4) {
                    if (!!data_1_3.checked){
                        data_1_4.checked = true;
                    }else{
                        data_1_4.checked = false;
                    }
                    angular.forEach(data_1_4.childs, function (data_1_5) {
                        if (!!data_1_4.checked){
                            data_1_5.checked = true;
                        }else{
                            data_1_5.checked = false;
                        }
                    });
                });
            });
        });
    };
    //二级选中(是/否)
    $scope.sChoose_2 = function(data_2_1,item,item_child){
        if(data_2_1.checked){
            data_2_1.checked = false;
            item.is_checked_number = 0;
            for(var i = 0;i < item_child.length;i++){
                if(item_child[i].checked === false || item_child[i].checked === undefined){
                    item.is_checked_number = item.is_checked_number+1;
                }
            }
            if(item_child.length === item.is_checked_number){
                item.checked = false;
            }
        }else{
            item.checked = true;
            data_2_1.checked = true;
        }
        angular.forEach(data_2_1.childes, function (data_2_1_1) {
            if (!!data_2_1.checked){
                data_2_1_1.checked = true;
            }else{
                data_2_1_1.checked = false;
            }
            angular.forEach(data_2_1_1.childes, function (data_2_1_2) {
                if (!!data_2_1_1.checked){
                    data_2_1_2.checked = true;
                }else{
                    data_2_1_2.checked = false;
                }
                angular.forEach(data_2_1_2.childs, function (data_2_1_3) {
                    if (!!data_2_1_2.checked){
                        data_2_1_3.checked = true;
                    }else{
                        data_2_1_3.checked = false;
                    }
                });
            });
        });
    };
    //三级
    $scope.sChoose_3 = function(data_3_1,item_3,item_child_3,item_0){
        if(data_3_1.checked){
            data_3_1.checked = false;
            item_3.is_checked_number = 0;
            item_0.is_checked_number = 0;
            for(var i = 0;i < item_child_3.length;i++){
                if(item_child_3[i].checked === false || item_child_3[i].checked === undefined){
                    item_3.is_checked_number = item_3.is_checked_number+1;
                }
            }
            if(item_child_3.length === item_3.is_checked_number){
                item_3.checked = false;
            }
            for(var i = 0;i < item_0.childes.length;i++){
                if(item_0.childes[i].checked === false || item_0.childes[i].checked === undefined){
                    item_0.is_checked_number = item_0.is_checked_number+1;
                }
            }
            if(item_0.childes.length === item_0.is_checked_number){
                item_0.checked = false;
            }
        }else{
            item_0.checked = true;
            item_3.checked = true;
            data_3_1.checked = true;
        }
        angular.forEach(data_3_1.childes, function (data_3_1_1) {
            if (!!data_3_1.checked){
                data_3_1_1.checked = true;
            }else{
                data_3_1_1.checked = false;
            }
            angular.forEach(data_3_1_1.childs, function (data_3_1_2) {
                if (!!data_3_1.checked){
                    data_3_1_2.checked = true;
                }else{
                    data_3_1_2.checked = false;
                }
            });
        });
    };
    //四级
    $scope.sChoose_4 = function(data_4,item_4,item_4_1,item_4_2,item_4_3){
        if(data_4.checked){
            data_4.checked = false;
            data_4.is_checked_number = 0;
            item_4_1.is_checked_number = 0;
            item_4_3.is_checked_number = 0;
            for(var i = 0;i < item_4.childes.length;i++){
                if(item_4.childes[i].checked === false || item_4.childes[i].checked === undefined){
                    data_4.is_checked_number = data_4.is_checked_number+1;
                }
            }
            if(item_4.childes.length === data_4.is_checked_number){
                item_4.checked = false;
            }
            for(var i = 0;i < item_4_1.childes.length;i++){
                if(item_4_1.childes[i].checked === false || item_4_1.childes[i].checked === undefined){
                    item_4_1.is_checked_number = item_4_1.is_checked_number+1;
                }
            }
            if(item_4_1.childes.length === item_4_1.is_checked_number){
                item_4_1.checked = false;
            }
            for(var i = 0;i < item_4_3.childes.length;i++){
                if(item_4_3.childes[i].checked === false || item_4_3.childes[i].checked === undefined){
                    item_4_3.is_checked_number = item_4_3.is_checked_number+1;
                }
            }
            if(item_4_3.childes.length === item_4_3.is_checked_number){
                item_4_3.checked = false;
            }
        }else{
            item_4.checked = true;
            item_4_1.checked = true;
            item_4_3.checked = true;
            data_4.checked = true;
            angular.forEach(data_4.childs, function (data_4_1_1) {
                if (!!data_4.checked){
                    data_4_1_1.checked = true;
                }else{
                    data_4_1_1.checked = false;
                }
            });
        }
    };
    //5级
    $scope.sChoose_5 = function(data_5,item_5,item_4,item_3,item_2){
        if(data_5.checked){
            data_5.checked = false;
            data_5.is_checked_number = 0;
            item_5.is_checked_number = 0;
            item_4.is_checked_number = 0;
            item_3.is_checked_number = 0;
            item_2.is_checked_number = 0;
            for(var i = 0;i < item_5.childes.length;i++){
                if(item_5.childes[i].checked === false || item_5.childes[i].checked === undefined){
                    data_5.is_checked_number = data_5.is_checked_number+1;
                }
            }
            if(item_5.childes.length === data_5.is_checked_number){
                item_5.checked = false;
            }
            for(var i = 0;i < item_4.childes.length;i++){
                if(item_4.childes[i].checked === false || item_4.childes[i].checked === undefined){
                    item_5.is_checked_number = item_5.is_checked_number+1;
                }
            }
            if(item_4.childes.length === item_5.is_checked_number){
                item_4.checked = false;
            }
            for(var i = 0;i < item_3.childes.length;i++){
                if(item_3.childes[i].checked === false || item_3.childes[i].checked === undefined){
                    item_4.is_checked_number = item_4.is_checked_number+1;
                }
            }
            if(item_3.childes.length === item_4.is_checked_number){
                item_3.checked = false;
            }
            for(var i = 0;i < item_2.childes.length;i++){
                if(item_2.childes[i].checked === false || item_2.childes[i].checked === undefined){
                    item_3.is_checked_number = item_3.is_checked_number+1;
                }
            }
            if(item_2.childes.length === item_3.is_checked_number){
                item_2.checked = false;
            }
        }else{
            data_5.checked = true;
            item_5.checked = true;
            item_4.checked = true;
            item_3.checked = true;
            item_2.checked = true;
        }
    }
    /**
     * 修改权限
     */
    $scope.editAdmin=function(){
        if(!$scope.g_admin_detail.name){
            $scope.adminForm.submitted=true;
            return;
        }else{
            $scope.checked_ids = [];
            angular.forEach($scope.get_purview_list, function (data) {
                if(data.checked){
                    $scope.checked_ids.push(data.fp_id);
                }
                angular.forEach(data.childes, function (data_1) {
                    if (data_1.checked) {
                        $scope.checked_ids.push(data_1.fp_id);
                    }
                    angular.forEach(data_1.childes, function (data_2) {
                        if (data_2.checked) {
                            $scope.checked_ids.push(data_2.fp_id);
                        }
                        angular.forEach(data_2.childes, function (data_3) {
                            if (data_3.checked) {
                                $scope.checked_ids.push(data_3.fp_id);
                            }
                            angular.forEach(data_3.childes, function (data_4) {
                                if (data_4.checked) {
                                    $scope.checked_ids.push(data_4.fp_id);
                                }
                            });
                        });
                    });
                });
            });
        }
        if($scope.checked_ids.length < 0){
            alert("请选择权限");
            return;
        }
        $scope.limits=$scope.checked_ids;
        LimitsService.groups.updateGroup({fg_id:$stateParams.fg_id},{limits:$scope.limits,name:$scope.g_admin_detail.name},function(date){
            $location.path('/main/setting_home/gadmin_list');
            $scope.checked_ids = [];
        },function(error){
            alert(error.data.msg);
            $scope.checked_ids = [];
        });
    };
});