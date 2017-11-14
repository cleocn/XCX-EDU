//index.js
//获取应用实例
var app = getApp()
var config = require('../../libs/config.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    addr: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shcool: [],
    index: 0,
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509506213863&di=7badcf8a1373a5edb92e0f53e64131bc&imgtype=0&src=http%3A%2F%2Fs1.51cto.com%2Fimages%2F201609%2Fa2a4d6a694e784c576e543c87d0ff1b4682c52.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509116573262&di=0eb9799b3322c80eafa8ad7f4effcf9e&imgtype=0&src=http%3A%2F%2Fjiuye-res.jikexueyuan.com%2Fzhiye%2Fshowcase%2Fattach-%2F20160930%2F9a81a7f2-9c90-49d1-aa3b-fa1d36c3ab32.jpg',
      'http://www.kubikeji.com/uploads/allimg/150820/1-150R01J3095Y.jpg',
      'http://ty.java.tedu.cn/upload/20170421/20170421134951_530.jpg',
      'https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCd0icrViaAR6q6tUZLhoxfuttxD8LeBY9SYjhl56fYYrmwVtj5kJ99EiaOUcWRicU2wdM/510'

    ],
    toutiao: [
      '乘风破浪，开张大吉!',
      '新生入学享多重好礼',
      '还在等什么? 赶紧报名吧!'
    ],
    course: [
      { id: 4, name: "微信小程序全栈工程师", fee: 99, time: 980, enrPeople: 9, planPeople: 30, type: "晚班"}],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    this.setData({
      userInfo: app.gData.userInfo,
      shcool: config.shcool
    })

    try {
      var value = wx.getStorageSync('addr')
      //  if (value) {
      this.setData(
        {
          addr: value || '',

        })
      //  }
    } catch (e) {
      // Do something when catch error
    }
    // if (app.gData.userInfo) {
    //   this.setData({
    //     userInfo: app.gData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.gData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

    this.listCourse();
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.gData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  listCourse: function (e) {
    var that = this;
    wx.request({

      url: app.gData.iServerUrl +'/course',

      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          course: res.data
        })
      }
    })
  },
  onShow: function (e) {
    this.listCourse();
  },

  bindPickerChange: function (e) {
    let index = e.detail.value
    wx.openLocation({
      latitude: config.Comp[index].latitude,
      longitude: config.Comp[index].longitude,
      scale: config.Comp[index].scale,
      name: config.Comp[index].name,
      address: config.Comp[index].address,
    })
  },
})
