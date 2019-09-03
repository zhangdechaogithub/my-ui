import { getPrefixCls } from '../_util/'
const Col = {
    name: 'Col',
    props: {
        span: [String, Number],
        order: [String, Number],
        offset: [String, Number],
        push: [String, Number],
        pull: [String, Number],
        xs: [Object, Number],
        sm: [Object, Number],
        md: [Object, Number],
        lg: [Object, Number],
        xl: [Object, Number],
        xxl: [Object, Number],
    },
    inject: {
        rowContext: {
            default: () => null
        }
    },
    render() {
        const {
            span,
            order,
            offset,
            push,
            pull,
            prefixCls = getPrefixCls('col'),
            $slots,
            $attrs,
            $listeners,
            rowContext
        } = this
        let sizeClassObj = {}

        var medias = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
        medias.forEach(size => {
            let sizeProps = {}

            if (typeof this[size] === 'number') {
                sizeProps.span = this[size]
            } else if (typeof this[size] === 'object') {
                sizeProps = this[size] || {}
            }
            Object.assign(sizeClassObj, {
                [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
                [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
                [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
                [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
                [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
            })
        })

        const classes = Object.assign(sizeClassObj, {
            [`${prefixCls}-${span}`]: span !== undefined,
            [`${prefixCls}-order-${order}`]: order,
            [`${prefixCls}-offset-${offset}`]: offset,
            [`${prefixCls}-push-${push}`]: push,
            [`${prefixCls}-pull-${pull}`]: pull,

        })
        
        const divProps = {
            on: $listeners,
            attrs: $attrs,
            class: classes,
            style: {}
        }
        if (rowContext) {
            const gutter = rowContext.getGutter()
            if (gutter > 0) {
                divProps.style = {
                    paddingLeft: `${gutter / 2}px`,
                    paddingRight: `${gutter / 2}px`,
                }
            }
        }
        return (<div {...divProps}>{$slots.default}</div>)
    }
}

Col.install = (Vue) => {
    Vue.component(Col.name, Col)
}
export default Col