import { menuProps } from './props'
import { getPrefixCls, filterEmpty } from '../_util/'
const getProps = () => {
    const props = menuProps
    props.selectable = {
        type: Boolean,
        default: true
    }
    return props
}
const Menu = {
    name: 'Menu',
    props: getProps(),
    methods: {
    },
    render() {
        const {
        	prefixCls = getPrefixCls('menu'), 
        	$slots,
        	mode,
        	theme, 
        } = this

        const cls = {
        	[`${prefixCls}`]: true,
        	[`${prefixCls}-root`]: true,
        	[`${prefixCls}-${mode}`]: true,
        	[`${prefixCls}-${theme}`]: true
        }

        return (
            <ul class={cls}>{$slots.default}</ul>
        )
    }
}

export default Menu