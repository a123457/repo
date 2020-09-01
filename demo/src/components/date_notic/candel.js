/*
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2019-10-31 00:32:05
 * @LastEditors: zhanyu
 * @LastEditTime: 2019-11-03 18:57:05
 * @Description: description
 */
export default {
  startSunday: true, // 是否从周日开始的 true：周日开始 false: 周一开始
  // 计算某月有多少天
  getDayCount (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = new Date(year, month, 0);
    return d.getDate();
  },
  /** 
   *  
   * @param {*} date 日期
   * @param {*} str 上个月还 是下个月 
   */
  getBeforeOrNext (date, str = 'next') {
    let targetDate = this.dateFormat("YYYY/mm/dd", date).split('/')
    let year = parseInt(targetDate[0])
    let month = parseInt(targetDate[1])
    let day = targetDate[2]
    let newYear = year
    let newMonth
    if (str === 'next') { //求下个月的日期
      console.log(1)
      if (month + 1 < 10) {
        newMonth = "0" + (month + 1)
      } else if (month === 12) {
        newMonth = 1
        newYear = year + 1
      } else {
        newMonth = month + 1
      }
    } else {
      if (month === 1) {
        newMonth = 12
        newYear = year - 1
      } else if (month - 1 < 10) {
        newMonth = "0" + (month - 1)
      } else {
        newMonth = month - 1
      }
    }
    return new Date(newYear.toString() + '/' + newMonth.toString() + '/' + day.toString())
  },
  /**
   * 
   * @param {string} date 当前日期向前空几天 取决于当前月份的1号是星期几 
   */
  getMonthweek (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let newDate = new Date(year + '/' + month + '/1')
    let day = newDate.getDay()
    var a = this.startSunday ? day === 0 ? 0 : newDate.getDay() :
      day === 0 ? 6 : newDate.getDay() - 1
    return a
  },
  /**
   * 
   * @param {*} date 获取上个月的一些日期
   */
  getBeforeDate (date) {
    let arr = []
    let countNum = this.getMonthweek(date)
    let beforDate = this.getBeforeOrNext(date, 'before') // 上个月的日期
    let num = this.getDayCount(beforDate) // 上个月多少天数
    let startCount = num - countNum + 1 // 上个月从几号开始
    if (this.getMonthweek(date)) {
      for (let i = 0; i < countNum; i++) {
        let nowDate = this.dateFormat("YYYY/mm/dd", new Date(beforDate.getFullYear() + '/' + (beforDate.getMonth() + 1) + '/' + (startCount + i)))
        arr.push({
          id: startCount + i,
          date: nowDate,
          isToday: false,
          otherMonth: 'preMonth',
        });
      }
    }
    return arr
  },
  /**
   * 
   * @param {*} date 获取下个月的一些日期
   */
  getNextDate (date) {
    let arr = []
    let count = this.getBeforeDate(date).length + this.getDayCount(date) // 获取前个月的几天加上这个月的天数
    let num = 0
    if (count % 7 > 0) {
      num = 7 - count % 7
    } else {
      num = 0
    }
    if (num > 0) { // 向后取几天
      const nextDate = this.getBeforeOrNext(date, 'next')
      for (let i = 0; i < num; i++) {
        let nowDate = this.dateFormat("YYYY/mm/dd", new Date(nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (count + i)))
        arr.push({
          id: 1 + i,
          date: nextDate,
          isToday: false,
          otherMonth: 'nextMonth',
        })
      }
    }
    return arr
  },
  dateFormat (fmt, date) {
    let ret;
    let opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  },
  // 获取当前月的天数
  getnewDate (date) {
    let arr = []
    let num = this.getDayCount(date) // 当前月有多少天
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    for (let i = 0; i < num; i++) {
      let isToday = this.dateFormat('YYYY/mm/dd', new Date()) === this.dateFormat('YYYY/mm/dd', new Date(year + '/' + month + '/' + (i + 1)))//判断日期是否为当前日期
      let nowDate = this.dateFormat("YYYY/mm/dd", new Date(year, month, (i + 1)))
      arr.push({
        id: 1 + i,
        date: nowDate,
        isToday: isToday,
        otherMonth: 'nowMonth',
      })
    }
    return arr
  },
  // 整合数据获取某月的列表 用于渲染
  getMonthList (date) {
    return [...this.getBeforeDate(date), ...this.getnewDate(date), ...this.getNextDate(date)];
  },
}
