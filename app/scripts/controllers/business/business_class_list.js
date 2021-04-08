angular.module('iprpAdminApp').controller('BusinessClassListCtrl', function ($scope,BusinessClassService,PaginationService,$location) {

    $('#business_class_list').siblings().removeClass("selected");
    $('#business_class_list').addClass("selected");

    init_business_list();
    var array=[];
    function init_business_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        BusinessClassService.list({
            "pg_index":0,
            "pg_count":999,
            "parent_id":0
        },function(data){
            if (data == undefined)
                return;
            if (data.elements.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.business_class_list = data.elements;
            data.elements.forEach(function(obj){
                array.push(obj.bs_class_id);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    //展开/合并
    $scope.Unfold=function(item,index,$event,flag1,flag2){
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
        BusinessClassService.list({
            "parent_id":parent.bs_class_id
        },function(data){
            for(var d in data.elements){
                data.elements[d].isOpenFirst = flag1;
                data.elements[d].isOpenSecond = flag2;
            }
            parent.childs = data;
        });
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
        BusinessClassService.list({
            "parent_id":second.bs_class_id
        }, function (data) {
            for(var d in data.elements){
                data.elements[d].isOpenFirst = flag1;
                data.elements[d].isOpenSecond = flag2;
            }
            params.ThirdChild = data;
        });
    };

    //修改
    $scope.edit_class=function(index,name){
        $location.path('/main/business_home/edit_business_class/'+index);
    };
    //添加
    $scope.addChild_class=function(bs_class_id,name){
        localStorage.setItem("temp_bs_class_id", bs_class_id);
        $scope.temp = localStorage.getItem('temp_bs_class_id');
        $location.path('/main/business_home/add_business_class');
    }
    //不需要上级添加
    $scope.add_business_class = function(){
        localStorage.removeItem('temp_bs_class_id');
        $location.path('/main/business_home/add_business_class');
    }
    //删除
    $scope.deleting = function(bs_class_id,index,have_child,parents){
        var msg = "";
        if(have_child) {
            msg = "删除该分类将会同时删除该分类的所有下级分类，您确定要删除吗？";
        }else{
            msg = "您确定要删除吗？";
        }
        if (confirm(msg)) {
            $scope.delete_class(bs_class_id,index,parents);
        }
    };

    /**
     * 删除
     * @param bs_class_id
     * @param index
     * @param parents
     */
    var bs_class_ids = [];
    $scope.delete_class = function(bs_class_id,index,parents){
        bs_class_ids.push(bs_class_id);
        BusinessClassService.deleteBatch({bs_class_ids:bs_class_ids},{},function (data) {
            bs_class_ids = [];
            init_business_list();
            alert("删除成功");
        },function(result){
            bs_class_ids = [];
            alert(result.data.msg);
        });
    };

    /**
     * 批量删除
     */
    $scope.deleteAll = function(){
        if($scope.allId.length === 0){
            alert("请选择商品分类！");
            return;
        }
        if(confirm('您确定要删除吗?')) {
            BusinessClassService.deleteBatch({bs_class_ids: $scope.allId}, function (data) {
                $scope.allId = [];
                bs_class_ids = [];
                init_business_list();
                $scope.checkall = false;
                alert("删除成功")
            }, function (result) {
                $scope.allId = [];
                bs_class_ids = [];
                alert(result.data.msg);
            });
        }
    }
    //提示操作
    $scope.hint = true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }

    var original = "";
    //获取焦点
    $scope.focus = function(mag){
        original = mag;
    }
    //失去焦点
    $scope.temp_business_class_obj = { };
    $scope.blur = function (sort,obj,ind,str) {
        if("sort"===str){
            if (sort === "") {
                alert("此项不能为空");
                obj[ind].sort = original;
                return;
            }
            if (!/^(0|\+?[1-9][0-9]*)$/.test(Number(sort))) {
                alert("此项只能为正整数");
                obj[ind].sort = original;
                return;
            }
            if(Number(sort) < 0 || Number(sort) > 255){
                alert("此项只能为0～255之间");
                obj[ind].sort = original;
                return;
            }
            if (sort != original) {
                obj[ind].sort = sort;
                $scope.temp_business_class_obj.bs_class_id = obj[ind].bs_class_id;
                $scope.temp_business_class_obj.name = obj[ind].name;
                $scope.temp_business_class_obj.sort = obj[ind].sort;
                BusinessClassService.edit({bs_class_id:obj[ind].bs_class_id},$scope.temp_business_class_obj,function(){
                    $scope.temp_business_class_obj = { };
                    init_business_list();
                },function(err){
                    $scope.temp_business_class_obj = { };
                    alert(err.data.msg);
                });
            }
        }else{
            if (sort === "") {
                alert("此项不能为空");
                obj[ind].name = original;
                return;
            }
            if(sort.length > 20){
                alert("此项长度不能超过20字");
                obj[ind].name = original;
                return;
            }
            if (sort != original) {
                $scope.temp_business_class_obj.bs_class_id = obj[ind].bs_class_id;
                $scope.temp_business_class_obj.name = sort;
                BusinessClassService.edit({bs_class_id:obj[ind].bs_class_id},$scope.temp_business_class_obj,function(){
                    $scope.temp_business_class_obj = { };
                    init_business_list();
                },function(err){
                    $scope.temp_business_class_obj = { };
                    alert(err.data.msg);
                });
            }
        }
    }


    $scope.allId = [];
    $scope.checkall = false;
    $scope.sChoose = function(id){
        if($scope.allId.indexOf(id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(id),1);
        }else{
            $scope.allId.push(id);
        }
        if($scope.allId.length === arr.length){
            $scope.checkall = true;
        }else{
            $scope.checkall = false;
        }
    };

    $scope.allChoose = function(){
        $scope.checkall = !$scope.checkall;
        if($scope.checkall){
            $scope.allId = angular.copy(arr);
        }else{
            $scope.allId = [];
        }
    }
});
