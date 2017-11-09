//app.js

var bmap = require('/libs/bmap-wx.js');
var wxMarkerData = [];
var config = require('./config');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  
    wx.getSetting({
      success: res => {
        console.log("wx.getSetting.res:", res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("wx.getUserInfo.res1:", res);
              // 可以将 res 发送给后台解码出 unionId
              this.gData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 未经授权
          wx.getUserInfo({
            success: res => {
              console.log("wx.getUserInfo.res2:", res);
              // 可以将 res 发送给后台解码出 unionId
              this.gData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
       
       this.wxlogin();
      }
    })
    


  },
  wxlogin:function(){
    // 登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("wx.login.res:", res);
        var iData = {};
        iData.code = res.code;
        wx.request({
          url: this.gData.iServerUrl + '/wxLogin',
          data: iData,
          success: function (res) {
            console.log("获取openId：", res.data)
            //获取登录坐标
            that.updateLocation();
            var openId = res.data.openid;
            
            // 获取用户信息
            that.gData.userInfo.openId = openId;
            //业务登陆
            that.login();  
          },

          fail: function (res) { }
        })

        
      }
    })
  },

  login: function () {

    var that = this;
    console.log("根据openID进行业务登陆",this.gData.userInfo);
    var iData = that.gData.userInfo;
     
    
    wx.request({
      url: that.gData.iServerUrl + '/myLogin',
      data: iData,
      success: function (res) {
        console.log("业务登陆",res)
        that.gData.userInfo = res.data[0];
        
      }
    })

  },


  updateLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // success    
        that.gData.location.longitude = res.longitude
        that.gData.location.latitude = res.latitude

        console.log("location:", that.gData.location);
        that.loadCity(that.gData.location.longitude, that.gData.location.latitude);

        //that.loadCity(that.gData.longitude, that.gData.latitude)
      },
      fail: function (res) {
        console.log("fail:", res)
      },
      complete: function (res) {
        console.log("complete:", res)
      }
    })

  },

  loadCity: function (longitude, latitude) {
    console.log("获取登录城市信息")
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.ak + '&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success    
        console.log("百度定位信息", res);
        var addr = res.data.result.addressComponent.city+
          res.data.result.addressComponent.district+
          res.data.result.addressComponent.street;
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        that.gData.location.city = city;
        that.gData.location.district = district;

        try {
          wx.setStorageSync('addr', addr)
        } catch (e) {
        }
        
      },
      fail: function () {
        that.gData.cityName = "";
      },

    })
  },



  /******************************************************************** */
  gData: {
    userInfo: null,
    iServerUrl: "https://isoft-info.com",
  //  iServerUrl: "https://localhost:443",
    location: {},

  }
})