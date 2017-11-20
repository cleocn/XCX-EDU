var util = require("../../common/util")
var app = getApp();
//var util = require('../../common/util.js');
var config = require('../../config');
Page({
  data: {
    isShow: false,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    message: "",//评论框的内容
    isLoading: false,//是否显示加载数据提示
    disabled: true,
    cfBg: false,
    _index: 0,
    messages: [],
    id: '',
    title: '用户反馈'//页面标题
  },
  onLoad: function (options) {
    var that = this;
    that.findAllMessage();
  },

  onReady: function () {
    // 页面渲染完成
    //设置当前标题
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  onShow: function () {
    // 页面显示
    this.findAllMessage();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //上拉加载
  onReachBottom: function () {
    var conArr = [], that = this;
    that.data.cfBg = false;
    console.log("onReachBottom")
    if (that.data._index < 5) {
      // for (var i = 0; i < 5; i++) {
      //   conArr.push({
      //     avatar: app.gData.userInfo.avatarUrl,
      //     uName: "雨碎江南",
         }
     
    ++that.data._index;
  },

  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      message: e.detail.value
    })
    console.log('message', this.data.message)
  },
  //文本域获得焦点事件处理
  textAreaFocus: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },
  

  //发送评论评论 事件处理
  send: function () {
    var that = this,
      conArr = [];
    let id = util.uuid(30, 16);
    if (that.data.message.trim().length > 0) {
      conArr.push({
        seq: id,
        feedType: '1',
        openId: app.gData.userInfo.openId,
        nickName: app.gData.userInfo.nickName,
        message: that.data.message,
        feedDate: util.formatTime2(new Date()),
        avatarUrl: app.gData.userInfo.avatarUrl,
      })

      //数据发送到后台保存
      console.log("conArr", conArr[0]);
      wx.request({
        url: config.iServerUrl + '/edu' + '/addMessage',
        data: { 
          seq: id,
          feedType:'1',
          openId: app.gData.userInfo.openId,
          nickName: app.gData.userInfo.nickName,
          message: that.data.message,
          feedDate: util.formatTime2(new Date()),
          avatarUrl: app.gData.userInfo.avatarUrl,
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        success: function (res) {
          let result = res.data;
          console.log("*******insert message", result);
        },
        fail: function (res) { }
      })  //end request
      that.setData({
        messages: that.data.messages.concat(conArr),
        message: "",//清空文本域值
        isShow: false,
        cfBg: false
      })
    } else {
      that.setData({
        message: ""//清空文本域值
      })
    }

  },
  findAllMessage: function () {
    var that = this;
    wx.request({
      url: config.iServerUrl + '/findAllMessage',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let result = res.data.data;
        console.log("*******测试留言message", result);

        that.setData({
          messages: result
        });
      },
      fail: function (res) {
        console.log("查询评论失败");
      }
    })  //end request
  },
})