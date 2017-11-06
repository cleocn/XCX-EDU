
//获取应用实例
var app = getApp()
var util = require('../../common/util.js')
var config = require('../../config');
// pages/action/selectAction.js
//var actId = ''
//var storeData={};
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var openId = '';
Page({
  data: {
    userInfo: {},
    myClass: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },


  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.setData({
      userInfo: app.gData.userInfo
    })


    this.setData({
      myClass: this.data.userInfo.class
    })

    this.getClassInfo()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  getClassInfo: function () {
    var that = this;
    that.data.myClass.forEach(function (item, index, arr) {
      console.log("item", item);
      console.log("index", index);
      console.log("arr", arr);

      var myCourse = {}

      switch (item.courseId) {
        case '100001':
          that.data.myClass[index].course = "微信小程序全栈开发从入门到项目实战"
          break;
        case '100002':
          that.data.myClass[index].course = "微信小程序全栈开发基础"
          break;
        case '100003':
          that.data.myClass[index].course = "软件开发入门"
          break;
        case '100004':
          that.data.myClass[index].course = "J2EE企业级开发"
          break;
        case '100005':
          that.data.myClass[index].course = "软件测试";
          break;
        default:
          that.data.myClass[index].course = "你还没有预约课程！";

      }
    })
    that.setData({
      myClass: that.data.myClass
    });
  }
})