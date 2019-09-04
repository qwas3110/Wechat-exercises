const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray =
        this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    // 返回起始数
    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    // 是否需要加载更多数据
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },

  }
})

export {
  paginationBev
}