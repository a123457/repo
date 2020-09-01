/**
 * descript:元素滚动
 */
import {on, off} from '@/libs/tools'
class XzyMarquee{
    constructor(el, options) { // 当前标签的class id attr 名称 options 滚动的选项 // 当前元素必须要给高度 超出隐藏 element.currentStyle() || document.defaultView.getComputedStyle(element, null)
        var optionsDefault = {
            isEqual:true,		// 所有滚动的元素长宽是否相等,true,false
            loop: 0,			// 循环滚动次数，0是无限
            direction: "left",	// 滚动方向，"left","right","up","down"
            scrollAmount:1,		// 步长 每一帧走的像素
            scrollDelay:20		// 时长
        }
        this.$el = document.querySelector(el) // 滚动元素的容器
        this.$kids = this.$el.childNodes // 获取所有滚动子元素的节点
        this.moveId = null
        this.numMoved = 0
        this.scrollW = this.$el.offsetWidth // 容器的宽度
        this.scrollH = this.$el.offsetHeight // 容器的高度
        this.scrollSize = 0 // 滚动元素的尺寸
        this.$options = Object.assign({}, optionsDefault, options)
        this.type=(this.$options.direction === "left"|| this.$options.direction === "right") ? 1:0; // 滚动类型 1 左右 0 上下
        this.dir = (this.$options.direction=="left" || this.$options.direction=="right") ? "scrollLeft":"scrollTop"; // 滚动方向
        //获取滚动元素的尺寸
        if(this.$kids && this.$kids.length) {
          if(this.$options.isEqual) {
              this.scrollSize= this.$kids[0][this.type ? "offsetWidth" : "offsetHeight"] * this.$kids.length;
          } else {
             this.$kids.forEach(item => {
              this.scrollSize += item[this.type ? "offsetWidth" : "offsetHeight"]
              this.$el.append(item.cloneNode(true))
             })
          } 
        }
        console.log(this.$el)
        this.startScroll() // 滚动方法
        // 鼠标移上或者移出控制滚动的开始以停止
        this.controlScroll()
    }
    startScroll() {
      var _this = this
      if(_this.scrollSize < (_this.type ? _this.scrollW: _this.scrollH)){return;};
      _this.moveId=setInterval(function(){
				if (_this.$options.loop > 0) { // 滚动自动停止
					_this.numMoved += _this.$options.scrollAmount;
					if(_this.numMoved >= _this.scrollSize * _this.$options.loop){
            _this.$el[_this.dir]=0;
            _this.controlScroll(true) // 滚动结束解绑事件
						return clearInterval(_this.moveId);
					};
				};
				if(_this.$options.direction === "left"|| _this.$options.direction == "up"){
					var newPos= _this.$el[_this.dir] + _this.$options.scrollAmount;
					if(newPos >= _this.scrollSize){
						newPos-= _this.scrollSize;
					}
					_this.$el[_this.dir] = newPos;
				}else{
					var newPos = _this.$el[_this.dir] - _this.$options.scrollAmount;
					if(newPos <= 0){
						newPos += this.scrollSize;
					};
					_this.$el[_this.dir]=newPos;
				};
      }, _this.$options.scrollDelay);
    }
    controlScroll(value) {
      var _this = this
      if(!_this.$options.loop){
        on(_this.$el, 'mouseover', function(){
          clearInterval(_this.moveId)
        })
        on(_this.$el, 'mouseout', function(){
          _this.startScroll()
        })
      } else {
        if(value) {
          off(_this.$el, 'mouseover')
          off(_this.$el, 'mouseout')
        } else {
          on(_this.$el, 'mouseover', function(){
            clearInterval(_this.moveId)
          })
          on(_this.$el, 'mouseout', function(){
            _this.startScroll()
          })
        }
      }
    }
}
export default XzyMarquee
