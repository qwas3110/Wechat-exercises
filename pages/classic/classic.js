// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js';


let classicModel = new ClassicModel();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(
      (res) => {
        
        const classic = res;

        this.setData({
          classic
        })
      }
    )
  },
  
  onLike(event) {
    console.log(event);
  },
 
})