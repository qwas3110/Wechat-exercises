// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
      }
    })
  },

  //用户授权事件
  onGetUserInfo(event) {
    // console.log(event)
  }

 
})