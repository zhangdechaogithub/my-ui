export const getType = (fn) => {
    const match = fn && typeof fn === 'function'
    return match ? 'function' : ''
}

const camelizeRE = /-(\w)/g;

export const camelize = str => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

export const parseStyleText = (cssText = '', camel) => {
    const res = {}
    const listDelimiter = /;(?![^(]*\))/g
    const propertyDelimiter = /:(.+)/

    cssText.split(listDelimiter).forEach((item) => {
        if (item) {
            const tmp = item.split(propertyDelimiter)
            if (tmp.length) {
                const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim()
                res[k] = tmp[1].trim()
            }
        }
    })

    return res
}

export const hasProp = (instance, prop) => {
    const $options = instance.$options || {}
    const propsData = $options.propsData || {}
    return prop in propsData
}

export const slotHasProp = (slot, prop) => {
    const $options = slot.componentOptions || {}
    const propsData = $options.propsData || {}
    return prop in propsData
}

export const filterProps = (props, propsData = {}) => {
    const res = {}
    Object.keys(props).forEach(k => {
        if (k in propsData || props[k] !== undefined) {
            res[k] = props[k]
        }
    })

    return res
}
export const isEmptyElement = (c) => {
    return !(c.tag || (c.text && c.text.trim() !== ''))
}
export const getSlots = ele => {
    let componentOptions = ele.componentOptions || {}
    if (ele.$vnode) {
        componentOptions = ele.$vnode.componentOptions || {}
    }
    const children = ele.children || componentOptions.children || []
    const slots = {}
    children.forEach(child => {
        if (!isEmptyElement(child)) {
            const name = (child.data && child.data.slot) || 'default'
            slots[name] = slots[name] || []
            slots[name].push(child)
        }
    })
    return slots
}

export const getAllChildren = ele => {
    let componentOptions = ele.componentOptions || {}
    if (ele.$vnode) {
        componentOptions = ele.$vnode.componentOptions || {}
    }
    return ele.children || componentOptions.children || []
}

export const getSlotOptions = ele => {
    if (ele.fnOptions) {
        return ele.fnOptions
    }
    let componentOptions = ele.componentOptions
    if (ele.$vnode) {
        componentOptions = ele.$vnode.componentOptions
    }
    return componentOptions ? componentOptions.Ctor.options || {} : {}
}

export const getOptionProps = instance => {
    if (instance.componentOptions) {
        const componentOptions = instance.componentOptions
        const { propsData = {}, Ctor = {} } = componentOptions
        const props = (Ctor.options || {}).props || {}
        const res = {}
        for (const [k, v] of Object.entries(props)) {
            const def = v.default
            if (def !== undefined) {
                res[k] =
                    typeof def === 'function' && getType(v.type) !== 'Function' ? def.call(instance) : def
            }
        }
        return Object.assign({}, res, propsData)
    }
    const { $options = {}, $props = {} } = instance
    return filterProps($props, $options.propsData)
}

export const getPropsData = ele => {
    let componentOptions = ele.componentOptions
    if (ele.$vnode) {
        componentOptions = ele.$vnode.componentOptions
    }
    return componentOptions ? componentOptions.propsData || {} : {}
}

export const getComponentFromProp = (instance, prop, options = instance, execute = true) => {
    if (instance.$createElement) {
        const h = instance.$createElement
        const temp = instance[prop]

        if (temp !== undefined) {
            return typeof temp === 'function' && execute ? temp(h, options) : temp
        }

        return (
            instance.$slots[prop] ||
            (instance.$scopedSlots[prop] && execute && instance.$scopedSlots[prop](options)) ||
            instance.$scopedSlots[prop] ||
            undefined
        )
    } else {
        const h = instance.context.$createElement
        const temp = getPropsData(instance)[prop]
        if (temp !== undefined) {
            return typeof temp === 'function' && execute ? temp(h, options) : temp
        }
        const slotsProp = []
        const componentOptions = instance.componentOptions || {}
            (componentOptions.children || []).forEach(child => {
                if (child.data && child.data.slot === prop) {
                    if (child.tag === 'template') {
                        slotsProp.push(child.children)
                    } else {
                        slotsProp.push(child)
                    }
                }
            })
        return slotsProp.length ? slotsProp : undefined
    }
}

export const getAllProps = ele => {
    let data = ele.data || {}
    let componentOptions = ele.componentOptions || {}

    if (ele.$vnode) {
        data = ele.$vnode.data || {}
        componentOptions = ele.$vnode.componentOptions || {}
    }

    return Object.assign({}, data.props, data.attrs, componentOptions.propsData)
}


export const getValueByProp = (ele, prop) => {
    return getPropsData(ele)[prop]
}

export const getAttrs = ele => {
    let data = ele.data
    if (ele.$vnode) {
        data = ele.$vnode.data
    }

    return data ? data.attrs || {} : {}
}

export const getKey = ele => {
    let key = ele.key
    if (ele.$vnode) {
        key = ele.$vnode.key
    }
    return key
}

export const getEvents = (child) => {
    let events = {}
    if (child.componentOptions && child.componentOptions.listeners) {
        events = child.componentOptions.listeners
    } else if (child.data && child.data.on) {
        events = child.data.on
    }
    return Object.assign({}, events)
}

export const getClass = (ele) => {
    let data = {}
    if (ele.data) {
        data = ele.data
    } else if (ele.$vnode && ele.$vnode.data) {
        data = ele.$vnode.data
    }
    const tempCls = data.class || {}
    const staticClass = data.staticClass

    let cls = {}

    staticClass && staticClass.split(' ').forEach(c => {
        cls[c.trim()] = true
    })

    if (typeof tempCls === 'string') {
        tempCls.split(' ').forEach(c => {
            cls[c.trim()] = true
        })
    } else if (Array.isArray(tempCls)) {
        tempCls.forEach(c => {
            cls[c.trim()] = true;
        })
    } else {
        cls = Object.assign({}, cls, tempCls)
    }

    return cls
}

export const getStyle = (ele, camel) => {
    let data = {}
    if (ele.data) {
        data = ele.data
    } else if (ele.$vnode && ele.$vnode.data) {
        data = ele.$vnode.data
    }

    let style = data.style || data.staticStyle

    if (typeof style === 'string') {
        style = parseStyleText(style, camel)
    } else if (camel && style) {
        const res = {}
        Object.keys(style).forEach(k => (res[camelize(k)] = style[k]))
        return res
    }

    return style
}

export const getComponentName = (opts) => {
    return opts && (opts.Ctor.options.name || opts.tag)
}

export const filterEmpty = (children = []) => {
    return children.filter(c => !isEmptyElement(c))
}

export const initDefaultProps = (propTypes, defaultProps) => {
    Object.keys(defaultProps).forEach(k => {
        if (propTypes[k]) {
            propTypes[k].def && (propTypes[k] = propTypes[k].def(defaultProps[k]))
        } else {
            throw new Error(`not have ${k} prop`)
        }
    });
    return propTypes
}

export const mergeProps = () => {
    const args = [].slice.call(arguments, 0)
    const props = {}
    args.forEach((p = {}) => {
        for (const [k, v] of Object.entries(p)) {
            props[k] = props[k] || {}
            if (isPlainObject(v)) {
                Object.assign(props[k], v)
            } else {
                props[k] = v
            }
        }
    });
    return props
}

export const isValidElement = (element) => {
    return (
        element &&
        typeof element === 'object' &&
        'componentOptions' in element &&
        'context' in element &&
        element.tag !== undefined
    )
}

export default hasProp