//index.js
//获取应用实例
var app = getApp()
var config = require('../../libs/config.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    addr:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shcool: [],
    index: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509118528965&di=5ed66f58831ec879631d100b56ef59df&imgtype=0&src=http%3A%2F%2Fimg.365128.com%2Fk12%2Fkre%2Ftgre12-64-so.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509118315727&di=9a567288d4d4320d035a2bbacafd9560&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D3215315645%2C493908665%26fm%3D214%26gp%3D0.jpg'
    ],
    toutiao: [
      '乘风破浪，开张大吉！',
      '合作伙伴招募,乘风破浪，开张大吉！新人大礼包，速速领取！',
      '合作伙伴招募'
    ],
    course: [
      { id: 4, name: "微信小程序全栈工程师", fee: 99, time: 980, enrPeople: 9, planPeople: 30, type: "晚班"}],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },
  //事件处理函数
  bindViewTap: function() {
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

  listCourse:function(e){
    var that = this;
    wx.request({
      url: app.gData.iServerUrl +'/listCourse',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          course: res.data
        })
      }
    })
  },
  onShow:function(e){
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
