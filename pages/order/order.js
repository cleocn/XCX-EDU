// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: ['上午班', '下午班', '晚班'],
    index: 0,
    classId: 0,
    courseId: 0,
    userInfo: {},
    classInfo: {},
    phone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("order options:", options);
    var temp = {};
    temp.classId = options.classId;
    temp.courseId = options.courseId;
    temp.courseName = options.courseName;
    temp.teacher = options.teacher;
    temp.add = options.add;
    temp.fee = options.fee;
    temp.time = options.time;
    temp.date = options.date;
    temp.startDate = options.startDate;
    temp.startDate = options.endDate;


    this.setData({
      userInfo: app.gData.userInfo,
      classInfo: temp
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  orderSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log("app.gData", app.gData);
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写您的姓名',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    else if (e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        content: '请填写您的电话',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    else {
      var iData = e.detail.value;
      iData.classId = this.data.classInfo.classId;
      iData.courseId = this.data.classInfo.courseId;
      iData.nickName = app.gData.userInfo.nickName;
      iData.avatarUrl = app.gData.userInfo.avatarUrl;
      iData.openId = app.gData.userInfo.openId;

      wx.request({

        url: app.gData.iServerUrl + '/inClass',
        data: iData,
        method: "POST",
        success: function (res) {
          console.log(res.data)
          if (res.data.length > 0) {
            wx.showModal({
              title: '提示',
              content: '您已经预约该班级',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '预约成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }

        }
      })
    }
  },

  pay: function () {

    console.log("微信支付测试");

    var d = new Date();
    var nonceStr = this.rand32();
    console.log("nonceStr:", nonceStr);
    wx.requestPayment(
      {
        'timeStamp': d.getTime() + "",
        'nonceStr': nonceStr,
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { console.log("微信支付测试-success", res); },
        'fail': function (res) { console.log("微信支付测试-fail", res); },
        'complete': function (res) { console.log("微信支付测试-complete", res); }
      })

  }
  ,
  getPhoneNumber: function (e) {
    console.log("getPhoneNumber", e);
    var that = this;
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        var iData = {}
        iData.encryptedData = e.detail.encryptedData;
        iData.iv = e.detail.iv;
        iData.openId = app.gData.userInfo.openId;
        wx.request({
          data: iData,

          url: app.gData.iServerUrl + '/getPhone',

          success: function (res) {

            console.log("getPhoneNumber-success", res);
            that.setData({
              phone: res.data.phone
            })

          },
          fail: function (res) {

            console.log("getPhoneNumber-fail", res);

          }
        })


      },
      fail: function () {
        //登录态过期
        // wx.login() //重新登录
        console.log("登录态过期");

      }
    })


  }
})