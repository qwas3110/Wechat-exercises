// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js';
import { LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
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
    const behavior = event.detail.behavior;
    likeModel.like(behavior,this.data.classic.id, this.data.classic.type)
  },

  onNext(event) {
    this._updateClassic('next');
  },


  onPrevious(event) {
    this._updateClassic('previous');
  },

  


  // 私有函数一般放置在最下
  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index;

    classicModel.getClassic(index, nextOrPrevious,
      (res) => {
        console.log(res);
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      }
    )
  }
 
})