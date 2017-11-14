// pages/my/my.js
//获取应用实例
var app = getApp();
var config = require('../../libs/config.js');
var util = require("../../common/util");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    currentTab: 0,
    shcool: [],
    index:0,

  },
  //事件处理函数

  getSystemInfo: function () {
    var res = wx.getStorageSync('systemInfo');

    wx.showModal({
      title: '系统信息',
      //真机换行起作用
      content: "手机型号：" + res.model + "\r\n" +
      "手机品牌：" + res.brand + "\r\n" +
      "设备像素比：" + res.pixelRatio + "\r\n" +
      "屏幕宽度：" + res.screenWidth + "\r\n" +
      "屏幕高度：" + res.screenHeight + "\r\n" +
      "窗口宽度：" + res.windowWidth + "\r\n" +
      "窗口高度：" + res.windowHeight + "\r\n" +
      "微信设置的语言：" + res.language + "\r\n" +
      "微信版本号：" + res.version + "\r\n" +
      "操作系统版本：" + res.system + "\r\n" +
      "系统字体设置：" + res.fontSizeSetting + "\r\n" +
      "客户端基础库版本：" + res.SDKVersion + "\r\n" +
      "客户端平台：" + res.platform + "\r\n",
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        }
      }
    })

  },


  onLoad: function () {
      this.setData({
        shcool: config.shcool
      });
    

  },

  getUserInfo: function () {
    
    var that = this;
    console.log("app.gData.userInfo:", app.gData.userInfo)

    wx.request({
      url: app.gData.iServerUrl + '/user/' + app.gData.userInfo._id,
      success: function (res) {
        console.log("获取用户情况:", res.data[0])
        if (res.data[0].gender == 1) {
          res.data[0].gender = '男';
        } else {
          res.data[0].gender = '女';
        }
        res.data[0].lastLoginTime = util.getLocalTime(res.data[0].lastLoginTime);
        res.data[0].firstLoginTime = util.getLocalTime(res.data[0].firstLoginTime);
        that.setData({
          userInfo: res.data[0]
        })

        app.gData.userInfo = res.data[0];
      }
    })
  },
  onShow: function () {
    // var iData = this.data.userInfo
    // console.log("app.gData.editValue:", app.gData.editValue);
    // if (app.gData.editValue!=""){
    //   iData.description = app.gData.editValue.value;
    //   app.gData.editValue = ""
    // }
    this.getUserInfo();
   
  },

})