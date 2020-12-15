// pages/collection/collection.js
//引入域名
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow : function (options) {
    //我的收藏,查看我的收藏的列表接口
    var collect = app.globalData.movies + "/userfavs/";
    //调用我的收藏对应的接口
    this.collectData(collect);

  },
  //调用我的收藏的接口，以及里边对应的函数
  collectData: function (collect) {
    wx.request({
      url: collect,
      method : 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': `JWT ${JSON.parse(wx.getStorageSync('openIs'))}`
      },
      success : (res) => {
        console.log(res);
        this.setData({
          collect: res.data
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