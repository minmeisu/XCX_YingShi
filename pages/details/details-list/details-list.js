// pages/details/details-list/details-list.js
var app = getApp();
//引入html插件的组件文件
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取跳转页面的id值
    var routineing = options.id;
    //跳转到电影详情页的接口请求
    var routineData = app.globalData.movies + "/film/" + routineing;
    //调用接口请求的函数
    this.routinecont(routineData);
    
   

  },

  //请求页的函数请求
  routinecont: function (routineData) {
    wx.request({
      url: routineData,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success : (res) => {
        console.log(res);
        var Article = res.data.goods_desc;
        WxParse.wxParse('article', 'html', Article, this)
        this.setData({
          content : res.data,

        })
      },
      fail : (err) => {
        console.log(err)
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
  
  }
})