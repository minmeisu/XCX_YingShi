
//导入app.js文件
var app = getApp();
//公用接口
const jiekouData = app.globalData.movies;
//轮播的接口
const banner = jiekouData + "/banner/"
//推荐电影的接口
const recommend = jiekouData + "/recommend/";
//香港电影的接口地址
const Hongkong = jiekouData + "/selected/?page=";
//搜索输入框的一个内容搜索接口地址
const search = jiekouData + "/details/?search=";

module.exports = {
  banner,
  recommend,
  Hongkong,
  search,
}
