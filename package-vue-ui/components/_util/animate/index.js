//可用raf npm 包
let browserPrefix = ['moz', 'ms', 'webkit']
export const aniFrame = (func) => {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(func)
    }
    const prefix = browserPrefix.filter(key => `${key}RequestAnimationFrame` in window)[0]
    return prefix ? window[`${prefix}RequestAnimationFrame`] : (func) => {
        let last = 0
        return (func) => {
            let curr = new Date().getTime()
            let time = window.Math.max(0, 16 - (curr - last))
            let id = window.setTimeout(() => {
                func(curr + time)
            }, time)
            last = curr + time
            return id
        }
    }
}

export const cancelAniFrame = (id) => {
    if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    }
    const prefix = browserPrefix.filter(key => `${key}RequestAnimationFrame` in window)[0]
    return prefix ? (
            window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]
        ).call(this, id) :
        clearTimeout(id)
}

