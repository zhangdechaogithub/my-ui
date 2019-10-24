import { getPrefixCls } from './index'
const setAlignNodeWrap = (node) => {
    
    const el = document.createElement('div')
    el.classList.add(getPrefixCls('align-node'))
    el.appendChild(node)
    document.body.appendChild(el)
}

/*

align type:

TL top TR
LT left LB
RT right RB
BL bottom BR

 */

const setTop = (el, target, type) => {
    const elRect = el.getBoundingClientRect()
    if (type === 'TL') {
        el.style.left = '0px'
    }
    if (type === 'TR') {
        el.style.right = '0px'
    }
    if (type === 'top') {
        const targetRect = target.getBoundingClientRect()
        if (targetRect.width >= elRect.width) {
            el.style.left = `${(targetRect.width-elRect.width)/2}px`
        } else {
            el.style.left = `-${(elRect.width-targetRect.width)/2}px`
        }
    }
    el.style.top = `-${elRect.height}px`
}

const setRight = (el, target, type) => {
    const targetRect = target.getBoundingClientRect()
    if(type === 'RT'){
        el.style.top = '0px'
    }
    if(type === 'RB'){
        el.style.bottom = '0px'
    }
    if(type === 'right'){
        const elRect = el.getBoundingClientRect()
        if(targetRect.height >= elRect.height){
            el.style.top = `${(targetRect.height-elRect.height)/2}px`
        }else{
            el.style.top = `-${(elRect.height-targetRect.height)/2}px`
        }
    }
    el.style.left = `${targetRect.width}px`
}

const setLeft = (el, target, type) => {
    const elRect = el.getBoundingClientRect()
}

const setBottom = (el, target, type) => {
    const elRect = el.getBoundingClientRect()
}

const setPosition = (el, target, type) => {
    //el.style.display = 'inline-block'
    if (['top', 'TL', 'TR'].includes(type)) {
        setTop(el, target, type)
    }
    if (['left', 'LT', 'LB'].includes(type)) {
        setLeft(el, target, type)
    }
    if (['right', 'RT', 'RB'].includes(type)) {
        setRight(el, target, type)
    }
    if (['bottom', 'BL', 'BR'].includes(type)) {
        setBottom(el, target, type)
    }
}

const getDefaultEnterAni = (type, ani) => {
    if (['top', 'TL', 'TR'].includes(type)) {
        return `zoom-up-${ani}`
    }
    if (['left', 'LT', 'LB'].includes(type)) {
        return `zoom-right-${ani}`
    }
    if (['right', 'RT', 'RB'].includes(type)) {
        return `zoom-left-${ani}`
    }
    if (['bottom', 'BL', 'BR'].includes(type)) {
        return `zoom-down-${ani}`
    }
}
let showInc = 0
let hideInc = 0
const alignToNode = (node, target, alignType, aniEnter, aniLeave) => {
    showInc && clearTimeout(showInc)
    hideInc && clearTimeout(hideInc)
    setAlignNodeWrap(node)
    return {
        show(func) {
            const enterAniCls = aniEnter || getDefaultEnterAni(alignType, 'enter')
            /*
            node.style.display = 'inline-block'
            setPosition(node, target, alignType)
            node.classList.add(enterAniCls)
            const getStyle = document.defaultView.getComputedStyle
            const duration = getStyle(node).getPropertyValue('animation-duration')
            showInc = setTimeout(() => {
                node.classList.remove(enterAniCls)
                typeof func === 'function' && func(node, target)
            }, parseFloat(duration) * 1000)
            */
        },
        hide(func) {
            const leaveAniCls = aniLeave || getDefaultEnterAni(alignType, 'leave')
            /*
            el.classList.add(leaveAniCls)
            const getStyle = document.defaultView.getComputedStyle
            const duration = getStyle(el).getPropertyValue('animation-duration')
            hideInc = setTimeout(() => {
                el.style.display = 'none'
                el.classList.remove(leaveAniCls)
                typeof func === 'function' && func(node, target)
            }, parseFloat(duration) * 1000)
            */
        }
    }
}

export { alignToNode }