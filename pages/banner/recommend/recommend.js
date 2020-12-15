// pages/video/recommend/recommend.js
//引入域名
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //电影详情页获取回来的数据放在数组里边
    content: [],
    //视频下边的文本控制出现与否
    hiddenName: true,
    //简介下边分享的图标，在一开始的时候只有一个出现，使用if else来实现
    No: true,
    //简介里边的演员详情内容
    images: [],
    //控制阴影背景的出现与否
    xuanfu: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取列表的id值
    var recoming = options.id;
    console.log(options)
    //接着请求数据的接口
    var recomingData = app.globalData.movies + '/broadcast/' + recoming;
    //调用清酒接口的函数
    this.recomingCont(recomingData)

  },
  //请求详情页
  recomingCont: function (recomingData) {
    wx.request({
      url: recomingData,
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        console.log(res)
        this.setData({
          content: res.data,
          images: res.data.images
        })
      },
    })
  },
  //点击简介，进行右边小三角的图标控制
  Videotou: function () {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },

  //评论区的点击事件
  clickMe: function () {
    this.setData({
      xuanfu: !this.data.xuanfu
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