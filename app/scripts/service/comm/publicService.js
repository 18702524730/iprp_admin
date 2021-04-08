angular.module("iprpAdminApp").factory("publicService", function($location) {

    return{
        formReturnUrl: function(){
            var url = window.location.hash;
            if(url.indexOf("return_url") != -1){
                var loc = url.substring(url.lastIndexOf('=')+1, url.length);
                var return_url =  unescape(loc);
                window.self.location = return_url;
            }else{
                $location.path('main/left/home_page');
                $("body").css("background-image","");
            }
        }
    }
});
