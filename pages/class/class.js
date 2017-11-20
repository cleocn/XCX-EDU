// pages/class/class.js
var util = require("../../common/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMember(options.classId, options.courseId);
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
  getMember: function (classId, courseId) {
    console.log("获取班级情况");
    var that = this;
    var iData = {
      classId: parseInt(classId),
      courseId: parseInt(courseId)
    }
    wx.request({
      url: app.gData.iServerUrl + '/edu' + '/listClass',
      data: iData,
      method:"POST",
      success: function (res) {
        console.log("获取班级情况:", res.data);
        for (var i = 0; i<res.data[0].enrPeople.length; i++) {
          res.data[0].enrPeople[i].phone = util.formatPhoneNum(res.data[0].enrPeople[i].phone);
          res.data[0].enrPeople[i].name = util.formatName(res.data[0].enrPeople[i].name);
        }
        that.setData({
          classList: res.data
        })
      }
    })
  }
})