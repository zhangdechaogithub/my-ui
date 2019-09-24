//
const CLASSNAME = 'element-extend'

export const getPrefixCls = (str) => `${CLASSNAME}-${str}`

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
