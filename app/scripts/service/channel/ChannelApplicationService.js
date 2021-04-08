angular.module("iprpAdminApp").factory("ChannelApplicationService", function($resource,$stateParams,session) {
  // http://localhost:9000/iprp_operator/api/services?access_token=iprp_admin_d3771d1b46c045dea44a454451da8a2ff3dc0190138f4cc49fbd6453232422b2&pg_count=15&pg_index=0
    return $resource(options.api.base_url + '/apply/list',{id: '@id', phone: '@phone',access_token:function(){return session.accessToken}},{
        'label_list':{
            method:'GET',
            isArray: false,
            params:{
                apply_type : $stateParams.apply_type
            }
        },
  
        'seller_detail':{
            url: options.api.base_url + '/apply/:id',
            method:'GET',
            isArray: false
        },
        'parter_detail': {
            url: options.api.base_url + '/apply/:id' + '/detail',
            method:'GET',
            isArray: false
        },
        'confirm':{
            url: options.api.base_url + '/apply/confirm',
            method:'PUT',
            isArray: false
        },
        'addRemarks':{
            url: options.api.base_url + '/apply',
            method:'PUT',
            isArray: false
        },
        'getServiceInfo':{
            // /services/phone/15988498727
            url : options.api.base_url + '/services/phone/:phone',
            method:'GET',
            isArray: false
        },
        'putService':{
            url : options.api.base_url + '/services/:id',
            method:'PUT',
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
  