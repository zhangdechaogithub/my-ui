import raf from 'raf'

export var getWindow = () => typeof window !== 'undefined' ? window : null

const CLASSNAME = 'demo'

export var getClassName = (str) => CLASSNAME + '-' + str
export var getUpperCasePrefix = () => CLASSNAME.toUpperCase()
export var getPrefix = () => CLASSNAME
export var getScroll = (target, top) => {
    if (typeof window === 'undefined') {
        return null
    }

    const prop = top ? 'pageYOffset' : 'pageXOffset'
    const method = top ? 'scrollTop' : 'scrollLeft'

    const isWindow = target === window;
    let ret = isWindow ? target[prop] : target[method]

    if (isWindow && typeof ret !== 'number') {
        ret = window.document.documentElement[method]
    }

    return ret;

}


export var getElRect = (target) => {
    return target !== window ? target.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 }
}

export var getOffset = (el, target) => {
    const elRect = getElRect(el)
    const targetRect = getElRect(target)


    const scrollTop = getScroll(target, true)
    const scrollLeft = getScroll(target, false)

    const docElem = window.document.body

    const clientTop = docElem.clientTop || 0
    const clientLeft = docElem.clientLeft || 0

    return {
        top: elRect.top - targetRect.top + scrollTop - clientTop,
        left: elRect.left - targetRect.left + scrollLeft - clientLeft,
        width: elRect.width,
        height: elRect.height
    }
}

export const getOffsetTop = (element, container) => {
    if (!element) {
        return 0
    }
    if (!element.getClientRects().length) {
        return 0
    }
    const rect = element.getBoundingClientRect()
    if (rect.width || rect.height) {
        if (container === window) {
            container = element.ownerDocument.documentElement
            return rect.top - container.clientTop
        }
        return rect.top - container.getBoundingClientRect().top
    }
    return rect.top
}

export const easeInOutCubic = (t, b, c, d) => {
    const cc = c - b
    t /= d / 2
    if (t < 1) {
        return (cc / 2) * t * t * t + b
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

export const sharpMatcherRegx = /#([^#]+)$/

export const scrollTo = (href, offsetTop = 0, getContainer, callback = () => {}) => {

    const container = getContainer()
    const scrollTop = getScroll(container, true)
    const sharpLinkMatch = sharpMatcherRegx.exec(href)

    if (!sharpLinkMatch) {
        return
    }

    const targetElement = document.getElementById(sharpLinkMatch[1])

    if (!targetElement) {
        return
    }
    const eleOffsetTop = getOffsetTop(targetElement, container)
    const targetScrollTop = scrollTop + eleOffsetTop - offsetTop

    const startTime = Date.now()

    const frameFunc = () => {
        const timestamp = Date.now()
        const time = timestamp - startTime
        const nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450)

        if (container === window) {
            window.scrollTo(window.pageXOffset, nextScrollTop)
        } else {
            container.scrollTop = nextScrollTop
        }

        if (time < 450) {
            raf(frameFunc)
        } else {
            callback()
        }
    }
    raf(frameFunc)
}
