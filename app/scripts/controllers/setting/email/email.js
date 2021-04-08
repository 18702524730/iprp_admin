angular.module('iprpAdminApp').controller('EmailCtrl',function($scope,NotifySettingService,SendEmailSettingService,$location){

    $('#email_tpl').siblings().removeClass("selected");
    $('#email_tpl').addClass("selected");
    /**
     * 获取全部的
     */
    $scope.emailAddr_obj = { };
    $scope.emailEnabled_obj = { };
    $scope.emailHost_obj = { };
    $scope.emailId_obj = { };
    $scope.emailPass_obj = { };
    $scope.emailPort_obj = { };
    NotifySettingService.NotifySetting.list(function(data){
        $scope.notity_setting_list = data;
        angular.forEach($scope.notity_setting_list,function(comments){
            if(comments.name === "email_addr"){
                $scope.emailAddr_obj = comments;
            }else if(comments.name === "email_enabled"){
                $scope.emailEnabled_obj = comments;
            }else if(comments.name === "email_host"){
                $scope.emailHost_obj = comments;
            }else if(comments.name === "email_id"){
                $scope.emailId_obj = comments;
            }else if(comments.name === "email_pass"){
                $scope.emailPass_obj = comments;
            }else if(comments.name === "email_port"){
                $scope.emailPort_obj = comments;
            }
        })
    })

    /**
     * 修改
     */
    $scope.update = function(){
        if(!$scope.emailHost_obj.value){
            host_message();
            return;
        }
        if(!$scope.emailPort_obj.value){
            port_message();
            return;
        }
        if(!$scope.emailAddr_obj.value || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope.emailAddr_obj.value)){
            addr_message();
            return;
        }
        if(!$scope.emailId_obj.value){
            emailId_message();
            return;
        }
        if(!$scope.emailPass_obj.value){
            emailPass_message();
            return;
        }
        NotifySettingService.NotifySetting.edit($scope.notity_setting_list,function(data){
            alert("保存成功！！！");
        },function(error){
            alert(error.data.msg);
        })
    }

    /**
     * 测试接收的邮件地址
     */
    $scope.send_email_obj = { };
    $scope.error_message = "";
    $scope.send_test_email = function(){
        if(!$scope.send_email_obj.email || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope.send_email_obj.email)){
            send_email();
            return;
        }
        SendEmailSettingService.send_email.put({account:$scope.send_email_obj.email},{},function(data){
            alert("发送成功！！！");
        },function(error){
            alert(error.data.msg);
        })
    }

    function send_email(){
        $scope.$watch('send_email_obj.email',function(data){
            if(data != undefined  || data != null){
                if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data)){
                    $scope.error_message = "请输入正确的邮箱";
                }else{
                    $scope.error_message = "";
                }
            }else{
                $scope.error_message = "请输入正确的邮箱";
            }
        })
    }

    function host_message(){
        $scope.$watch('emailHost_obj.value',function(data){
            if(data != undefined  && data != null && data != ""){
                $scope.error_host_message = "";
            }else{
                $scope.error_host_message = "设置SMTP服务器的地址";
            }
        })
    }
    function port_message(){
        $scope.$watch('emailPort_obj.value',function(data){
            if(data != undefined  && data != null && data != ""){
                $scope.error_port_message = "";
            }else{
                $scope.error_port_message = "设置SMTP服务器的端口";
            }
        })
    }
    function addr_message(){
        $scope.$watch('emailAddr_obj.value',function(data){
            if(data != undefined  || data != null){
                if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data)){
                    $scope.addr_message = "请输入使用SMTP协议发送的邮件地址";
                }else{
                    $scope.addr_message = "";
                }
            }else{
                $scope.addr_message = "请输入使用SMTP协议发送的邮件地址";
            }
        })
    }
    function emailId_message(){
        $scope.$watch('emailId_obj.value',function(data){
            if(data != undefined  && data != null && data != ""){
                $scope.error_emailId_message = "";
            }else{
                $scope.error_emailId_message = "请输入SMTP身份验证用户名";
            }
        })
    }
    function emailPass_message(){
        $scope.$watch('emailPass_obj.value',function(data){
            if(data != undefined  && data != null && data != ""){
                $scope.error_pass_message = "";
            }else{
                $scope.error_pass_message = "请输入SMTP 身份验证密码";
            }
        })
    }
});
