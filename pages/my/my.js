// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'


const classicModel = new ClassicModel()
const bookModel = new BookModel()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor()

  },


  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  // 获取我喜欢的书
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  


  

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },


  //跳转页面
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },


  // 判断用户是否授权
  // 回调方式实现
  userAuthorized() {
    wx.getSetting({
      success: data => {
        // 如果为ture 代表用户授权过了
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
        else {

        }
      }
    })
  },



  // promisic 方法实现
  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  // async await 方法实现
  async userAuthorized2() {
    const data = await promisic(wx.getSetting)()
    if (data.authSetting['scope.userInfo']) {
      const res = await promisic(wx.getUserInfo)()
      const userInfo = res.userInfo
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

 
})