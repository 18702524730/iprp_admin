angular.module("iprpAdminApp").factory("telService", function($resource,$stateParams,session) {
    return $resource(options.api.base_url + '/consultation/:consultationId',{consultationId:'@consultationId',access_token:function(){return session.accessToken}},{
        'detail':{
            method:'GET',
            params:{
                consultationId : $stateParams.consultationId
            },
            isArray: false
        },
        'list':{
            url:options.api.base_url + '/consultation',
            method:'GET',
            isArray: false
        },
        'reception':{
            url:options.api.base_url + '/reception',
            method:'GET',
            isArray: false
        },
        'finishReception':{
            url:options.api.base_url + '/finishReception',
            method:'POST',
            isArray: false
        },
        'findAllReceptionName':{
            url:options.api.base_url + '/findAllReceptionName',
            method:'GET',
            isArray: true
        }
    })
});
angular.module("iprpAdminApp").factory("ipProtectService", function($resource,$stateParams,session) {
    return $resource(options.api.base_url + '/consultation/:consultationId',{consultationId:'@consultationId',access_token:function(){return session.accessToken}},{
        'detail':{
            method:'GET',
            params:{
                consultationId : $stateParams.consultationId
            },
            isArray: false
        },
        'list':{
            url:options.api.base_url + '/protectConsultation',
            method:'GET',
            isArray: false
        },
        'reception':{
            url:options.api.base_url + '/reception',
            method:'GET',
            isArray: false
        },
        'finishReception':{
            url:options.api.base_url + '/finishReception',
            method:'POST',
            isArray: false
        },
        'findAllReceptionName':{
            url:options.api.base_url + '/findAllReceptionName',
            method:'GET',
            isArray: true
        },
        'clueReportList':{
            url:options.api.base_url + '/findClueReportList',
            method:'GET',
            isArray: false
        },
        'clueReportDetail':{
            url:options.api.base_url + '/consultation/:consultationId',
            method:'GET',
            isArray: false,
            params:{
                consultationId : $stateParams.consultationId
            }
        },
        'epidemicReportList':{
            url:options.api.base_url + '/findEpidemicPreventReportList',
            method:'GET',
            isArray: false
        },
        // 'epidemicReportDetail':{
        //     url:options.api.base_url + '/consultation/:consultationId',
        //     method:'GET',
        //     isArray: false,
        //     params:{
        //         consultationId : $stateParams.consultationId
        //     }
        // },
    })
});
