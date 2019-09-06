import { getPrefixCls, filterEmpty } from '../_util/'
const ButtonGroup = {
    name: 'ButtonGroup',
    props: {
        size: {
            validator(value) {
                return ['small', 'large', 'default'].includes(value)
            },
            default: 'default'
        }
    },
    data() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        }
    },
    computed: {
        classes() {
            const { prefixCls = getPrefixCls('btn-group'), size, sizeMap } = this
            const sizeCls = sizeMap[size] || ''

            return [{
                [`${prefixCls}`]: true,
                [`${prefixCls}-${sizeCls}`]: sizeCls
            }]
        }
    },
    render() {
        const { classes, $slots } = this
        return <div class={classes}>{filterEmpty($slots.default)}</div>
    }
}

export default ButtonGroup