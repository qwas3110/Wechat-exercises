// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'


const keywordModel = new KeywordModel()
const bookModel = new BookModel()






Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,

  },

  //组件默认初始化时调用
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    //该方法是一个promise 需要then获取
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {

      // 改变搜索状态
      this.setData({
        searching: true
      })


      // 获取用户搜索关键字
      const q = event.detail.value;
      
      bookModel.search(0, q)
      .then(res => {
        this.setData({
          dataArray: res.books
        })

        keywordModel.addToHistory(q)

      })

    }

  }
})
