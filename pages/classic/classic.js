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
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(
      (res) => {
        
        // this._getLikeStatus(res.id, res.type);

        const classic = res;

        this.setData({
          classic,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
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

        this._getLikeStatus(res.id, res.type); 

        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      }
    )
  },


  _getLikeStatus( artId, category ) {
    likeModel.getClassicLikeStatus(
      artId, category, (res) => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      }
    )
  }
 
})