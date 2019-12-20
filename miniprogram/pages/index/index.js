//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true, //  是否显示面板指示点
    // autoplay: true, // 是否自动切换
    duration: 500, // 滑动动画时长
    interval: 3000, // 自动切换时间间隔
    loading: false,
    plain: false,
    circular: true, // 是否采用衔接滑动
    freeMode:true,
    current: 0, // 当前所在页面的 index
  },
  onLoad () {
    let that = this
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
         that.setData({
           banner: res.data.top_stories,
           list: [{ header: '今日热闻' }].concat(res.data.stories)
         })
      }
    })
    this.index = 1
  },
  testDetails (e) {
    // bindchange事件
    console.log(e)
    if (e.detail.source == 'autoplay') {
      this.setData({
        autoplay: false
      })
    }
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore (e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
          that.setData({
            loading: false,
            list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
          })
      }
    })
  },
  getNextDate (){
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
})
