angular.module("iprpAdminApp").factory("RefundService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/refunds/:refund_id',{refund_id:'@refund_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        'refundDetail':{
            method:'GET',
            isArray: false,
            params:{
                refund_id : $stateParams.refund_id
            }
        },
        'productType':{
            url:options.api.base_url + '/product',
            method:'GET',
            isArray: true
        },
        'approve':{
            url:options.api.base_url + '/examine',
            method:'POST',
            isArray: false
        },
        'rejectReasons':{
            url:options.api.base_url + '/listRefundsReasonType?types=1',
            method:'GET',
            isArray: false
        },
        'reject':{
            method:'PUT',
            isArray: false
        },
        /*'upload':{
            url:options.api.base_url + '/file/upload',
        },*/
        /*'refundAudit':{
            method:'PUT',
            isArray: false,
            params:{
                refund_id : $stateParams.refund_id
            }
        },
        'refundAdd':{
            url:options.api.base_url + '/refunds',
            method:'POST',
            isArray: false
        },
        "update_refund":{
            url:options.api.base_url + '/refunds/:refund_id/edit',
            method:'PUT',
            isArray: false,
            params:{
                refund_id : $stateParams.refund_id
            }
        }*/
    })
});
angular.module("iprpAdminApp").factory("RefundChildService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/refunds/:refund_id/:order_pay_id',{refund_id:'@refund_id',order_pay_id:'@order_pay_id',access_token:function(){return session.accessToken}},{
        'get':{
            method:'GET',
            isArray: false
        }
    })
});
