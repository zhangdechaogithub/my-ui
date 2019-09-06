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
        if (css3Keyframes.style) {
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
export const waveAni = (node, callFunc) => {
    if (!isDOM(node) || waveAni.el) {
        return
    }
    var rect = node.getBoundingClientRect()
    const getStyle = document.defaultView.getComputedStyle
    const radius =  getStyle(node).getPropertyValue('border-radius')
    const color = getStyle(node).getPropertyValue('border-color') || getStyle(node).getPropertyValue('background-color') 
    let ratioX = (rect.width + 10) / rect.width
    let ratioY = (rect.height + 10) / rect.height
    let div = document.createElement('div')

    let style = {
        position: 'absolute',
        top: `${node.offsetTop}px`,
        left: `${node.offsetLeft}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        [`border-radius`]: `${radius}`,
        [`background-color`]: 'transparent',
    }
    div.style = strStyleObj(style)
    let waveEffect = css3Keyframes(getPrefixCls('wave-effect'), {
        '0%': {
            transform: 'scale(1)',
            border: `2px solid ${color}`,
        },
        '100%': {            
            border: '2px solid transparent',
            transform: `scale(${ratioX}, ${ratioY})`,
        }
    }, () => {
        div.remove()
        waveAni.el = false
        callFunc()
    }, .15)
    div.classList.add(getPrefixCls('wave-effect'))
    node.parentNode.prepend(div)
    waveAni.el = true
}