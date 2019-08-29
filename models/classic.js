import {HTTP} from '../util/http.js';


class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
         callback && callback(res);
         // 将当前期刊号index 存入 缓存中
         this._setLatestIndex(res.index);
      }

    })
  }


  // 将next  和 previous 合并成一个方法
  getClassic(index, nextOrPrevious, callback) {
    this.request({
      url: `classic/${index}/${nextOrPrevious}`,
      success: (res) => {
        callback(res);
      }
    })
  }

  



  isFirst(index) {
    // 判断当前期刊是否为1 就知道是不是第一个期刊了
    return index === 1 ?  true :  false;

  }


  isLatest(index) {
    //判断当前期刊是否为最后期刊
    let latestIndex =  this._getLatestIndex();
    return latestIndex === index ? true : false;

  }

  // 存储期刊index
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }


  // 读取当前期刊
  _getLatestIndex() {
    let index  = wx.getStorageSync('latest')
    return index;
  }

}


export {ClassicModel};