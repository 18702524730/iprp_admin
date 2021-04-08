angular.module('iprpAdminApp').directive('contenteditable', function() {
    return {
        restrict: 'A' ,
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            // 初始化 编辑器内容
            if (!ngModel) {
                return;
            } // do nothing if no ng-model
            
            // 创建编辑器
            var editor = new wangEditor('#'+element.attr('id'));
            element.on('keyup', function() {
                scope.$apply(function() {
                    var html = editor.$textElem.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html === '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                });
            });
            editor.customConfig.uploadImgServer = options.api.base_url + '/products/pictureinterface';
            editor.customConfig.uploadImgMaxLength = 1;
            editor.customConfig.uploadFileName = "Filedata";
            editor.customConfig.uploadImgParams = {};
            editor.customConfig.onchange = function (html) {
                // html 即变化之后的内容
                ngModel.$setViewValue(html);
                console.log(html)
            }
            editor.customConfig.uploadImgHooks = {
                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    console.log(result)
                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    var url = result.url
                    insertImg(url)
                    editor.change&&editor.change()
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };
            // Write data to the model
            editor.create(); 
            // document.getElementById('#'+element.attr('id')).addEventListener('click', function () {
            //     // 如果未配置 editor.customConfig.onchange，则 editor.change 为 undefined
            //     editor.change && editor.change()
            // })
            // Specify how UI should be updated
            ngModel.$render = function() {
                editor.$textElem.html(ngModel.$viewValue || '');
            };
        }
    };
});
