var app=getApp()
Page({
  data: {
    src: 'img/logo.png',
    userName: '',
    mobile: '',
    get_joiner_num:''
  },
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  goToStart: function() {
    wx.navigateTo({
      url: '/pages/start/start',
    })
  },

  start: function () {
    var that = this;
    var userName = this.data.userName;
    var mobile = this.data.mobile;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var name = /^[u4E00-u9FA5]+$/;
    if (userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1000
      })
    } else if (!phonetel.test(mobile)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../title/title'
      })
      this.data.joinerNum++;
      this.setData({
        joinerNum: that.data.joinerNum
      })
    }


  },
  onLoad:function(){
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: 'https://www.nannanwj.top/php/api.php',
      data: {
        action: 'get_joiner_num',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          get_joiner_num: res.data
        })
        console.log(that.data.get_joiner_num);
  }
})
  },

})