// pages/classic/classic.js
import { HTTP } from '../../util/http.js';

let http = new HTTP();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.request({
      url: 'classic/latest',
      success: (res) => {
        console.log(res);
      } 
      
    })
  }
 
})