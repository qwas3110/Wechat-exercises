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
   * 
   * observer 属性的值有改变的时候执行自定义函数
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
      // true, true, true,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: '',

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

    // 定义 observer 函数
    loadMore() {
      console.log('123');
    },


    // 搜索 x 图标删除当前文本
    onDelete(event) {
      this.setData({
        searching: false
      })
    },


    onConfirm(event) {

      // 改变搜索状态
      this.setData({
        searching: true
      })


      // 获取用户搜索关键字 做个判断 是点击关键字或者自己输入
      const q = event.detail.value || event.detail.text
      
      bookModel.search(0, q)
      .then(res => {
        this.setData({
          dataArray: res.books,
          q:q
        })

        keywordModel.addToHistory(q)

      })

    }

  }
})
