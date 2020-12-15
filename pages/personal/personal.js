// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasuserinfo: true,
    avatarUrl : {},
    nickName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var wxuser = (wx.getStorageSync('openIs'));
    console.log('onLoad登录态是否存在:' + wxuser) ;
    if (wxuser) {
      wx.getUserInfo({
        success: (infores) => {
          that.setData({
            nickName: infores.userInfo.nickName,
            avatarUrl: infores.userInfo.avatarUrl,
            hasuserinfo: false
          })
        },
        fail : (err) => {
          console.log('获取用户信息失败')
        }
      })
    }else{
      console.log('没有登录');
      that.setData({
        hasuserinfo: true
      })
    }
  },
  //取到code
  login : function () {
    //保留外边的this
    var that = this;
    //按钮里边点击的方法
    wx.login({
      success : (res) => {
        console.log(res);
        //如果有code的话
        if (res.code) {
          //发起网络请求,将code发送到开发服务器那里
          wx.getUserInfo({
            success : (infores) => {
              console.log(infores);
              // console.log(1)
              wx.request({
                url: 'http://www.thexxdd.cn/program/',
                data : {
                  code: res.code
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);
                  //将用户登录的身份识别的标识token转化成字符串形式
                  var token = JSON.stringify(res.data.token);
                  //将用户的身份标识信息存储起来
                  wx.setStorageSync('openIs', token)
                  //判断用户的登录态是否存在
                  var wxuser = (wx.getStorageSync('openIs'));
                  console.log('登录态是否存在:' + wxuser);
                  if (wxuser) {
                    that.setData({
                      nickName: infores.userInfo.nickName,
                      avatarUrl: infores.userInfo.avatarUrl,
                      hasuserinfo :false
                    })
                  }else{
                    that.setData({
                      hasuserinfo: true
                    })
                    wx.showToast({
                      title: '服务器出错',
                      icon: 'success_no_circle',
                      duration: 2000
                    })
                  }
                },
                fail: function (error) {
                  console.log(error)
                }
              })
            },
            fail : (err) => {
              console.log("用户拒绝了登录")
            }
          })

        }
      }
    })
  },
  //我的收藏
  collection : function () {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },

//意见反馈
message : function () {
  wx.navigateTo({
    url: '../opinion/opinion',
  })
}

})