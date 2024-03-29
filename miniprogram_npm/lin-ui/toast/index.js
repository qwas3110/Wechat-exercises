import computeOffset from '../behaviors/computeOffset';
import zIndex from '../behaviors/zIndex';
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [computeOffset, zIndex],
  externalClasses: ['l-bg-class', 'l-icon-class', 'l-class', 'l-image-class'],
  properties: {
    // 显示与隐藏
    show: {
      type: Boolean,
      value: false
    },
    // 提示框的文本内容
    title: {
      type: String,
      value: '',
      observer: 'elip'
    },
    // icon
    icon: String,
    size: String,
    color: String,
    // image
    image: String,
    // 文字的显示方位
    placement: {
      type: String,
      value: 'bottom'
    },
    // 提示框显示的时长
    duration: {
      type: Number,
      value: 1500
    },
    // 提示框的层级
    zIndex: {
      type: Number,
      value: 777
    },
    // 设置提示框是否为垂直居中
    center: {
      type: Boolean,
      value: true
    },
    // 是否显示透明蒙层，防止触摸穿透
    mask: {
      type: Boolean,
      value: false
    },
    openApi: {
      type: Boolean,
      value: true,
    },
    offsetX: Number,
    offsetY: Number
  },

  observers: {
    'show': function (show) {
      show && this.changeStatus();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: false,
    success: '',
    fail: '',
    complete: ''
  },
  attached() {
    if (this.data.openApi) {
      this.initToast();
    }
  },

  pageLifetimes: {
    show() {
      if (this.data.openApi) {
        this.initToast();
      }
      this.offsetMargin();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initToast() {
      wx.lin = wx.lin || {};
      wx.lin.showToast = (options = {}) => {
        const {
          title = '',
          icon = '',
          image = '',
          placement = 'bottom',
          duration = 1500,
          center = true,
          mask = false,
          success = null,
          complete = null,
          offsetX = 0,
          offsetY = 0,
        } = options;
        this.setData({
          title,
          icon,
          image,
          placement,
          duration,
          center,
          mask,
          success,
          complete,
          offsetY,
          offsetX
        });
        this.changeStatus();
        return this;
      };
    },

    changeStatus() {
      this.setData({
        status: true
      });
      if (this.data.timer) clearTimeout(this.data.timer);
      this.data.timer = setTimeout(() => {
        this.setData({
          status: false
        });
        if (this.data.success) this.data.success();
        this.data.timer = null;
      }, this.properties.duration);
    },

    elip(text) {
      var textLen = text ? this.strlen(text) : 0;
      if (textLen) {
        text = text.substring(0, 20);
      } else {
        text = '';
      }
      this.setData({
        title: text
      });
      return text;
    },

    strlen(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= '0x0001' && c <= '0x007e') || ('0xff60' <= c && c <= '0xff9f')) {
          len++;
        } else {
          len += 2;
        }
      }
      return len;
    },
    // 阻止滑动
    doNothingMove() {
      // do nothing……
    },

    // 点击事件
    onMaskTap() {

      let detail = true;
      let option = { bubbles: true, composed: true };

      if (this.data.locked !== true) {
        this.setData({
          fullScreen: 'hide',
          status: 'hide',
        });
      }

      this.triggerEvent('lintap', detail, option);
    }
  }
});