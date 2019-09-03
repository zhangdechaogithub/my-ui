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

import { isDOM, strStyleObj, getOffsetTop, getScroll } from './dom/domOpt'
export { isDOM, strStyleObj, getOffsetTop, getScroll }

import { aniFrame, cancelAniFrame } from './animate/'
export { aniFrame, cancelAniFrame }

import { css3Keyframes, waveAni } from './animate/css3Ani'
export { css3Keyframes, waveAni }