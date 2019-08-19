import { getClassName, filterEmpty } from '../_util/'
export default {
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
            const { prefixCls = getClassName('btn-group'), size, sizeMap } = this
            const sizeCls = sizeMap[size] || ''

            return [{
                [`${prefixCls}`]: true,
                [`${prefixCls}-${sizeCls}`]: sizeCls
            }]
        }
    },
    render() {
    	const {classes, $slots} = this
        return <div class={classes}>{filterEmpty($slots.default)}</div>
    }
}