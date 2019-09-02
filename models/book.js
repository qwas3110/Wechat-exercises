import {
  HTTP
}
  from '../util/http-p.js'


  class BookModel extends HTTP {

    data = null;


    getHotList() {
      return this.request({
        url: 'book/hot_list'
      })
    };


    getMyBookCount() {
      return this.request({
        url: '/book/favor/count'
      })
    };


    //获取数据详情信息
    getDetail(bid) {
      return this.request({
        url: `book/${bid}/detail`
      })
    }

    // 获取当前书籍点赞状态
    getLikeStatus(bid) {
      return this.request({
        url: `/book/${bid}/favor`
      })
    }

    // 获取当前书籍短评信息
    getComments(bid) {
      return this.request({
        url: `book/${bid}/short_comment`
      })
    }



  }


  export {BookModel}