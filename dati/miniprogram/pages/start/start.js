var app = getApp();

Page({
  data: {
    time: 20,
    timer:'',
    countDownNum: 20,
    question: '',
    questionnum: 1,
    tip: '',
    right_answer: [],
    check_answer:'a',
    ifClick: false,
    defen: 0,
    name:'',
    phone:'',
    grades:''
  },

  gotoindex: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  gototabB: function () {
      var that = this;
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
        url: 'https://www.nannanwj.top/php/api.php',
        data: {
          action: "save_user ",
          name:this.data.name,
          phone:this.data.phone,
          grades:this.data.grades
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // console.log(that.data.save_user);
          // console.log(that.data.name);
          // console.log(that.data.phone);
          // console.log(that.data.grades);
          wx.reLaunch({
      url: '/pages/index/index',
    })
        }
      })
      wx.switchTab({
          url: '/pages/tabB/tabB',
      })
  },

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：')
    console.log(e.detail.value)
    this.data.check_answer = e.detail.value
  },

  aaa() {
    var that = this;
    if (that.data.ifClick === true) {
      console.log(that.data.ifClick)
      this.setData({
        questionnum: that.data.questionnum + 1,
         ifClick: false,
         tip: '',
         countDownNum: 20,
        check_answer: 'a'
      })
    } else {
      console.log(this.data.questionnum);
      console.log(that.data.ifClick);
      var right_answer = that.data.right_answer;
      console.log(that.data.check_answer);
      if (that.data.check_answer === that.data.right_answer[this.data.questionnum - 1]) {
        this.setData({
          questionnum: that.data.questionnum + 1,
          // ifClick: true,
          tip: '',
          countDownNum: 20,
          defen: that.data.defen + 1 ,  
          check_answer : 'a'
        })
      } else {
       // console.log(e)
        console.log(that.data.right_answer[this.data.questionnum - 1])
        this.setData({
          ifClick: true,
          tip: '正确答案应是' + that.data.right_answer[this.data.questionnum - 1] + '',
          countDownNum: 20
        })
      }
    } 
  },

  onShow: function() {
    //什么时候触发倒计时，就在什么地方调用这个函数
    this.countDown();
  },
  countDown: function() {
    let that = this;
      var stock =  setInterval(function() {
        that.setData({
          countDownNum: that.data.countDownNum-1
        })
        if (that.data.countDownNum == 0) {
          that.aaa();
          // clearInterval(stock);
         
        }
      }, 1000)
  },
  
  onLoad: function() {
    console.log('onLoad')
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: 'https://www.nannanwj.top/php/api.php',
      data: {
        action: 'get_question',

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
       // console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          var obj = Object.assign({}, res.data[i]);
          //console.log(res.data[i])
          that.data.right_answer[i] = res.data[i].right_answer
        //  console.log(obj)
        }
        that.setData({
          question: res.data
        });
      }
    })
    
  },
  // onHide:function () {
  //   var that = this;
  //   wx.request({
  //     //上线接口地址要是https测试可以使用http接口方式
  //     url: 'https://www.nannanwj.top/php/api.php',
  //     data: {
  //       action: 'save_user',
        
  //     },
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(that.data.save_user);
  //       console.log(that.data.name);
  //       console.log(that.data.phone);
  //       console.log(that.data.grades);
  //     }
  //   })
  // }
})