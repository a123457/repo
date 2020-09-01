/*
 * @Company: Inossem
 * @Author: Jiang Xiao
 * @Email: xiao.jiang@inossem.com
 * @Date: 2019-11-06 10:01:42
 * @LastEditors: zhanyu
 * @LastEditTime: 2020-08-31 20:57:11
 * @Description: 
 */
export function randomExtend (minNum, maxNum) {
    if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
    } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    }
}

export function debounce (delay, callback) {
    console.log(callback)
    let lastTime

    return function () {
        clearTimeout(lastTime)

        const [that, args] = [this, arguments]
        lastTime = setTimeout(() => {
            callback.apply(that, args)
        }, delay)
    }
}

export function observerDomResize (dom, callback) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    const observer = new MutationObserver(callback)

    observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
    })

    return observer
}

export function getPointDistance (pointOne, pointTwo) {
    const minusX = Math.abs(pointOne[0] - pointTwo[0])

    const minusY = Math.abs(pointOne[1] - pointTwo[1])

    return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function deepMerge (target, merged) {
    for (var key in merged) {
        target[key] = target[key] && typeof target[key] === 'object' ?
            deepMerge(target[key], merged[key]) : target[key] = merged[key]
    }

    return target
}

export function deepClone (object, recursion = false) {
    if (!object) return object

    const {
        parse,
        stringify
    } = JSON

    if (!recursion) return parse(stringify(object))

    const clonedObj = object instanceof Array ? [] : {}

    if (object && typeof object === 'object') {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key] && typeof object[key] === 'object') {
                    clonedObj[key] = deepClone(object[key], true)
                } else {
                    clonedObj[key] = object[key]
                }
            }
        }
    }

    return clonedObj
}
