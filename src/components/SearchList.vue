<template>
  <div ref="viewBox" class="search-list-container">
    <div class="nav">
      <span class="dicription" @click="closeMaskDesc = true">押韵鹦鹉</span>
      <form class="search-form">
        <input type="text" class="search-query" autocomplete="off" spellcheck="false"  :placeholder="placeholder" v-model="inputText" @input="search">
      </form>
      <div class="set-param">
        <div class="param-list" @click="closeMaskSource = true">
          <span class="set-logo"></span>搜索<span class="current">{{querySelected[queryParams.source]}}</span>
        </div>      
        <div class="param-list" @click="closeMaskType = true">
          按<span class="current">{{querySelected[queryParams.use]}}</span>搜索
        </div>
        <div class="param-list"   @click="closeMaskMerged = true">
         <span v-show="querySelected[queryParams.merged_by]">按<span class="current">{{querySelected[queryParams.merged_by]}}</span>合并</span>
         <span v-show="!querySelected[queryParams.merged_by]">不合并</span> 
        </div>
      </div>
    </div>
    <div class="lists-wrap">
      <ul class="lists" >
        <li class="item clearfix" v-for="item in datas" @click="goTo(item.url)">          <div class="item-image">
            <img  class="item-pic"  v-lazy="item.pic">
          </div>
          <div class="item-center">
            <div class="summary">{{item.lyric | maxLength }}</div>
            <div class="info">
              {{item.title}}-{{item.author}}
            </div>
          </div>
          <span class="tag">{{item.char}}</span>
          <span class="tag">{{item.pinyin}}</span>
          <span class="tag">{{item.rhyme}}</span>
        </li>
      </ul>
     </div>
    <q-popup class="popup" v-model="closeMaskSource" position="top"  @maskClick="closeMaskSource = false">
      <p class="popup-title">
        搜索来源
      </p>
      <ul class="popup-container">
        <li class="popup-li" @click.stop="changeParam('song','source','closeMaskSource')">
          <div class="popup-key">歌词</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.source == 'song'}">
              <div class="popup-radio-inner">
              </div>
            </div>
          </div>
        </li>
        <li class="popup-li" @click.stop="changeParam('poem','source','closeMaskSource')">
          <div class="popup-key">诗词</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.source == 'poem'}">
              <div class="popup-radio-inner">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </q-popup>
    <q-popup class="popup" v-model="closeMaskType" @maskClick="closeMaskType = false">
      <p class="popup-title">
        搜索因素
      </p>
      <ul class="popup-container">
        <li class="popup-li" @click.stop="changeParam('char','use','closeMaskType')">
          <div class="popup-key">汉字</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.use == 'char'}">
              <div class="popup-radio-inner">     
              </div>
            </div>
          </div>
        </li>
        <li class="popup-li" @click.stop="changeParam('pinyin','use','closeMaskType')">
          <div class="popup-key">拼音</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.use == 'pinyin'}">
              <div class="popup-radio-inner">     
              </div>
            </div>
          </div>
        </li>
        <li class="popup-li" @click.stop="changeParam('rhyme','use','closeMaskType')">
          <div class="popup-key">韵母</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.use == 'rhyme'}">
              <div class="popup-radio-inner">     
              </div>
            </div>
          </div>
        </li>
      </ul>
    </q-popup>
    <q-popup class="popup" v-model="closeMaskMerged"  @maskClick="closeMaskMerged = false">
      <p class="popup-title">
        是否合并
      </p>
      <ul class="popup-container">
        <li class="popup-li" @click.stop="changeParam('char','merged_by','closeMaskMerged')">
          <div class="popup-key">汉字</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.merged_by == 'char'}">
              <div class="popup-radio-inner">
              </div>
            </div>
          </div>
        </li>
        <li class="popup-li" @click.stop="changeParam('pinyin','merged_by','closeMaskMerged')">
          <div class="popup-key">拼音</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.merged_by == 'pinyin'}">
              <div class="popup-radio-inner">
              </div>
            </div>
          </div>
        </li>
        <li class="popup-li" @click.stop="changeParam('rhyme','merged_by','closeMaskMerged')">
          <div class="popup-key">韵母</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.merged_by == 'rhyme'}">
              <div class="popup-radio-inner">
              </div>
            </div>
          </div>
        </li>
        <li class="popup-li" @click.stop="changeParam(false,'merged_by','closeMaskMerged')">
          <div class="popup-key">不合并</div>
          <div class="popup-btn">
            <div class="popup-radio" v-bind:class="{ active:  queryParams.merged_by == false}">
              <div class="popup-radio-inner">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </q-popup>
    <q-popup class="popup popupDescWrap" v-model="closeMaskDesc" @maskClick="closeMaskDesc = false">
      <div class="popupDescContent">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;押韵鹦鹉可以查找押韵素材，帮助你创作诗歌。这里收录了大量的歌词和诗词，提供方便好用的押韵查找功能。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;收藏押韵鹦鹉，简单好用的押韵帮手，再也不用为押韵烦恼了!
      </div>
      <div class="popupDescBtn" @click.stop="closeMaskDesc = false">确定</div>
    </q-popup>
  </div>
</template>

<script>
import utils from '../utils/index.js'
const Popup = resolve => require(['./common/Popup.vue'], resolve)
let sources = []
let _ = {}
_.remove = function(arr, item) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            return arr;
        }
    }
}
_.now = function (){
  var myData = new Date()
  return myData.getTime()//当前时间的毫秒数
}
_.debounce = function(func, wait, immediate) {
    // immediate默认为false
    var timeout, args, context, timestamp, result;

    var later = function() {
      // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      // 第一次调用该方法时，且immediate为true，则调用func函数
      var callNow = immediate && !timeout;
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  };

export default {
  data() {
    return{
      closeMaskSource: false,
      closeMaskType: false,
      closeMaskMerged: false,
      closeMaskDesc: false,
      inputText: "",
      datas: [],
      queryParams:{
          key:'山',
          use: 'rhyme',
          need_expand: false,
          merged_by: 'pinyin',
          page_num: 1,
          page_size: 10,
          detail_of: 'an',
          sort_reverse: 'True',
          source: 'song'
      },
      querySelected: {
        song: '歌词',
        poem: '诗词',
        char: '汉字',
        pinyin: '拼音',
        rhyme: '韵母'
      },
      placeholder: '搜你想押韵的，如"山"',
      loaded: true
    }
  },
  components: {
    'q-popup': Popup
  },
  filters: {
    maxLength: function (value) {
      if(value.length > 20){
        return value.slice(value.length-20)
      }else{
        return value
      } 
    }
  },
  mounted: function(){
    this.$nextTick(() => {
      let _this = this
      if(utils.get('key') && utils.get('key') != this.queryParams.key){
        this.inputText = utils.get('key')
        this.queryParams.key = utils.get('key')
      }
      if(utils.get('merged_by') && utils.get('merged_by') != this.queryParams.merged_by){
        console.log(utils.get('merged_by'))
        this.queryParams.merged_by = utils.get('merged_by')
        if(utils.get('merged_by') == 'false'){
          this.queryParams.merged_by = false
        }
        
      }
      if(utils.get('source') && utils.get('source') != this.queryParams.source){
        this.queryParams.source = utils.get('source')
      }
      if(utils.get('use') && utils.get('use') != this.queryParams.use){
        this.queryParams.use = utils.get('use')
      }
      this.submitForm(this.queryParams.key)
      // 注册scroll事件并监听  
      window.addEventListener('scroll',function(){  
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          // 判断是否滚动到底部  
          if(scrollTop + window.innerHeight >= document.body.offsetHeight) {  
              // 如果开关打开则加载数据  
              if(_this.loaded ==true){  
                  _this.loaded == false
                  _this.queryParams.page_num++
                  _this.submitForm(_this.queryParams.key, _this.loaded)   
              }  
          }  
      });
    })
  },
  methods: {
    //使用_.debounce控制搜索的触发频率
      //准备搜索
      search:_.debounce(
        function () {
          let that = this;
          //删除已经结束的请求
          _.remove(sources, function (n) {
            return n.source === null;
          });
          //取消还未结束的请求
          sources.forEach(function (item) {
            if (item !== null && item.source !== null && item.status === 1) {
              item.status = 0;
              item.source.cancel('取消上一个')
            }
          });
          //创建新的请求cancelToken,并设置状态请求中
          var sc = {
            source: that.$api.axios.CancelToken.source(),
            status: 1 //状态1：请求中，0:取消中
          };
          //这个对象加入数组中
          sources.push(sc);
          that._data.queryParams.cancelToken = sc.source.token
          if(that._data.inputText != ''){
            that._data.queryParams.key = that._data.inputText
  　　　　　　//开始搜索数据，yourhttp替换成你自己的请求路径
            that.$api.axios.get('https://www.tengyu.site/api/rhyme/rhyme',{params:that._data.queryParams} ).then(function (res) {
              //请求成功
              sc.source = null; //置空请求canceltoken
              //TODO这里处理搜索结果
              if(res.data.status.code == 0 && res.data.result.list.length > 0){
                that._data.datas = res.data.result.list
              }
              that.setCookies(that.queryParams)

            }).catch(function (thrown) {
              //请求失败
              sc.source = null; //置空请求canceltoken
              //下面的逻辑其实测试用
              if (that.$api.axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
              } else {
                //handle error
              }
            });
          }
        },
        500 //空闲时间间隔设置500ms
      ),
    goTo(href){
      window.open(href)
    },
    refresh(loaded) {
      this.queryParams.page_num ++
      this.submitForm(this.queryParams.key,loaded)
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom';
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading';
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish';
      }
    },
    submitForm (inputText,loaded) {
      if(inputText){
        this.queryParams.key = inputText
      }
      this.$api.get(
        '/rhyme/rhyme',
        this.queryParams,
        data => {
          if(data.result.list.length > 0 && loaded){
            this.datas = this.datas.concat(data.result.list)
            loaded = true
          }else if(data.result.list.length == 0 && loaded){
            loaded = true
          }else if(data.result.list.length > 0 && !loaded){
            this.datas = data.result.list
          }
          this.setCookies(this.queryParams)
        },
        data => {
          if(loaded){
            loaded = true
          }
        }
      )
    },
    changeParam(value,name,maskName){
      if(value != "" || value == false){
        this.queryParams[name] = value
        this.queryParams.page_num = 1
        this.submitForm()
      }
      if(name && maskName){
        let _this = this
        setTimeout(function(){
          _this[maskName] = false
        },300) 
      }  
    },
    setCookies(queryParams){
      Object.keys(queryParams).forEach(function(key){
        utils.set(key, queryParams[key], 360)
      })
    }
  }
}
</script>
<style lang="scss">
.search-list-container{
  font-size: 32px;
  margin-bottom: 100px;
  // 顶部
  .nav{
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background: #f6f6f6;
    width: 100%;
    padding: 20px 5% 0 5%;
    border: 1px solid #ddd;  /*no*/
    .dicription, .search-form{
      display: inline-block;
    }
    // 简述
    .dicription{
      padding: 10px 0;
      font-size: 36px;
      color: #3caf36;
      width: 26%;
      text-align:left;
      cursor: pointer;
    }
    // 搜索框
    .search-form{
      height: 80px;
      line-height: 80px;
      width: 72%;
      input[type="search"]::-webkit-search-cancel-button{
        display: none;
      }
      .search-query {
          cursor: text;
          width: 100%;
          height: 80px;
          line-height: 80px;
          padding: 0 15px 0 80px;
          border: 1px solid #e3e3e3; /*no*/
          color: #2c3e50;
          outline: none;
          border-radius: 40px;
          transition: border-color 0.2s ease;
          font-size:32px;
          background: #fff url(../assets/images/logo/search.png) 18px 13px no-repeat;
          background-size: 60px;
          vertical-align: middle !important;
      }
      input.search-query:focus {  
          border: 1px solid #3caf36; /*no*/
      }
    }
    // 设置区域
    .set-param{
      margin: 0 15px;
      display: flex;
      justify-content: space-between;
      .param-list{
        cursor: pointer;
        padding: 20px;
        display: flex;
        justify-content: space-between;
      }
      .set-logo{
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-right: 10px;
        background-size: cover;
        background: url(../assets/images/logo/setGreen.png) 2px 6px no-repeat;
        background-size:35px;
      }
      .current{
        color: #3caf36;
      }
    }
  }
  // 列表
  .lists-wrap{
    background: #fff;
    .lists{
      margin:0 20px;
    }
    .item{
      padding:20px 10px;
      border-bottom: 1px solid #DDD; /*no*/
      &:last-child{
        border:none;
      }
    }
    .item-image{
      display: flex;
      justify-content:center;
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
      float: left;
      margin-right: 20px;
    }
    .item-image img{
      width: 150px;
    }
    .item-center{
      width: 300px;
      float:left;
    }
    .summary{
      overflow: hidden;
      margin-bottom: 20px;
    }
    .info{
      font-size: 24px;
      color: #737373;
    }
    .tag{
      display: inline-block;
      margin-left: 20px;
      margin-bottom: 20px;
      padding: 10px 8px;
      border: 1px solid #3caf36; /*no*/
      line-height: 20px;
      border-radius: 6px;
      color: #3caf36;
      text-align: center;
    }
  }
}
// popup
.popup-title{
  font-size: 40px;
}
.popup-li{
  width: 100%;
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #eee; /*no*/
}
.popup-li:last-child{
  border-bottom: none;
}
.popup-key{
  float: left;
}
.popup-btn{
  float: right;
  width: 100px;
  height: 100px;
  justify-content: flex-end;
  align-items:center;
  display: flex;
}
.popup-radio{
  cursor: pointer;
  border: 1px solid #ddd; /*no*/
  box-sizing: border-box;
  border-radius: 999px;/*no*/
  justify-content: center;
  display: flex;
  align-items:center;
  background-color: #fff;
}
.popup-radio.active{
    sborder: 1px solid #3caf36; /*no*/
}
.popup-radio.active .popup-radio-inner{
    box-sizing: border-box; 
    border-radius: 999px;/*no*/
    background: #3caf36;
}
.popupDescContent{
  width: 100%;
  margin-bottom: 20px;
}
.popupDescBtn{
  float: right;
  width: 100px;
  padding: 6px 10px;
  border-radius: 6px;
  background: #0dba09;
  color: #fff;
  text-align: center;
}
/* iphone 6 */
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
    .popup-radio{
      width: 20px;  /*no*/
      height: 20px; /*no*/
    }
    .popup-radio.active .popup-radio-inner{
        width: 16px; /*no*/
        height: 16px; /*no*/
    }
}
/* iphone6 plus */
@media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
    .popup-radio{
      width: 20px;  /*no*/
      height: 20px; /*no*/
    }
    .popup-radio.active .popup-radio-inner{
        width: 16px; /*no*/
        height: 16px; /*no*/
    }
}
@media only screen and (max-width: 720px) {
  .popup-radio{
    width: 20px;  /*no*/
    height: 20px; /*no*/
  }
  .popup-radio.active .popup-radio-inner{
      width: 16px; /*no*/
      height: 16px; /*no*/
  }
}
@media only screen and (max-width: 640px) {
  .popup-radio{
    width: 14px;  /*no*/
    height: 14px; /*no*/
  }
  .popup-radio.active .popup-radio-inner{
      width: 10px; /*no*/
      height: 10px; /*no*/
  }
}
</style>
