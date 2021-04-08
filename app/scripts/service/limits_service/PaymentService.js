angular.module('iprpAdminApp').factory('PayService',function(session,$stateParams,$resource) {

    return $resource(options.api.base_url + '/payments/:payment_id',{payment_id:'@payment_id',access_token:function(){return session.accessToken}},{
        'payList': {
            method: 'GET',
            isArray: false
        },
        'edit_pay':{
            method: 'PUT',
            isArray: false,
            params:{
                payment_id:$stateParams.payment_id
            }
        },
        'add_pay':{
            method: 'POST',
            isArray: false
        },
        'detail_pay':{
            method: 'GET',
            isArray: false,
            params:{
                payment_id:$stateParams.payment_id
            }
        }
    });
});