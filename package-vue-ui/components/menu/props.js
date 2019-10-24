const isStringArr = (val) => {
    if (val instanceof Array) {
        let i = 0;
        while (i < val.length) {
            if (typeof val[i] === 'string') {
                i++
            } else {
                return false
            }
        }
        return true
    }
    return false
}

const menuProps = {
    defaultOptionKeys: { //初始展开的 SubMenu 菜单项 key 数组
        validator(val) {
            return isStringArr(val)
        }
    },
    defaultSelectedKeys: { //初始选中的菜单项 key 数组    
        validator(val) {
            return isStringArr(val)
        }
    },
    forceSubMenuRender: {
        type: Boolean,
        default: false
    },
    inlineCollapsed: { //inline 时菜单是否收起状态
        type: Boolean
    },
    inlineIndent: { //inline 模式的菜单缩进宽度
        type: Number,
        default: 24
    },
    mode: {
        validator(value) {
            return ['vertical', 'horizontal', 'inline'].includes(value)
        },
        default: 'vertical'
    },
    multiple: {
        type: Boolean,
        default: false
    },
    openKeys: { //当前展开的 SubMenu 菜单项 key 数组
        validator(val) {
            return isStringArr(val)
        }
    },
    selectedKeys: { //当前选中的菜单项 key 数组
        validator(val) {
            return isStringArr(val)
        }
    },
    menuStyle: Object, //根节点样式
    subMenuCloseDelay: Number, //用户鼠标离开子菜单后关闭延时
    subMenuOpenDelay: Number, //用户鼠标进入子菜单后开启延时
    theme: {
        validator(value) {
            return ['light', 'dark'].includes(value)
        },
        default: 'light'
    },
    onClickFunc: Function,
    onDeselectFunc: Function,
    onOpenChangeFunc: Function,
    onSelectFunc: Function,
    overflowedIndicator: Object
}

export { menuProps }

const menuItemProps = {
    disabled: {
        type: Boolean,
        default: false
    },
    itemKey: String,
    title: String,
    active: Boolean,
    index: Number,
    inlineIndent: {
        type: Number,
        default: 24
    },
    level: {
        type: Number,
        default: 1
    },
    mode: {
        validator(value) {
            return [
                'horizontal',
                'vertical',
                'vertical-left',
                'vertical-right',
                'inline'
            ].includes(value)
        },
        default: 'vertical'
    },
    subMenuKey: String,
    itemIcon: null
}

export { menuItemProps }

const subMenuProps = {
    popupClassName: String,
    children: Array,
    disabled: {
        type: Boolean,
        default: false
    },
    subKey: String,
    title: {
        type: [String, Object]
    },
    onTitleClick: Function,
    selectedKeys: {
        validator(val) {
            return isStringArr(val)
        }
    },
    openKeys: {
        validator(val) {
            return isStringArr(val)
        }
    },
    multiple: Boolean,
    index: Number,
    triggerSubMenuAction: String,
    getPopupContainer: Function,
    forceSubMenuRender: Boolean,
    openAnimation: String,
    subMenuOpenDelay: {
        type: Number,
        default: 0.1
    },
    subMenuCloseDelay: {
        type: Number,
        default: 0.1
    },
    level: {
        type: Number,
        default: 1
    },
    inlineIndent: {
        type: Number,
        default: 24
    },
    openTransitionName: String,
    popupOffset: Array,
    isOpen: Boolean,
    mode: {
        validator(value) {
            return [
                'horizontal',
                'vertical',
                'vertical-left',
                'vertical-right',
                'inline'
            ].includes(value)
        },
        default: 'vertical'
    },
    itemIcon: {
        type: null,
    },
    expandIcon: {
        type: null,
    },
}

export { subMenuProps }

const menuItemGroupProps = {
    children: Array,
    title: {
        type: [String, Object]
    },
    renderMenuItem: {
        type: Function
    },
    index: Number,
    subMenuKey: String,
    disabled: {
        type: Boolean,
        default: true
    }
}

export { menuItemGroupProps }

const subPopupMenuProps = {
    openTransitionName: String,
    openAnimation: String,
    openKeys: {
        type: [String, Number]
    },
    visible: {
        type: Boolean,
        default: true
    },
    parentMenu: Object,
    focusable: {
        type: Boolean,
        default: true
    },
    multiple: Boolean,
    defaultActiveFirst: Boolean,
    activeKey: {
        type: [String, Number]
    },
    selectedKeys: {
        type: [String, Number]
    },
    defaultSelectedKeys: {
        type: [String, Number]
    },
    defaultOpenKeys: {
        type: [String, Number]
    },
    level: {
        type: Number,
        default: 1
    },
    mode: {
        validator(value) {
            return [
                'horizontal',
                'vertical',
                'vertical-left',
                'vertical-right',
                'inline'
            ].includes(value)
        },
        default: 'vertical'
    },
    triggerSubMenuAction: {
        validator(value) {
            return ['click', 'hover'].includes(value)
        }
    },
    inlineIndent: {
        type: [String, Number],
        default: 24
    },
    itemIcon: {
        type: null,
    },
    children: Array
}

export { subPopupMenuProps }