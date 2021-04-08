angular.module('iprpAdminApp').controller('AddProductCtrl',function($scope,ProductService, $modal, $stateParams,$state, $location,Upload){
    $scope.editorContent = ''; 

    // 新增商品信息
    $scope.addProducts = {
        descriptions: '', //PC业务介绍
        commonProblem: '', //常见问题 pc和H5共用
        applyProcess: '',// H5业务介绍
        productId: '0', //新增约定为0
        productTypeList: [{}], //商品类型
        serviceTypeList: [{}] //服务类型
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

    // 切换所属业务
    $scope.changeBusinessType = function(){
        getClassTypeListRequest();
    };

    //业务分类
    function getClassTypeListRequest(){
        ProductService.classTypeList({
            businessTypeId: $scope.addProducts.businessTypeId
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
        var filetype = file.type.split("/");
        var MAX_POST_SIZE = 0.2 * 1024 * 1024;
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
                console.log(resp)
                if(resp.url){
                    $scope.productPicture = resp.url;
                }
            }, function (resp) {
            });
        }
    };

    //添加
    $scope.addGoodClick = function () {
        var productTypeList = $scope.addProducts.productTypeList;
        var serviceTypeList = $scope.addProducts.serviceTypeList;
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
        $scope.addProducts.serviceSecurityDetails = html1;
        $scope.addProducts.shebeiAdvantageDetails = html2;
        $scope.addProducts.commonProblemDetails = html3;
        ret.append('addProducts', JSON.stringify($scope.addProducts));
        ret.append('productPicture', $scope.productPicture);*/

        var ret = {
            addProducts: JSON.stringify($scope.addProducts),
            productPicture: $scope.productPicture
        }


        
        //console.log(ret)
        if(!$scope.addProducts.businessTypeId){
            layer.alert('请选择所属业务');
            return;
        }
        if(!$scope.addProducts.classTypeId){
            layer.alert('请选择业务分类');
            return;
        }
        
        //判断商品名称是否为空
        if (!$scope.addProducts.productName) {
            layer.alert("请输入商品名称");
            return;
        }
        //判断商品介绍是否为空
        if (!$scope.addProducts.introduce) {
            layer.alert("请输入商品介绍");
            return;
        }
        //判断商品类型是否为空
        if (getValidArrLen($scope.addProducts.productTypeList) === 0) {
            layer.alert("商品类型至少定义一种");
            return;
        }
        //判断服务类型是否为空
        if (getValidArrLen($scope.addProducts.serviceTypeList) === 0) {
            layer.alert("服务类型至少定义一种");
            return;
        }

        //判断图片是否上传
        if (!$scope.productPicture) {
            layer.alert("请上传商品图片");
            return;
        }
        ProductService.add_product(ret, function (data) {
            if (data['code'] == 'success') {
                $state.go('main.business_home.product_list');
            } else {
                layer.alert(data['msg']);
            }
        });
    };

    //取消
    $scope.addGoodBackClick = function () {
        location.href = "#business_manager";
        sessionStorage.isTabClick = "1"
    };
    
    /*//三个编辑器
    var editor1 = new wangEditor('server');
    var editor2 = new wangEditor('sebeNic');
    var editor3 = new wangEditor('usquestion');
    editor1.config.uploadImgUrl = editor2.config.uploadImgUrl = editor3.config.uploadImgUrl = '/products/pictureinterface.htm';
    editor1.config.uploadImgFileName = editor2.config.uploadImgFileName = editor3.config.uploadImgFileName = 'pictureinterface';
    editor1.config.uploadParams = editor2.config.uploadParams = editor3.config.uploadParams = commonService.externalParams();
    editor1.create();
    editor2.create();
    editor3.create();
    // 避免上面编辑器的 dropPanel 被下面的编辑器遮挡，保证下面的编辑器的 z-index 要小于上面的编辑器
    editor1.$editorContainer.css({'z-index': 20})
    editor2.$editorContainer.css({'z-index': 10})
    editor3.$editorContainer.css({'z-index': 9})*/
});

