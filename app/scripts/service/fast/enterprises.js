angular.module("iprpAdminApp").factory("Enterprises", function($resource,$stateParams,session) {
  // http://localhost:9000/iprp_operator/api/services?access_token=iprp_admin_d3771d1b46c045dea44a454451da8a2ff3dc0190138f4cc49fbd6453232422b2&pg_count=15&pg_index=0
    return $resource(options.api.base_url + '/tech/queryCultvationList',{id: '@id', phone: '@phone',access_token:function(){return session.accessToken}},{
        'label_list':{
            method:'POST',
            isArray: false
        },

        'demand_detail':{
            // url: options.api.base_url + '/apply/:id',
            url: options.api.base_url + '/tech/queryDetail',
            method:'GET',
            params:{
                id : $stateParams.apply_type
            },
            isArray: false
        },
        // http://testadmin.ipsebe.com/iprp_operator/api/addRemarks
        // http://localhost:9000/iprp_operator/api/api/addRemarks?access_token=iprp_admin_d96e894bbe4d4dd7969e960a1af14147d0564a9e51e346cbae574808b2485b70
        'addRemarks':{
            url: options.api.base_url + '/addRemarks',
            method:'POST',
            isArray: false
        },
        // 'addRemarks':{
        //     url: options.api.base_url + '/apply',
        //     method:'PUT',
        //     isArray: false
        // },
        'getServiceInfo':{
            // /services/phone/15988498727
            url : options.api.base_url + '/services/phone/:phone',
            method:'GET',
            isArray: false
        },
        'ipSurveyList':{
        		url : options.api.base_url + '/tech/queryList',
            method:'POST',
            isArray: false
        },
        'ipSurveyAddRemark':{
        		url : options.api.base_url + '/tech/addRemark',
            method:'POST',
            isArray: false
        },
        // 国高导入查询
        'queryGuogaoList':{
        		url : options.api.base_url + '/tech/queryGuogaoList',
            method:'GET',
            isArray: false
        },
        // 省科导入查询
        'queryShengkeList':{
        		url : options.api.base_url + '/tech/queryShengkeList',
            method:'GET',
            isArray: false
        },
    })
  });

