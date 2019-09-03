import { getPrefixCls, isDOM, strStyleObj } from '../index'

const getKeyFrameStr = (name, processObj) => {
    let str = ''
    const objToStr = (obj) => {
        var strObj = ''
        for (var k in obj) {
            strObj += `${k}: ${obj[k]};`
        }
        return `{${strObj}}`
    }

    for (var key in processObj) {
        str += `${key} ${objToStr(processObj[key])}`
    }
    return `@keyframes ${name} {${str}}`
}
//添加全局@keyframes
export const css3Keyframes = (clsName, processObj, func, time = .3) => {
    if (css3Keyframes.inc) {
        clearTimeout(css3Keyframes.inc)
    }
    if (processObj && typeof processObj === 'object') {
        if(css3Keyframes.style){
            return
        }
        const style = document.createElement('style')

        const keyFrameName = `keyframe${new Date().getTime()}`
        const keyFrame = getKeyFrameStr(keyFrameName, processObj)

        const classStr = `.${clsName}{animation-name: ${keyFrameName}; animation-duration: ${time}s;} ${keyFrame}`
        style.innerHTML = classStr
        document.body.appendChild(style)
        css3Keyframes.style = true
        css3Keyframes.inc = setTimeout(() => {
            style.remove()
            css3Keyframes.style = false
            func instanceof Function && func()
        }, time * 1000)
    }
}
//for button
export const waveAni = (node) => {
    if (!isDOM(node) || waveAni.el) {
        return
    }
    var rect = node.getBoundingClientRect()
    const color = node.style.borderColor
    let ratioX = (rect.width + 15) / rect.width
    let ratioY = (rect.height + 15) / rect.height
    let div = document.createElement('div')

    let style = {
        position: 'absolute',
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        [`border-radius`]: '4px',
        [`z-index`]: '-1'
    }
    div.style = strStyleObj(style)
    let waveEffect = css3Keyframes(getPrefixCls('wave-effect'), {
        '0%': {
            opacity: .8,
            transform: 'scale(1)',
            border: `4px solid ${color}`,
            [`box-shadow`]: `0px 0px 4px ${color}` //取元素边框颜色
        },
        '100%': {
            opacity: .2,
            [`box-shadow`]: `0px 0px 4px transparent`,
            border: '1px solid transparent',
            transform: `scale(${ratioX}, ${ratioY})`,
        }
    }, () => {
        div.remove()
        waveAni.el = false
    }, 1.2)
    div.classList.add(getPrefixCls('wave-effect'))
    node.parentNode.appendChild(div)
    waveAni.el = true
}