angular.module('iprpAdminApp')
  .controller('MainCtrl', function ($state,$cookieStore,$http,$scope,session,UserService,$location,$modal) {
    $scope.admin_name = session.name;
    //点击改变当前class
    $scope.place = "控制台";
    //点击主导航菜单时，默认的功能展示
    $scope.select = function($event){
      var obj = angular.element($event.target);
      $scope.place = obj.context.innerText;
      obj.parent().siblings().children('a').removeClass("actived");
      obj.parent().parent().siblings().children('a').removeClass("actived");
      obj.parent().addClass("actived");
    };
    var openNum = localStorage.getItem('isopen')
      function lunxun(){
          var openNum = window.localStorage.getItem('isopen')
          var date = new Date()
          var hour = date.getHours();
          var min = date.getMinutes();
          var start = false;
          if(hour==8 && min>30){
            start = true;
          }
          if(hour>8&&hour<12){
            start = true;
          }
          if(hour==13&&min>30){
            start = true;
          }
          if(hour>13&&hour<18){
            start = true;
          }
          if(hour==18&&min<1){
            start = true;
          }
          console.log(hour,min)
          if(start){
            $http.get(options.api.base_url + '/findChannelWorkOrderList?token='+session.accessToken+'&status=11&pgIndex=1&pgCount=15').then(function(data){
                var isdata = data.data.elements.length;
                if(isdata>0){
                    window.lunxuntimer=setTimeout(function(){
                      if(openNum==null){
                        localStorage.setItem('isopen',1)
                      }
                      window.open(rootConfig.adminUrl+'/#/main/trade_home/channel_work_order?status=11&pgIndex=1&pgCount=15')
                      lunxun()
                    }, 1800000);
                }else{
                  console.log('处理完毕')
                  window.lunxuntimer&&clearTimeout(window.lunxuntimer)
                  localStorage.removeItem('isopen')
                  setTimeout(function(){
                    lunxun()
                  },60000)
                }
            })
          }else{
            console.log('lunxun')
            setTimeout(function(){
              lunxun()
            },60000)
          }
      }
      
      function getopen(){
          $http.get(options.api.base_url + '/checkVerify?token='+session.accessToken).then(function(data){
              if(data.status==200){
                  var isopen = data.data;
                  if(isopen==1){
                      lunxun()
                  }
              }
          })
      }
      // localStorage.removeItem('isopen')
      console.log('openNum:'+openNum)
      if(openNum==null){
        getopen()
      }
      if(window.lunxuntimer){
        window.onunload = function(){
          localStorage.removeItem('isopen');
          window.lunxuntimer&&clearTimeout(window.lunxuntimer)
        }
      }
    
      
    //退出
    $scope.logout = function(){
        UserService.logOut.put(function(){
           $location.path('/login_page')
        },function(){

        })
    };
    /**
     * 修改密码
     * @constructor
     */
    $scope.UpdatePwd = function(){
        $modal.open({
            resolve:{
              admin_name:function(){
                  return null;
              }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\edit_password\\edit_password.html',
            controller: 'EditPasswordCtrl'
        }).result.then(function (result) {

        });
    };
});
