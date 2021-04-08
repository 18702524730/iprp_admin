angular.module('iprpAdminApp').directive('openMtAddress', function(openAddressService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            areaAreaName:"=areaAreaName",
            cityAreaName:"=cityAreaName",
            provinceAreaName:"=provinceAreaName",
            areaAreaId:"=areaAreaId",
            cityAreaId:"=cityAreaId",
            provinceAreaId:"=provinceAreaId",
            judge:"=judge"

        },
        templateUrl: 'package/directive/open-mt-address/open-mt-address.html',
        link: function($scope, element, attrs, fn) {
            //获取省
            $scope.provinces = openAddressService.provinces.list({
                "pId":0
            });

            var judge = false;

            $scope.$watch('provinceAreaId',function(newProvinceId){
                if(!!newProvinceId) {
                    //获取市
                    $scope.cities = openAddressService.provinces.list({pId: newProvinceId});
                    if(judge || $scope.city_id==="") {
                        $scope.cityAreaId = null;
                        $scope.areaAreaId = null;
                    }
                } else {
                    $scope.cities = [];
                    $scope.areas = [];
                }

                if(!newProvinceId){
                    $scope.cityAreaId = null;
                    $scope.areaAreaId = null;

                }
            });

            $scope.$watch('cityAreaId',function(newCityId){
                if(!!newCityId || newCityId === 0) {
                    //获取区
                    $scope.areas = openAddressService.provinces.list({pId: newCityId});
                    if(judge) {
                        $scope.areaAreaId = null;
                    }
                    $scope.c_id = false;
                }else{
//                    $scope.c_id = true;
                }


                if(!newCityId){
                    $scope.areaAreaId = null;
                }
            });

            $scope.$watch('areaAreaId',function(newAreaId){
                if(!!newAreaId || newAreaId === 0) {
                    judge = true;
                    $scope.a_id = false;
                    for (var i in $scope.areas.elements) {
                        if ($scope.areaAreaId === $scope.areas.elements[i].area_id) {
                            $scope.areaAreaName = $scope.areas.elements[i].name;
                            break;
                        }
                    }
                    for (var j in $scope.cities.elements) {
                        if ($scope.cityAreaId === $scope.cities.elements[j].area_id) {
                            $scope.cityAreaName = $scope.cities.elements[j].name;
                            break;
                        }
                    }
                    for (var k in $scope.provinces.elements) {
                        if ($scope.provinceAreaId === $scope.provinces.elements[k].area_id) {
                            $scope.provinceAreaName = $scope.provinces.elements[k].name;
                            break;
                        }
                    }
                }else{
                    $scope.a_id = true;
                }
            });

        }
    };
});
