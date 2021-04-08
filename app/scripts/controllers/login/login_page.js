angular.module('iprpAdminApp').controller('LoginPageCtrl', function ($scope,$state,ImgCodeService,$timeout,UserService,AdminService,publicService,$location,$rootScope,session) {
        $scope.image = null;
        $scope.is_show = true;
        $scope.login_obj = { };

        $("#hide").click(function(){
            $(".code").fadeOut("slow");
        });
        $("#captcha").focus(function(){
            $(".code").fadeIn("fast");
        });
        //初始化验证码
        getImgCode();
        function getImgCode(){
             $scope.imageCode =  options.api.root_url + "/servlet/captchaCode?t=" + Math.random();
        }
        //刷新验证码
        $scope.refreshCaptcha = function(){
            getImgCode();
        };
        /**
         * 如果用户登录跳转到首页
         */
        if(undefined != session.accessToken){
            AdminService.admin_manage(function(data){
                if(data.admin_id != null){
                    publicService.formReturnUrl();
                }
            },function(error){
                $location.path('login_page')
            })
        }

        //登录
        $scope.submit = function(){
            
            if(!$scope.login_obj.name || !$scope.login_obj.password ||!$scope.login_obj.captcha){
                return;
            };
            var ret = {
            	name: $scope.login_obj.name,
            	password: $.md5($scope.login_obj.password),
            	captcha: $scope.login_obj.captcha,
            }

            UserService.adminLogin.login(ret, function(data){
                session.accessToken = data.token;
                session.name=data.name;
                session.admin_id = data.admin_id;
                session.privilege = data.purviews;
                session.member_stat_show = false;
                session.invoice_show = false;
                session.red_invoice_show = false;
                $rootScope.session = session.initSession();
                publicService.formReturnUrl();
                $('.login-layout').hide();
                $('.bg-dot').hide();
                $('.loading').show();
                $state.go('main.left.home_page');
                $("body").css("background-image","");
                localStorage.removeItem('isopen')
                setTimeout(function(){
                    $('#nav_dashboard').click()
                },200)
                
            },function(error){
                getImgCode();
                alert(error.data.msg);
            });
        };

//        //监听验证码
//        $scope.$watch('countdown',function(data){
//            if(data === '0' || data === 0){
//                getImgCode();
//                var obj = $('#asd');
//                obj[0].disabled = false;
//                $scope.is_show = true;
//            }
//        });

});
