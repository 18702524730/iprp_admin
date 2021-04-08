"use strict";
var host = location.host;
var rootConfig = {
	indexUrl: '//www.ipsebe.com',
	cartUrl: '//cart.ipsebe.com',
	adminUrl: '//admin.ipsebe.com',
	czUrl: '//cz.ipsebe.com',
}
if (host.indexOf('localhost') === 0) {
	rootConfig = {
		indexUrl: '//localhost:9000',
		cartUrl: '//localhost:9000/portalsite-cnsebe',
		adminUrl: '//localhost:9000',
		czUrl: '//localhost:9000/cz',
	}
}else if(host.indexOf('test') === 0){
	rootConfig = {
		indexUrl: '//testwww.ipsebe.com',
		cartUrl: '//testcart.ipsebe.com',
		adminUrl: '//testadmin.ipsebe.com',
		czUrl: '//testcz.ipsebe.com',
	}
}else if(host.indexOf('pre') === 0){
	rootConfig = {
		indexUrl: '//prewww.ipsebe.com',
		cartUrl: '//precart.ipsebe.com',
		adminUrl: '//preadmin.ipsebe.com',
		czUrl: '//precz.ipsebe.com',
	}
}
window.rootConfigNew = rootConfig
var options = {};
options.api = {};
options.api.root_url = "/iprp_operator"
options.api.base_url = "/iprp_operator/api";
options.api.app_url = "/iprp_app/api";
options.api.win_url = rootConfig.cartUrl+"/luckdraw";

options.css = {};
options.css.current = 'styles/css/skin_1.css';
options.css.skin_0 = 'styles/css/skin_0.css';
options.css.skin_1 = 'styles/css/login.css';

//定义版本时间戳，这儿主要用于控制模块的缓存
window.g_config = {
	timeVersion: $('#allcss').attr('timeversion') || new Date().getTime()
};
