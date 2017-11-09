var util = require("../../common/util")
var app = getApp();
Page({
  data: {
    actId: '',
    mainSeq: '',
    isShow: false,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    content: "",//评论框的内容
    isLoading: false,//是否显示加载数据提示
    disabled: true,
    cfBg: false,
    _index: 0,
    consult: [],
    replyConsult: [],
    title: '全部回复'//页面标题
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      mainSeq: options.mainSeq,
    });
    that.findReplyConsultBySeq();
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
      for (var i = 0; i < 5; i++) {
        conArr.push({
          avatar: app.gData.userInfo.avatarUrl,
          uName: "我是" + i,
          time: util.formatTime2(new Date()),
          content: "我是上拉加载的新数据" + i
        })

      }
      //模拟网络加载
      setTimeout(function () {
        that.setData({
          replyFeedback: that.data.replyFeedback.concat(conArr)
        })
      }, 1000)
    } else {
      that.setData({
        isLoading: false
      })
    }
    ++that.data._index;
  },

  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value
    })

  },
  //文本域获得焦点事件处理
  textAreaFocus: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },

  //发送评论评论 事件处理
  bindFormSubmit: function (e) {
    var word = e.detail.value.textarea;
    var that = this,
      conArr = [];
   
    let id = util.uuid(30, 16);
    if (word.trim().length > 0) {
      conArr.push({
        seq: id,
        mainSeq: that.data.mainSeq,
        openId: app.gData.userInfo.openId,
        nickName: app.gData.userInfo.nickName,
        message: word,
        consultDate: util.formatTime2(new Date()),
        avatarUrl: app.gData.userInfo.avatarUrl,
      })

      //数据发送到后台保存
      console.log("conArr", conArr[0]);
      wx.request({
        url: app.gData.iServerUrl+ '/addReplyConsult',
        data: { //comment: conArr[0] 
          seq: id,
          mainSeq: that.data.mainSeq,
          openId: app.gData.userInfo.openId,
          nickName: app.gData.userInfo.nickName,
          message: word,
          consultDate: util.formatTime2(new Date()),
          avatarUrl: app.gData.userInfo.avatarUrl,
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        success: function (res) {
          let result = res.data;
         // console.log("*******insert REPLY", result);
        },
        fail: function (res) { }
      })  //end request

      that.setData({
        replyConsult: that.data.replyConsult.concat(conArr),
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

  findReplyConsultBySeq: function () {
    var that = this;
   
    console.log("mainSeq", that.data.mainSeq);
    wx.request({
      url: app.gData.iServerUrl + '/listReplyConsult',
      data: {
        mainSeq: that.data.mainSeq
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let result = res.data;
        console.log("*******reply message", result);

        that.setData({
          consult: result.consult[0],
          replyConsult: result.replyConsult
        });
      },
      fail: function (res) {
        console.log("查询回复失败");
      }
    })  //end request
  },


})