'use strict';

angular.module("iprpAdminApp").factory("ImgCodeService",function($resource,$stateParams) {

    return $resource(options.api.base_url + '/verification',{},{
        "getImgCode": {
            method: 'GET',
            isArray:false,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }
    });
});