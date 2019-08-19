import { filterEmpty, parseStyleText } from './index'

export const cloneVNode = (vnode, deep) => {

    const componentOptions = vnode.componentOptions
    const data = vnode.data

    let listeners = {}
    if (componentOptions && componentOptions.listeners) {
        listeners = Object.assign(listeners, componentOptions.listeners)
    }

    let on = {}
    if (data && data.on) {
        on = Object.assign(on, data.on)
    }

    const cloned = new vnode.constructor(
        vnode.tag,
        data ? Object.assign(on, data) : data,
        vnode.children,
        vnode.text,
        vnode.elm,
        vnode.context,
        componentOptions ? Object.assign(componentOptions, listeners) : componentOptions,
        vnode.asyncFactory
    )

    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.fnContext = vnode.fnContext
    cloned.fnOptions = vnode.fnOptions
    cloned.fnScopeId = vnode.fnScopeId

    if (deep) {
        if (vnode.children) {
            cloned.children = cloneVNode(vnode.children, true)
        }
        if (componentOptions && componentOptions.children) {
            componentOptions.children = cloneVNode(componentOptions.children, true)
        }
    }
    return cloned
}

export const cloneVnodes = (vnodes, deep) => {
    const len = vnodes.length
    const res = new Array(len)
    for (let i = 0; i < len; i++) {
        res[i] = cloneVNode(vnodes[i], deep)
    }
    return res
}

export const cloneElement = (n, nodeProps = {}, deep) => {
    let ele = n
    if (Array.isArray(n)) {
        ele = filterEmpty(n)[0]
    }
    if (!ele) {
        return null
    }
    const node = cloneVNode(ele, deep)
    const { props = {}, key, on = {}, children, directives = [] } = nodeProps
    const data = node.data || {}

    let cls = {}
    let style = {}
    const {
        attrs = {},
            ref,
            domProps = {},
            style: tempStyle = {},
            class: tempCls = {},
            scopedSlots = {}
    } = nodeProps

    if (typeof data.style === 'string') {
        style = parseStyleText(data.style)
    } else {
        style = Object.assign(data.style, style)
    }

    if (typeof tempStyle === 'string') {
        style = Object.assign(style, parseStyleText(style))
    } else {
        style = Object.assign(style, tempStyle)
    }

    if (typeof data.class === 'string' && data.class.trim() !== '') {
        data.class.split(' ').forEach(c => {
            cls[c.trim()] = true
        })
    } else {
        cls = Object(data.class, cls)
    }

    if (typeof tempCls === 'string' && tempCls.trim() !== '') {
        tempCls.split(' ').forEach(c => {
            cls[c.trim()] = true
        })
    } else {
        cls = Object(data.class, cls)
    }

    node.data = Object.assign({}, data, {
        style,
        attrs: Object.assign(data.attrs, attrs),
        class: cls,
        domProps: Object.assign(data.domProps, domProps),
        scopedSlots: Object.assign(data.scopedSlots, scopedSlots),
        directives: [...(data.directives || []), ...directives]
    })

    if (node.componentOptions) {
        node.componentOptions.propsData = node.componentOptions.propsData || {}
        node.componentOptions.listeners = node.componentOptions.listeners || {}
        node.componentOptions.propsData = Object.assign(node.componentOptions.propsData, props)
        node.componentOptions.listeners = Object.assign(node.componentOptions.listeners, on)

        if (children) {
            node.componentOptions.children = children
        }
    } else {
        node.data.on = Object.assign(node.data.on || {}, on)
    }

    if (key !== undefined) {
        node.key = key
        node.data.key = key
    }
    if (typeof ref === 'string') {
        node.data.ref = ref
    }

    return node
}