angular.module("iprpAdminApp").factory("AdminLogService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/admin_logs/:admin_log_id',{admin_log_id:'@admin_log_id',access_token:function(){return session.accessToken}},{
        'admin_logs_all': {
            method: 'GET',
            isArray: false
        }
    });
});
