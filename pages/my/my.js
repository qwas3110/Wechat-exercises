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
    this.userAuthorized();
  },


  // 判断用户是否授权
  userAuthorized() {
    wx.getSetting({
      success: data => {
        // 如果为ture 代表用户授权过了
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data);
            }
          })
        }
        else {

        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    console.log(userInfo);
  },

 
})