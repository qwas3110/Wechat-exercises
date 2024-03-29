Component({
  externalClasses: ['l-class', 'l-error-text'],
  behaviors: ['wx://form-field'],
  relations: {
    '../radio/index': {
      type: 'child',
      linked() {
        // const currentLength = this.add();
        // if (currentLength === this.properties.length) {
        this.init();
        // }
      },
      linkChanged() {
      },
      unlinked() {
        this.init();
      }
    }
  },
  properties: {
    current: {
      type: String
    },
    length: Number,

    noneChecked: {
      type: Boolean,
      value: true
    },
    placement: {
      type: String,
      value: 'column', //column row
    },
  },
  data: {
    currentLength: 0
  },

  methods: {
    // add() {
    //   if (this.properties.length <= 0) {
    //     throw new Error('为提高性能，请主动设置radio-group的length属性');
    //   }
    //   return this.data.currentLength += 1;
    // },
    // reduce() {
    //   this.length -= 1;
    //   return this.data.currentLength -= 1;
    // },

    checkedKeyRepeat(items) {
      let keys = items.map(item => {
        return item.data.key;
      });
      const repeat = this.isRepeat(keys);
      if (repeat !== false) {
        throw new Error(`keys有重复元素, radio的key属性不能重复：${repeat}`);
      }
    },

    isRepeat(arr) {
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i]]) //hash 哈希
          return arr[i];
        hash[arr[i]] = true;
      }
      return false;
    },

    init() {
      const items = this.getRelationNodes('../radio/index');
      this.checkDefaultItem(items, this.properties.current);
      this.checkedKeyRepeat(items);
      this.onChangeHandle(items);
    },

    onChangeHandle(items) {
      items.forEach((item) => {
        let checked = this.properties.current == item.data.key;
        item.setChecked(checked, item.data.key);
      });
    },

    checkDefaultItem(items, defaultKey) {
      if(this.properties.noneChecked){
        return;
      }
      const item = items.find(item => item.data.key == defaultKey);
      if (!item) {
        throw new Error('当设置noneChecked为false时，' +
                    'radio-group必须设置current，且current的值必须合法');
      }
    },

    onEmitEventHandle(currentItem, select) {
      this.properties.current = select?currentItem.key:null;
      const items = this.getRelationNodes('../radio/index');
      this.onChangeHandle(items);
      // currentItem.currentKey = this.properties.current
      Object.assign(currentItem, {
        currentKey: this.properties.current
      });
      this.triggerEvent('linchange', currentItem, {
        bubbles: true,
        composed: true
      });
    }
  }
});