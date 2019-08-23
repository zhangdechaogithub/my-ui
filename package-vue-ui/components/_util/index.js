const CLASSNAME = 'demo'
export var getPrefix = () => CLASSNAME
export var getPrefixCls = (str) => `${CLASSNAME}-${str}`

import {
    camelize,
    parseStyleText,
    hasProp,
    slotHasProp,
    filterProps,
    isEmptyElement,
    getSlots,
    getAllChildren,
    getSlotOptions,
    getOptionProps,
    getPropsData,
    getComponentFromProp,
    getAllProps,
    getValueByProp,
    getAttrs,
    getKey,
    getEvents,
    getClass,
    getStyle,
    getComponentName,
    filterEmpty,
    initDefaultProps,
    mergeProps,
    isValidElement,
    cloneVNode,
    cloneVnodes,
    cloneElement
} from './vnode/'

export {
    camelize,
    parseStyleText,
    hasProp,
    slotHasProp,
    filterProps,
    isEmptyElement,
    getSlots,
    getAllChildren,
    getSlotOptions,
    getOptionProps,
    getPropsData,
    getComponentFromProp,
    getAllProps,
    getValueByProp,
    getAttrs,
    getKey,
    getEvents,
    getClass,
    getStyle,
    getComponentName,
    filterEmpty,
    initDefaultProps,
    mergeProps,
    isValidElement,
    cloneVNode,
    cloneVnodes,
    cloneElement
}

import { addEventListener, triggerEvent } from './dom/event'
export { addEventListener, triggerEvent }

import { rafFunc } from './dom/raf'
export { rafFunc }

import { isDOM } from './dom/domOpt'
export { isDOM }