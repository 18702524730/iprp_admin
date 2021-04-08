angular.module('iprpAdminApp').controller('UserManageListBlackCtrl', function ($scope,$modal, PaginationService,ChannelService,MemberBlackService,$location) {
    $('#apply_user_list').removeClass("selected");
    $('#assignService_list').removeClass("selected");
    $('#user_black_list').siblings().removeClass("selected");
    $('#user_black_list').addClass("selected");
    // 添加时间控件 初始化
    $('#query_start_date,#query_end_date,#query_start_datek,#query_end_datek').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose: true
    });
    $('.datetimepicker').css('display','none');
    //渠道列表
    ChannelService.channel.channel_all({
        "pg_index":0,
        "pg_count":999
    },function(data){
        $scope.channel_list = data.elements;
    });
    //用户管理列表
    init_member_manage_list();
    function init_member_manage_list(){
       // 4  创建时间 	 5结束时间
	   var query_start_date = $scope.query_start_date;
       var query_end_date = $scope.query_end_date;
       if(query_start_date === undefined){
           query_start_date = null;
       }
       if(query_end_date === undefined){
           query_end_date = null;
       }
       query_start_date = new Date(query_start_date).getTime();
       if(query_end_date != null){
           query_end_date = new Date(query_end_date).getTime() + 86400000;
       }
       if(query_start_date === 0){
           query_start_date = null;
       }
       if(query_end_date === 0){
           query_end_date = null;
       }

      //   9 最后登录开始时间  10最后登录结束时间
	   var query_start_datek = $scope.query_start_datek;
       var query_end_datek = $scope.query_end_datek;
       if(query_start_datek === undefined){
           query_start_datek = null;
       }
       if(query_end_datek === undefined){
           query_end_datek = null;
       }
       query_start_datek = new Date(query_start_datek).getTime();
       if(query_end_datek != null){
           query_end_datek = new Date(query_end_datek).getTime() + 86400000;
       }
       if(query_start_datek === 0){
           query_start_datek = null;
       }
       if(query_end_datek === 0){
           query_end_datek = null;
       }



        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
        	MemberBlackService.list({
        		//0为黑名单会员
        		"status":0,
        		//1  会员名称  2电话号码    3邮箱
        		"user_account":$scope.user_account === "" || $scope.user_account === undefined ? null : $scope.user_account.trim(),
        	    "phone" : $scope.phone === "" || $scope.phone === undefined ? null : !/^1[0-9]{10}$/.test($scope.phone) ? null:$scope.phone,
        		"email" : $scope.email === "" || $scope.email === undefined ? null : $scope.email.indexOf('@') === -1 ? null:$scope.email,

        		 //4  创建时间 	 5结束时间
                "beginTime" :query_start_date,
                "endTime" :query_end_date,

        		//6 主体名称  7 主体类型
                "apply_subject_name":$scope.apply_subject_name === "" || $scope.apply_subject_name === undefined ? null : $scope.apply_subject_name,
                "apply_subject_type":$scope.apply_subject_type,

                //8  渠道编码   9 最后登录开始时间  10最后登录结束时间
                "channel_code":$scope.channel_code === "" ? null : $scope.channel_code,
                "last_login_begin_time":query_start_datek,
                "last_login_end_time":query_end_datek,

                "pg_index":pg_index,
                "pg_count":pg_count


            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.member_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.member_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }



    //查看冻结详情
    $scope.merbers_frozen_detail = function(member_id){
        if( member_id != 0){
            $modal.open({
                resolve:{
                	member_id : function(){
                        return member_id;
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\members\\members_frozen_details.html',
                controller: 'MembersFrozenDetailsCtrl'
            }).result.then(function (result) {
            	 init_member_manage_list();
            });
        }else{
           alert("该会员id不存在!" );
        }
    };


    //解冻冻结
    $scope.merbers_thaw_detail = function(member_id){
        if( member_id != 0){
            $modal.open({
                resolve:{
                	member_id : function(){
                        return member_id;
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\members\\members_thaw_details.html',
                controller: 'MembersThawDetailsCtrl'
            }).result.then(function (result) {
            	 init_member_manage_list();
            });
        }else{
           alert("该会员id不存在!" );
        }
    };


    //按条件查询
    $scope.search = function(){
      if(null!=$scope.phone &&''!=$scope.phone && (!(/^1[0-9]{10}$/.test($scope.phone)))){
        alert("手机号格式错误");
      }else if(null!=$scope.email &&''!=$scope.email && ($scope.email.indexOf('@') === -1)){
        alert("邮箱格式错误");
      }else{
        init_member_manage_list();
      }
    };
    //查看详情
    $scope.member_detail = function(index){
        $location.path('main/user_home/user_detail/' + index);
    };
    //编辑
    $scope.edit_member = function(index){
        $location.path('main/user_home/edit_user/' + index);
    };
    //会员的服务记录
    $scope.member_service = function(index){
        $location.path('main/user_home/service_record/' + index);
    };
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
