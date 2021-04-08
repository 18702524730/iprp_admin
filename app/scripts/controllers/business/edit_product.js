angular.module('iprpAdminApp').controller('EditProductCtrl',function($scope,ProductService,Upload,$modal,session,$cookies,$state,$stateParams,$location){
    // 商品信息
    $scope.updateProducts = {
        //serviceSecurityDetails: '',
        //commonProblemDetails: '',
        //shebeiAdvantageDetails: '',
        productTypeList: [{}],
        serviceTypeList: [{}]
    };
    //上传图片
    $scope.productPicture = '' 

    // 所属业务
    function request_businessTypes(){
        ProductService.businessTypeList(function(resp){
            if(resp.code == 'success'){
                $scope.businessTypes = resp.data;
            }else {
                console.error(resp.msg);
            }
        })
    }
    request_businessTypes();

    //切换所属业务
    $scope.changeBusinessType = function(){
        getClassTypeListRequest();
    };

    //业务分类
    function getClassTypeListRequest(){
        ProductService.classTypeList({
            businessTypeId: $scope.updateProducts.businessTypeId
        }, function(resp){
            /*var resp = {
                "msg": "获取记录成功",
                "code": "success",
                "data": [
                    {
                        "id": 1,
                        "name": "商标",
                        "shopBusinessTypeId": 1,
                        "createTime": " 2016-11-17 13:11:37"
                    } 
                ]
            };*/
            if(resp.code == 'success'){
                $scope.classTypeList = resp.data;
            }else {
                layer.alert(resp.msg);
                console.error(resp.msg);
            }
        });
    }

    // 选择业务分类，获取下面所有商品
    $scope.getGoods = function() {
        ProductService.getGoods({
            businessTypeId: $scope.updateProducts.businessTypeId,
            classTypeId: $scope.updateProducts.classTypeId
        }, function(resp){
            /*var resp = {
                "msg": "查询成功!",
                "code": "success",
                "data": {
                    "businessTypeId": 1,
                    "classTypeId": 1,
                    "productName": "国内商标注册",
                    "productId": 1,
                    "productPicture": "http://a.png",
                    "productTypeList": [
                        {
                            "id": 1,
                            "name": "普通商标注册"
                        }
                    ],
                    "serviceTypeList": [
                        {
                            "id": 2,
                            "name": "标准服务"
                        },
                        {
                            "id": 3,
                            "name": "加急服务"
                        }
                    ]
                }
            };*/
            if(resp.code == 'success'){
                $scope.goodsList = resp.data;
            }else {
                layer.alert(resp.msg);
                console.error(resp.msg);
            }
        })
    }

    // 选择商品名称，获取商品类型和服务类型信息
    $scope.getGoodInfo = function(id) {
        // 匹配商品名称
        $.each($scope.goodsList, function(i, item){
            if (item.productId == $scope.updateProducts.productId) {
                $scope.updateProducts.productName = item.productName;
            } 
        });

        //获取商品信息
        ProductService.getGoodInfo({
            businessTypeId: $scope.updateProducts.businessTypeId,
            classTypeId: $scope.updateProducts.classTypeId,
            productId: $scope.updateProducts.productId
        }, function(resp){
            /*var resp = {
                "msg": "查询成功!",
                "code": "success",
                "data": {
                    "businessTypeId": 1,
                    "classTypeId": 1,
                    "productName": "国内商标注册",
                    "productId": 1,
                    "productPicture": "http://a.png",
                    "productTypeList": [
                        {
                            "id": 1,
                            "name": "普通商标注册"
                        }
                    ],
                    "serviceTypeList": [
                        {
                            "id": 2,
                            "name": "标准服务"
                        },
                        {
                            "id": 3,
                            "name": "加急服务"
                        }
                    ]
                }
            };*/
            if(resp.code == 'success'){
                $scope.updateProducts.productTypeList = resp.data.productTypeList;
                $scope.updateProducts.serviceTypeList = resp.data.serviceTypeList;
                $scope.updateProducts.serviceSecurityDetails = resp.data.serviceSecurityDetails;
                $scope.updateProducts.commonProblemDetails = resp.data.commonProblemDetails;
                $scope.updateProducts.shebeiAdvantageDetails = resp.data.shebeiAdvantageDetails;
                $scope.productPicture = resp.data.productPicture;
            }else {
                layer.alert(resp.msg);
                console.error(resp.msg);
            }
        })
    }

    // object in array
    function isInArray(name, arr) {
        var ret = false;
        $.each(arr, function(i, item){
            if (name === item['name']){
                ret = true;
                return false;
            }
        });
        return ret;
    }

    function getValidArrLen(arr) {
        var ret = [].concat(arr);
        for (var i = ret.length - 1; i >= 0; i--) {
            if (!ret[i]['name']){
                ret.splice(i, 1);
            }
        }
        return ret.length;
    }
    
    //增加(服务类型、商品类型)
    $scope.addIpt = function(arr){
        arr.push({});
    }
    
    //删除(服务类型、商品类型)
    $scope.removeIpt = function(arr, item){
        $.each(arr, function(i, q){
            if (q === item){
                if (arr.length === 1) {
                    item.name = '';
                    return;
                }
                arr.splice(i, 1);
                return false;
            }
        });
    }

    $scope.uploadFile = function (file) {
        if (!file) {
            return;
        }
        var filetype = file.type.split("/");
        var MAX_POST_SIZE = 0.2 * 1024 * 1024;
        console.log(filetype)
        if(file.size > MAX_POST_SIZE){
            layer.alert("上传的文件请小于200k");
        }else if(filetype[1] != "jpeg" && filetype[1] != "jpg" && filetype[1] != "png"){
            layer.alert("请上传jpg/jpeg/png格式的图片");
        }else{
            Upload.upload({
                url: options.api.base_url + '/products/pictureinterface',
                data: {Filedata: file}
            }).then(function (resp) {
                resp = resp.data;
                if(resp.url){
                    $scope.productPicture = resp.url;
                }
            }, function (resp) {
            });
        }
    };

    //保存
    $scope.editGoodClick = function (pwd) {
        var productTypeList = $scope.updateProducts.productTypeList;
        var serviceTypeList = $scope.updateProducts.serviceTypeList;
        var verify = function(arr, name){
            var temp = false;
            var len = arr.length;
            if (len < 2) {
                temp = false;
            }else if(len == 2){
                if (arr[0][name] === arr[1][name]) {
                    temp = true;
                }
            }else{
                for (var i = len - 1; i >= 0; i--) {
                    var p = arr[i];
                    for (var j = i - 1; j >= 0; j--) {
                        if (arr[j][name] === p[name]){
                            temp = true;
                            break;
                        }
                    }
                    if (temp) {
                        break;
                    }
                }
            }
            return temp;
        }
        if (verify(productTypeList, 'name')) {
            layer.alert("商品类型不能重复, 请修改");
            return;
        }
        if (verify(serviceTypeList, 'name')) {
            layer.alert("服务类型不能重复, 请修改");
            return;
        }

        
        /*var ret = new FormData();
        var html1 = editor1.$txt.html();
        var html2 = editor2.$txt.html();
        var html3 = editor3.$txt.html();
        $scope.updateProducts.serviceSecurityDetails = html1;
        $scope.updateProducts.shebeiAdvantageDetails = html2;
        $scope.updateProducts.commonProblemDetails = html3;
        ret.append('updateproducts', JSON.stringify($scope.updateProducts));
        ret.append('productPicture', $scope.productPicture);*/

        var ret = {
            updateProducts: JSON.stringify($scope.updateProducts),
            productPicture: $scope.productPicture
        }

        if(!$scope.updateProducts.businessTypeId){
            layer.alert('请选择所属业务');
            return;
        }
        if(!$scope.updateProducts.classTypeId){
            layer.alert('请选择业务分类');
            return;
        }
        
        //判断商品名称是否为空
        if (!$scope.updateProducts.productName) {
            layer.alert("请输入商品名称");
            return;
        }
        //判断商品类型是否为空
        if (getValidArrLen($scope.updateProducts.productTypeList) === 0) {
            layer.alert("商品类型至少定义一种");
            return;
        }
        //判断服务类型是否为空
        if (getValidArrLen($scope.updateProducts.serviceTypeList) === 0) {
            layer.alert("服务类型至少定义一种");
            return;
        }

        //判断图片是否上传
        if (!$scope.productPicture) {
            layer.alert("请上传商品图片");
            return;
        }

        ProductService.edit_product(ret, function (data) {
            if (data['code'] == 'success') {
                $state.go('main.business_home.product_list');
            } else {
                layer.alert(data['msg']);
            }
        });
    };

    //取消
    $scope.editGoodBackClick = function () {
        location.href = "#business_manager";
        sessionStorage.isTabClick = "1"
    };
});

