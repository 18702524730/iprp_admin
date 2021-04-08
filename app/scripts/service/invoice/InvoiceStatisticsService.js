angular.module("iprpAdminApp").factory("InvoiceStatisticsService", function($resource,session) {

    return $resource(options.api.base_url + '/welcome/invoice/statistics',{access_token:function(){return session.accessToken}},{
        'invoice_count':{
            method:'GET',
            isArray: true
        }
    })
});
