import {HTTP} from '../util/http.js';


class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
         callback && callback(res);
         // 将当前期刊号index 存入 缓存中
         this._setLatestIndex(res.index);
         
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }

    })
  }


  // 将next  和 previous 合并成一个方法
  getClassic(index, nextOrPrevious, sCallback) {

    let key = nextOrPrevious == 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)

    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(
            this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }

  }

  // 获取我喜欢的期刊信息 
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
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

  //设置key
  _getKey(index) {
    return `classic-${index}`;
  }

}


export {ClassicModel};