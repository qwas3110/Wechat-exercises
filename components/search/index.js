// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'


const keywordModel = new KeywordModel()
const bookModel = new BookModel()






Component({
  /**
   * 组件的属性列表
   * 
   * observer 属性的值有改变的时候执行自定义函数
   */
  behaviors: [paginationBev],
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
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
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
 
    // 定义 observer 函数
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
        // 死锁
      }
    },


    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // this.initialize() 
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },


    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },


    // 搜索 x 图标删除当前文本
    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },


    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

  }
})
