angular.module('iprpAdminApp').controller('AddBannerCtrl',function($scope,$modal,SbbService,$stateParams,Upload,orderService){
  $('#sbb_banner').addClass("selected").parent().siblings().children().removeClass("selected");
  $scope.obj = {jumpType: 1, title: '', summary: '', category: 1,barColor: '', bgColor: ''};
  $scope.startTime = ''
  $scope.endTime = ''
  
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
  editor.create()

  $scope.getDetail = function(){
    SbbService.findEvaluateGoodsDetail({id: $stateParams.id},function(data){
      console.log(data)
      if (data.params) {
        var arr = data.params.split('&');
        data.barColor = arr.length > 1 ? arr[1] : ''
        data.bgColor = arr[0];
      }
      $scope.obj = data;
      $scope.startTime = data.effectiveStartTime
      $scope.endTime = data.effectiveEndTime
      if ($scope.obj.jumpType == 2 && $scope.obj.content) {
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
    if ($scope.obj.effectiveStartTime) {
      console.log('effectiveTime, startTime', $scope.startTime, new Date($scope.obj.effectiveStartTime).getTime())
      if ($scope.startTime == new Date($scope.obj.effectiveStartTime).getTime()){
        $scope.obj.effectiveStartTime = new Date($scope.obj.effectiveStartTime).getTime()
      } else {
        $scope.obj.effectiveStartTime = new Date($scope.obj.effectiveStartTime).getTime() + 8*3600*1000;
      }
    }
    if ($scope.obj.effectiveEndTime) {
      console.log('effectiveTime, endTime', $scope.endTime, new Date($scope.obj.effectiveEndTime).getTime())
      if ($scope.endTime == new Date($scope.obj.effectiveEndTime).getTime()) {
        $scope.obj.effectiveEndTime = new Date($scope.obj.effectiveEndTime).getTime()
      } else {
        $scope.obj.effectiveEndTime = new Date($scope.obj.effectiveEndTime).getTime() + 8*3600*1000;
      }
    }
    
    if (!obj.title) {
      layer.msg('请输入标题');
      return;
    }
    if (!obj.sort) {
      layer.msg('请输入排序号')
      return
    }
    if (!/^\d+$/.test(obj.sort)) {
      layer.msg('排序号请输入非负整数')
      return
    }
    if (!obj.url) {
      layer.msg('请上传banner图')
      return;
    }
    if (!obj.bgColor) {
      layer.msg('请上传banner背景色')
      return;
    }
    if (!obj.barColor) {
      layer.msg('请上传banner对应小程序头部背景色')
      return;
    }
    if (obj.jumpType == 1) {
      if (!obj.jumpUrl) {
        layer.msg('请输入banner链接')
        return;
      }
    } else {
      // 富文本内容
      if (editor.txt.html() === '<p><br></p>') {
        layer.msg('请输入富文本内容')
        return;
      }
      console.log('content', editor.txt.text())
      $scope.obj.content = editor.txt.html();
    }
    var object;
    if ($stateParams.id) {
      object = $.extend({}, $scope.obj, {id: $stateParams.id});
    } else {
      object = $.extend({}, $scope.obj);
    }
    $scope.obj.params = $scope.obj.bgColor + '&' + $scope.obj.barColor;
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

