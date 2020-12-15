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
    hiddenName : true,
    //简介下边分享的图标，在一开始的时候只有一个出现，使用if else来实现
    No : true,
    //简介里边的演员详情内容
    images : [],
    //控制阴影背景的出现与否
    xuanfu : true,
    //返回对应电影的id值,因为后端那里是要对象的形式，作为请求接口的参数
    dataurl : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //获取列表的id值
    var recoming = options.id;
    //将获取到的id值
    this.setData({
      dataurl: recoming
    })
    // console.log(recoming)
    //接着请求数据的接口
    var recomingData = app.globalData.movies + '/details/' + recoming;
    //调用清酒接口的函数
    this.recomingCont(recomingData)
    //判断是否该电影呗收藏,看后端的接口里边，里边要传对应的电影id值
    var judgeData = app.globalData.movies + '/userfavs/' + this.data.dataurl;
    //调用是判断是否收藏对应的函数
    this.judgeCont(judgeData);

  },
  //请求详情页
  recomingCont: function (recomingData) {
    wx.request({
      url: recomingData,
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success : (res) => {
        console.log(res)
        this.setData ({
          content : res.data,
          images : res.data.images
        })
      },
    })
  },
  //添加收藏
  collectioncont : function () {
    //收藏的时候，后端会返回一个错误"身份信息未确认""
    //解决方法就是，去除用户的是否有登录态，然后登录态进行转码系列的操作
    //取出登录态
    var wxuser = (wx.getStorageSync('openIs'));
    
    //将一个字符串转化成对象
    var jwt = JSON.parse(wxuser);
    // console.log(jwt)

    //先调用接口，进行收藏的接口的请求,进行接口的请求
    wx.request({
      url: app.globalData.movies + "/userfavs/",
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': `JWT ${jwt}`
      },
      data: {
        goods: this.data.dataurl
      },
      success : (res) => {
        console.log(res);
        this.setData({
          No: false
        });
        wx.showToast({
          title : '收藏成功',
          icon: 'success',
          duration: 1200
        })
      },
      fali : (err) => {
        console.log(err)
      }
    })
  },
  //判断是否收藏
  judgeCont: function (judgeData) {
    wx.request({
      url: judgeData,
      method : 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': `JWT ${JSON.parse(wx.getStorageSync('openIs'))}`
      },
      success : (res) => {
        console.log(res);
        var detail = res.statusCode;
        if (detail === 404) {
          this.setData({
            No: true
          })
        }else {
          this.setData({
            No: false
          })
        }
      },
      fail : (err) => {
        console.log(err);
      }
    })
  },
  //取消收藏
  already : function () {
    wx.request({
      url: app.globalData.movies + '/userfavs/' + this.data.dataurl,
      method: 'DELETE',
      header: {
        'content-type': 'application/json',
        'Authorization': `JWT ${JSON.parse(wx.getStorageSync('openIs'))}`
      },
      success: (res) => {
        console.log(res)
        this.setData({
          No: true
        })
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },




  //点击简介，进行右边小三角的图标控制
  Videotou :function () {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },

  //评论区的点击事件
  clickMe : function () {
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