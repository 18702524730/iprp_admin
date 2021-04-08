angular.module('iprpAdminApp').controller('AddRuleCtrl',function($scope,$modal,SbbService,$stateParams,Upload,orderService){
  $('#sbb_rule').addClass("selected").parent().siblings().children().removeClass("selected");
  $scope.obj = {title: '', category: 7,jumpType: 2};
  $scope.range = function(n) {
      return new Array(n);
  }
  $('#startCreateDate,#startPickDate,#endPickDate,#endCreateDate').datetimepicker({
    minView: "0", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd hh:ii',
    todayHighlight: true,
    todayBtn:  1,
    autoclose: true
  });
  var E = window.wangEditor
  var editor = new E('#sbbEditor');
    // 自定义菜单配置
  editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    'table',  // 表格
    'undo',  // 撤销
    'redo'  // 重复
  ]
  // 或者 var editor = new E( document.getElementById('editor') )
  // <img src="https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/42ED2667A64F6D03121FB64DD3A5070C.png" style="max-width:100%;"><br>
  editor.create();

  $scope.getDetail = function(){
    SbbService.findEvaluateGoodsDetail({id: $stateParams.id},function(data){
      console.log(data)
      $scope.obj = data;
      if ($scope.obj.content) {
        editor.txt.html($scope.obj.content)
      }
    },function(error){
      alert(error.data.msg);
    });
  };
  if ($stateParams.id) {
    $scope.getDetail();
  }

  
    /**
     * 上传图片
     */
    $scope.uploadFile = function (file, type) {
      var MAX_POST_SIZE = 10 * 1024 * 1024;
      if(file && file.size > MAX_POST_SIZE){
          alert("上传图片请小于10M");
      } else {
          Upload.upload({
              url: options.api.base_url + '/file/upload',
              data: {Filedata: file}
          }).then(function (resp) {
            if (type === 'add') {
              console.log('test')
              if (resp.data.url) {
                if (editor.txt.html() === '<p><br></p>') {
                  editor.txt.html('<img src="'+ resp.data.url +'" style="max-width:100%;"><br>')
                } else {
                  editor.txt.append('<img src="'+ resp.data.url +'" style="max-width:100%;"><br>')
                }
              }
            } else {
              resp = resp.data;
              $scope.obj.url = resp.url
              console.log(resp)
            }
          });
      }
  };
  // 选择类型事件
  $scope.checkType = function (val) {
    console.log($scope.obj)
  }

  $scope.addGoodClick = function () {
    var obj = $scope.obj;


    if (!obj.title) {
      layer.msg('请输入标题');
      return;
    }
    console.log('editor', editor.txt.html());
    // 富文本内容
    if (editor.txt.html() === '<p><br></p>') {
        layer.msg('请输入详情内容')
        return;
    }
    console.log('content', editor.txt.text())
    $scope.obj.content = editor.txt.html();
    var object;
    if ($stateParams.id) {
      object = $.extend({}, $scope.obj, {id: $stateParams.id});
    } else {
      object = $.extend({}, $scope.obj);
    }
    SbbService.addAndUpdateMarketingContent($scope.obj, function(data){
      layer.msg('操作成功');
      history.go(-1);
      // $scope.getDetail();
    });
    console.log(editor.txt.html(), $scope.obj)
  }


   $scope.back = function(){
     history.go(-1);
   };

   $scope.setShow = function(isHide){
     SbbService.updateEvaluateGoodsState({
       id: $stateParams.id,
       isHide: isHide ? 1 : 0
     },function(data) {
       layer.msg('操作成功')
       $scope.getDetail();
     })
   };
});

