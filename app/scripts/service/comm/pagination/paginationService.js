angular.module('iprpAdminApp').factory('PaginationService',function() {
    //initPage 初始化时的页码，用于记忆翻页
    var paginationService = function(fetchFunction,pageSize,initPage,isFormPageOne){
        var pagination = {
            curPage: initPage ? initPage-0 : isFormPageOne ? 1 : 0,
            totalCount:0,
            countPerPage:pageSize || 15,
            isFormPageOne: false,
            gotoPage:function(page){
                //from 1 to last;
                var value = Math.floor(this.totalCount/this.countPerPage);
                if(this.totalCount%this.countPerPage === 0 && value !== 0){
                    value--;
                }
                if(page <0){// || page > value
                    return false;
                }else{
                    var self = this;
                    self.curPage = page;
                    fetchFunction(self.curPage,self.countPerPage,function(items,getResponseHeaders){
                        self.allData = items;
                        self.curPageItems = items.elements;
                        self.totalCount = items.total_elements || items.totalElements || 0;
                        // 若存在totalElements表示为新接口，页码从1开始。老接口从0开始，参数为total_elements
                        if (items.totalElements !== undefined) {
                        	self.isFormPageOne = true;
                        }
                    });
                    return true;
                }
            },
            nextPage:function(){
                this.gotoPage(this.curPage+1);
            },
            prePage:function(){
                this.gotoPage(this.curPage-1);
            },
            firstPage:function(){
                this.gotoPage(this.isFormPageOne ? 1 : 0);
            },
            lastPage:function(){
                var value = Math[this.isFormPageOne ? 'ceil': 'floor'](this.totalCount/this.countPerPage);
                this.gotoPage(value);
            }

        };
        pagination.gotoPage(pagination.curPage);

        return pagination;
    };
    return paginationService;
});
