import {HTTP} from '../util/http.js';


class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
         callback && callback(res);
      }

    })
  }

  getPrevious(index,callback) {
    this.request({
      url: `classic/${index}/previous`,
      success: (res) => {
        callback(res);
      }
    })
  }
}


export {ClassicModel};