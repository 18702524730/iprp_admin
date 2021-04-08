angular.module("iprpAdminApp").factory("SellerApplicationService", function($resource,$stateParams,session) {
  // http://localhost:9000/iprp_operator/api/services?access_token=iprp_admin_d3771d1b46c045dea44a454451da8a2ff3dc0190138f4cc49fbd6453232422b2&pg_count=15&pg_index=0
    return $resource(options.api.base_url + '/services/:sp_id',{sp_id:'@sp_id',access_token:function(){return session.accessToken}},{
        'label_list':{
            method:'GET',
            isArray: false
        },
  
        'seller_detail':{
            method:'GET',
            isArray: false,
            params:{
                sp_id : $stateParams.seller_id
            }
        },
        'serviceEdit':{
            method:'PUT',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'addService':{
            method:'POST',
            isArray: false
        },
        'reset_pwd':{
            url : options.api.base_url + '/services/reset/pwd/:sp_id',
            method:'PUT',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'orders_allot_service':{
            url : options.api.base_url + '/orders/allot/services',
            method:'GET',
            isArray: false
        },
        'spstatistic':{
            url : options.api.base_url + '/spstatistic',
            method:'GET',
            isArray: false
        },
         'listEntrustedUnit':{
            url:options.api.base_url + '/listEntrustedUnit',
            method:'GET',
            isArray: false
        }
    })
  });
  