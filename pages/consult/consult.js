var util = require("../../common/util")
var app = getApp();
Page({
  data: {
    isShow: false,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    message: "",//评论框的内容
    isLoading: false,//是否显示加载数据提示
    disabled: true,
    cfBg: false,
    _index: 0,
    consult: [],
    id: '',
    title: '课程咨询'//页面标题
  },
  onLoad: function (options) {
    var that = this;
    that.findAllConsult();
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
    this.findAllConsult();
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
  // textAreaBlur: function (e) {
  //   //获取此时文本域值
  //   console.log(e.detail.value)
  //   this.setData({
  //     message: e.detail.value
  //   })
  //   console.log('message', this.data.message)
  // },
  //文本域获得焦点事件处理
  // textAreaFocus: function () {
  //   this.setData({
  //     isShow: false,
  //     cfBg: false
  //   })
  // },
  

  //发送评论评论 事件处理
  bindFormSubmit: function (e) {
    var word = e.detail.value.textarea;
    var that = this,
      conArr = [];
    let id = util.uuid(30, 16);
    if (word.trim().length > 0) {
      conArr.push({
        seq: id,
        openId: app.gData.userInfo.openId,
        nickName: app.gData.userInfo.nickName,
        message: word,
        consultDate: util.formatTime2(new Date()),
        avatarUrl: app.gData.userInfo.avatarUrl
       
      })

      //数据发送到后台保存
      console.log("conArr", conArr[0]);
      wx.request({
        url: app.gData.iServerUrl + '/addConsult',
        data: { 
          seq: id,
          openId: app.gData.userInfo.openId,
          nickName: app.gData.userInfo.nickName,
          message: word,
          consultDate: util.formatTime2(new Date()),
          avatarUrl: app.gData.userInfo.avatarUrl

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
        consult: that.data.consult.concat(conArr),
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
  findAllConsult: function () {
    var that = this;
    wx.request({
      url: app.gData.iServerUrl + '/listConsult',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let result = res.data;
        console.log("*******测试留言message", result);
        that.setData({
          consult: result
        });
      },
      fail: function (res) {
        console.log("查询评论失败");
      }
    })  //end request
  },
})