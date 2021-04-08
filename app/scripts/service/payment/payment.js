angular.module("iprpAdminApp").factory("PaymentService", function($resource,session) {

    return $resource(options.api.base_url+ '/on/refund',{access_token:function(){return session.accessToken}},{
        'refund':{
            method: 'POST',
            isArray: true
        },
        'off_refund':{
            url:options.api.base_url + '/offline/refund',
            method: 'POST',
            isArray: false
        }
    })
});


