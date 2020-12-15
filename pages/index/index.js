// pages/index/index.js
//引入域名
// var app = getApp();
//引入接口文件
const jiekou = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchxx : false,
    containershow : true,
    banner: [],
    recommend: [],
    hongkong: [],
    //输入框的内容
    value : '',
    //搜索回来的结果
    sousuo : [],
    showsousuo : true,
    //实现上拉加载最关键的页数
    page : 1,
    //加载结束之后的内容提示
    line : false,
  },
//搜索框
  onbindfocus : function (e) {
    // var value = e.detail.value;
        this.setData({
          searchxx : true,
          containershow : false,
         
        })
  },
//搜索
  onbindconfirm : function (e) {
    // console.log(e.detail.value);
    var value = e.detail.value;
    var search = jiekou.search;
    wx.request({
      url: search + value,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: (res) => {
        console.log(res);
        if (res.data.length === 0) {
          this.setData({
            showsousuo : false,
          })
        }else{
          console.log(111)
         this.setData({
           sousuo: res.data,
           showsousuo: true
         })
        }
      },
      fail: function(err) {
        console.log(err)
      },
    })
  },

//搜索框的关闭按钮点击
  onbingtop : function () {
   
    this.setData({
      searchxx : false,
      containershow : true,
      value : "",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
    // request = ajax
  onLoad: function (options) {
    //轮播的接口地址
    // var banner = app.globalData.movies + "/banner/";
    var banner = jiekou.banner;
    // console.log(banner)
    //推荐电影的地址
    // var recommend = app.globalData.movies + "/recommend/";
    var recommend = jiekou.recommend;
    // console.log(recommend)

    // //香港电影的地址
    // var hongkong = app.globalData.movies + "/selected/?page=" + this.data.page;
    var Hongkong = jiekou.Hongkong;
    //调用轮播的数据请求的函数
    this.getmoviesData(banner);
    //调用推荐电影的列表
    this.recommendData(recommend);
    //调用香港电影的请求函数
    this.hongkongData(Hongkong);
    console.log(Hongkong)
  },
  //轮播调用函数的书写
  getmoviesData: function (banner) {
    wx.request({
      url: banner,
      methods : 'GET',
      header : {
        'content-type': 'application/json' // 默认值
      },
      //es6箭头函数
      success : (res) => {
      //  console.log(res)
      this.setData({
        banner : res.data
      })
      },
      fail : (err) =>{
        console.log(err)
      }
    })
  },
  //推荐电影列表的书写
  recommendData: function (recommend) {
    wx.request({
      url: recommend,
      methods: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      //es6箭头函数
      success : (res) => {
        // console.log(res);
        this.setData({
          recommend : res.data
        })
      },
      fail : (err) => {
        console.log(err);
      }
    })
  },
  //推荐电影点击跳转到详情页，每个电影对应相应的详情页
  Recoming : function (e) {
    var p = e.currentTarget.id;
    // console.log(p)
    wx.navigateTo({
      url: '../video/recommend/recommend?id=' + p,
    })
  },

//香港电影
  hongkongData: function (Hongkong) {
    wx.request({
      // url: app.globalData.movies + "/selected/?page=" + this.data.page,
      url: Hongkong + this.data.page,
      method : 'GET',
      header : {
        'content-type': 'application/json'
      },
      data : {
        page: this.data.page,
      },
      success : (res) => {
        console.log(res);
        if (res.data.results) {
          if (this.data.page === 1) {
            this.setData({
              hongkong: res.data.results
            })
          } else {
            this.setData({
              hongkong: this.data.hongkong.concat(res.data.results)
            })
          }
          wx.hideLoading()
        }else{
          console.log("数据已经加载结束");
          wx.hideLoading();
          this.setData({
            line : true
          })
        }
      },
      fail : (err) => {
        console.log(err);
        console.log(Hongkong)
      }
    })
  },
  //点击香港电影跳转到该详情页
  recoming : function (options) {
    // console.log(options);
    var p = options.currentTarget.id;
    wx.navigateTo({
      url: '../honkong/recommend/recommend?id=' + p
    })
  },
  //点击轮播图跳转到
  bannerimg : function (e) {
    // console.log(e);
    var p = e.currentTarget.id;
    wx.navigateTo({
      url: '../banner/recommend/recommend?id=' + p
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page ++;
    this.hongkongData(jiekou.Hongkong);
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})