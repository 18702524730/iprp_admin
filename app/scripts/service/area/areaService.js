angular.module("iprpAdminApp").factory("AreaService", function($resource,$stateParams,session) {

    return{
        area : $resource(options.api.base_url + '/areas/:area_id', {area_id:'@area_id',access_token:function(){return session.accessToken}}, {
            "area_list": {
                method: 'GET',
                isArray: false
            },
            "area_detail":{
                method: 'GET',
                isArray: false,
                params:{
                    area_id :$stateParams.area_id
                }
            }
        }),
        areas_tree : $resource(options.api.base_url + '/areas/tree',{access_token:function(){return session.accessToken}},{
            "all_tree":{
                method: 'GET',
                isArray: false
            }
        })
    }
});
