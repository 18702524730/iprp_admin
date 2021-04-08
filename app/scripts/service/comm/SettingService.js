angular.module('iprpAdminApp').factory('SettingService',function(session,$stateParams,$resource) {

    return{
        setting :$resource(options.api.base_url  + '/settings/:name',{name:'@name',access_token:function(){return session.accessToken}},{
            "list":{
                method:'GET',
                isArray:true
            },
            "detail":{
                method:'GET',
                isArray:false,
                params : {
                    name:$stateParams.name
                }
            },
            "edit":{
                method:'PUT',
                isArray:false,
                params : {
                    name:$stateParams.name
                }
            }
        })
    };
});

angular.module('iprpAdminApp').factory('NotifySettingService',function(session,$stateParams,$resource) {

    return{
        NotifySetting :$resource(options.api.base_url  + '/notify_settings/:name',{name:'@name',access_token:function(){return session.accessToken}},{
            "list":{
                method:'GET',
                isArray:true
            },
            "detail":{
                method:'GET',
                isArray:false,
                params : {
                    name:$stateParams.name
                }
            },
            "edit":{
                method:'PUT',
                isArray:false
            }
        })
    };
});

angular.module('iprpAdminApp').factory('SendEmailSettingService',function(session,$stateParams,$resource) {

    return{
        send_email :$resource(options.api.base_url  + '/send/email',{access_token:function(){return session.accessToken}},{
            "put":{
                method:'PUT',
                isArray:false
            }
        })
    };
});