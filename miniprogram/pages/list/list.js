Page({
  data: {
    list: {}
  },
  // 初次渲染完成
  onReady: function () {
    wx.setNavigationBarTitle({ //title
      title: this.title
    })
  },
  // 监听页面加载
  onLoad: function(options) {
    var that = this; //这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    this.title = options.title;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/theme/'+options.id,
      // data: {}, //请求的参数
      header: { //请求头
        'Content-Type': 'application/json' //设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
      },
      method: 'GET', //不声明 默认为get请求
      dataType: 'json', //返回的数据格式 默认json
      responseType: 'text', // 响应的数据类型
      success: function(res) { //成功
        console.log(res)
        console.log(res.data)
        that.setData({ //setData函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
          list: res.data.stories
        })
      },
    })
  }
})