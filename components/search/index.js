// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
const keywordModel = new KeywordModel()






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

  },

  //组件默认初始化时调用
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
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
      // 获取用户搜索关键字
      const word = event.detail.value;
      keywordModel.addToHistory(word)
    }

  }
})
