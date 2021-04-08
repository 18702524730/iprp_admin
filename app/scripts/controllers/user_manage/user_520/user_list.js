angular.module('iprpAdminApp').controller('UserManageList520Ctrl', function ($scope,$modal,PaginationService,ChannelService,MemberService,$location) {
    $('#apply_user_list').removeClass("selected");
    $('#assignService_list').removeClass("selected");
    $('#user_list').siblings().removeClass("selected");
    $('#user_list').addClass("selected");
    $('#user_list_520').addClass("selected").parent().siblings().children().removeClass("selected");
    // 添加时间控件 初始化
    $('#beginTime,#endTime,#last_login_begin_time,#last_login_end_time').datetimepicker({
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
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
          MemberService.list({
                "status":1,
                "pg_index":pg_index,
                "pg_count":pg_count,
                "user_account":$scope.user_account === "" || $scope.user_account === undefined ? null : $scope.user_account.trim(),
                "apply_subject_name":$scope.apply_subject_name === "" || $scope.apply_subject_name === undefined ? null : $scope.apply_subject_name,
                "apply_subject_type":$scope.apply_subject_type,
                "channel_code":$scope.channel_code === "" ? null : $scope.channel_code,
                "phone" : $scope.phone === "" || $scope.phone === undefined ? null : !/^1[0-9]{10}$/.test($scope.phone) ? null:$scope.phone,
                "email" : $scope.email === "" || $scope.email === undefined ? null : $scope.email.indexOf('@') === -1 ? null:$scope.email,
                "beginTime": $scope.beginTime ? new Date($scope.beginTime).getTime() : '',
                "endTime": $scope.endTime ? (new Date($scope.endTime).getTime() + 86400000) : '',
                "last_login_begin_time": $scope.last_login_begin_time ? new Date($scope.last_login_begin_time).getTime() : '',
                "last_login_end_time": $scope.last_login_end_time ? (new Date($scope.last_login_end_time).getTime() + 86400000) : '',
                "vipName": $scope.vipName
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
        $location.path('main/user_home/user_detail_520/' + index);
    };
    //编辑
    $scope.edit_member = function(index){
        $location.path('main/user_home/edit_user/' + index);
    };

    //修改客服
    $scope.edit_servicer = function(item){
        $modal.open({
            resolve:{
                itemD : function(){
                    return item;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\user_manage\\editServicer.html',
            controller: 'EditServicer'
        }).result.then(function (result) {
            init_member_manage_list();
        });
    };

//冻结
  $scope.merbers_dongjie = function(member_id){
    if( member_id != 0){
      $modal.open({
        resolve:{
          member_id : function(){
            return member_id;
          }
        },
        backdrop:false,
        keyboard:true,
        templateUrl: 'package\\modal\\member\\member_dongjie.html',
        controller: 'memberDongjieCtrl'
      }).result.then(function (result) {
        init_member_manage_list();
      });
    }else{
      alert("该会员id不存在!" );
    }
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
