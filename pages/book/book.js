// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'




const bookModel = new BookModel()




Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false
  },

  /**
   * 生命周期函数--监听页面加载
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


  

 
})