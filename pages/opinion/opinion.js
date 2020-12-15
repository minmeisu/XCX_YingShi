// pages/opinion/opinion.js
// 引入域名
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取留言的内容
    messageall: [],
    //留言内容渲染
    nickName: '',
    avatarUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取留言
    this.messageData();
    //取出登录态
    this.checklogin();
  },

  //添加留言的功能
  bindFormSubmit : function (e) {
    // console.log(e)
    var message = e.detail.value.textarea;
    //处理留言为空的情况
    if (message === "") {
      wx.showToast({
        title: '留言不能为空',
        icon: 'success',
        duration: 1500
      });
      return false;
    }
    //提交留言的功能
    wx.request({
      url: app.globalData.movies + '/messages/',
      method: 'POST',
      header : {
        'content-type': 'application/json',
        'Authorization': `JWT ${JSON.parse(wx.getStorageSync('openIs'))}`
      },
      data: {
        message: message
      },
      success : (res) => {
        console.log(res);
        // post提交留言成功,然后再向后台请求下来提交的数据
        this.messageData();
        //及时反馈
        wx.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail : (err) => {
        console.log(err);
      }
    })

  },
  //获取留言的内容
  messageData : function () {
    wx.request({
      url: app.globalData.movies + "/messages/",
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': `JWT ${JSON.parse(wx.getStorageSync('openIs'))}`
      },
      success: (res) => {
        console.log('GET的留言')
        console.log(res)
        this.setData({
          messageall: res.data

        })
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  //取出登录态
  checklogin: function () {
    var that = this
    var wxuser = wx.getStorageSync('openIs')
    if (wxuser) {
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          })
        },
        fail: function (error) {
          console.log(error)
        }
      })
    } else {
      console.log('没有登录态')
    }
  },


})