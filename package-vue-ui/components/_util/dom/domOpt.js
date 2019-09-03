export const isDOM = (el) => {
	if(el === window){
		return true
	}
	if (HTMLElement === 'object'){
		return el instanceof HTMLElement
	}else{
		return el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string'
	}
}
export const strStyleObj = (style) => {
	if(!style instanceof Object){
		return
	}
	var str = ''
	for(var key in style){
		str += `${key}: ${style[key]};`
	}
	return str
}

export const getOffsetTop = (el, container) => {
	if(!el || !el.getClientRects().length){
		return 
	}
	const rect = el.getBoundingClientRect()
	if(rect.width || rect.height){
		if(container === window){
			container = el.ownerDocument.documentElement
			return rect.top - container.clientTop
		}

		return rect.top - container.getBoundingClientRect().top
	}
	return rect.top
}

export const getScroll = (target, top) => {
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

    return ret

}