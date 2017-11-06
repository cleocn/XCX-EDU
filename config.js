/**
 * 小程序配置文件
 */

//公共参数常量
var ak = 'bfwtSbwjqSnIPWGIjKssrQdsPZn0Q87g';                  //调用百度key
var iServerUrl = "https://yfaq43ae.qcloud.la/weapp";          //服务器地址

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://yfaq43ae.qcloud.la';
//var host ='673695795.isoft-lbs.club';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};




module.exports = config;
module.exports.ak = ak;
module.exports.iServerUrl = iServerUrl;