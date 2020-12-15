// pages/story/story.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //电影列表的请求接口
    var video = app.globalData.movies + "/video/";
    //调用电影列表的函数，里边有请求的地址
    this.videoData(video);
  },

  //请求列表的数据
  videoData: function (video) {
    wx.request({
      url: video,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success : (res) => {
        console.log(res);
        this.setData({
          loading: false,
          video : res.data
        })
      },
      fail : (err) => {
        console.log(err);
      }
    })
  },

  //详情页跳转到对应的详情页
  Routine : function (e) {
    var p = e.currentTarget.id;
    wx.navigateTo({
      url: '../details/details-list/details-list?id=' + p,
    })
  }
})