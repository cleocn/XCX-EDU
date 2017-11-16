// pages/course/courseDetail.js

var app = getApp();
var courseId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseInfo: {},
    classList:[],
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换 
  swichNavi: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options:", options);
    
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    courseId = options.courseId;
    this.getCourse(options.id);
    this.showClass(courseId);
  },
  onShow: function () {
    this.showClass(courseId);
    //console.log("------------",options);
  },

  //获取课程详情
  
  getCourse: function (_id) {
    var that = this;
    var iData = {};
    iData.courseId = _id;
    wx.request({
      url: app.gData.iServerUrl + '/course/'+_id,
      //data: iData,
      success: function (res) {
        console.log("获取课程详情", res.data)
        that.setData({
          course: res.data[0]
        })
      }
    })
  },

  //获取班级列表
  showClass:function(id){
    console.log("获取班级列表",id);
    var that = this;
    var iData = {};
    iData.courseId = parseInt(id);
    wx.request({
      url: app.gData.iServerUrl +'/listClass',
      data: iData,
      method:"POST",
      success: function (res) {
        console.log("获取班级列表返回:",res.data)
        that.classList = [];
        that.classList = res.data;

        for (var i = 0; i < res.data.length; i++) {
          that.classList[i].status = false;
          that.classList[i].statusMsg = "我要预约";
          if (that.classList[i].current == that.classList[i].max) {
            that.classList[i].status=true;
            that.classList[i].statusMsg = "已报满";
          }
        }
        that.setData({
          classList: that.classList
        })
      }
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

  order:function(e){
    var that = this;
    console.log("order",e)
    // wx.request({
    //   url: 'https://www.localhost/addCourse',
    //   data:{name:"222"},
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    wx.navigateTo({
      url: '../order/order?classId=' + e.currentTarget.id + 
      "&courseId=" + e.currentTarget.dataset.courseid +
      "&courseName=" + that.data.classList[0].courseName +
      "&teacher=" + that.data.classList[0].teacher +
      "&add=" + that.data.classList[0].add +
      "&fee=" + that.data.classList[0].fee +
      "&time=" + that.data.classList[0].time +
      "&date=" + that.data.classList[0].date +
      "&startDate=" + that.data.classList[0].startDate +
      "&endDate=" + that.data.classList[0].endDate 
    })
  },

  gotoClass:function(e){
    wx.navigateTo({
      url: '../class/class?classId=' + e.currentTarget.id + "&courseId=" + e.currentTarget.dataset.courseid,
    })
  }
})