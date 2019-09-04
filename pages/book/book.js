// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'


const bookModel = new BookModel()




Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: '' 
  },

  /**
   * 生命周期函数--监听页面加载
   * 修改成async await
   */
  async onLoad(optins) {
    const books = await bookModel.getHotList()
    this.setData({
      books
    })

    console.log(this.data.books);
    // .then(res => {
    //   this.setData({
    //     books:res
    //   })
    // })
    // id
  },

  
  onSearching(event) {
    this.setData({
      searching: true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
    })
  },


  //onReachBottom用户触底的时候触发，该方法无法在自定义组件中使用
  //自定义data  传入自定义组件中可以让自定义组件使用
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  }



  

 
})