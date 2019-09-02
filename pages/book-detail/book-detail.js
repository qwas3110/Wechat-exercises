 // pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel();
const likeModel = new LikeModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid;

    // 获取详情数据3部分数据
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    detail.then(res => {
      console.log(res)
      this.setData({
        book: res
      })
      wx.hideLoading()
    })

    comments.then(res => {
      console.log(res)
      this.setData({
        comments: res.comments
      })
    })

    likeStatus.then(res => {
      console.log(res)
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  // 短评显示或隐藏  
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  //短评取消
  onCancel(event) {
    this.setData({
      posting: false
    })
  },


  
})