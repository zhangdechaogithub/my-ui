import Icon from '../Icon/'
import props from './props'
import { getPrefixCls, filterEmpty, waveAni } from '../_util/'

const Button = {
    name: 'Button',
    data() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            },
            sLoading: !!this.loading,
            hasTwoCNChar: false
        }
    },
    props: props(),
    computed: {
        classes() {
            const prefixCls = getPrefixCls('btn')
            const { type, shape, size, sLoading, ghost, block, sizeMap, icon, $slots } = this
            const sizeCls = sizeMap[size] || ''
            const children = filterEmpty($slots.default)
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-${type}`]: type,
                [`${prefixCls}-${shape}`]: shape,
                [`${prefixCls}-${sizeCls}`]: sizeCls,
                [`${prefixCls}-icon-only`]: !children && children !== 0 && icon,
                [`${prefixCls}-loading`]: sLoading,
                [`${prefixCls}-background-ghost`]: ghost || type === 'ghost',
                [`${prefixCls}-block`]: block
            }
        }
    },
    watch: {
        loading(val) {
            clearTimeout(this.delayTimeout)
            if (typeof val !== 'boolean' && val && val.delay) {
                this.delayTimeout = setTimeout(() => {
                    this.sLoading = !!val
                }, val.delay)
            } else {
                this.sLoading = !!val
            }
        }
    },
    beforeDestory() {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout)
        }
    },
    methods: {
        handleClick(event) {
            const { sLoading } = this.$data
            if (sLoading) {
                return
            }
            waveAni(event.target, () => {
                this.$emit('click', event)
            })

        },
        inertText(child) {
            if (typeof child.text === 'string') {
                let text = child.text.trim()
                return <span>{text}</span>
            }
            return child
        }
    },
    render() {
        const {
            htmlType,
            classes,
            icon,
            disabled,
            handleClick,
            sLoading,
            $slots,
            $attrs,
            $listeners
        } = this
        const buttonProps = {
            attrs: Object.assign({ disabled: disabled, type: htmlType || 'button' }, $attrs),
            class: classes,
            on: Object.assign({
                click: handleClick
            }, $listeners),
            ref: 'buttonNode'
        }
        const iconType = sLoading ? 'reload' : icon
        const iconNode = iconType ? <Icon type={iconType} /> : null
        const kids = this.inertText(filterEmpty($slots.default))
        return (<button {...buttonProps}>{iconNode}{kids}</button>)
    }
}

export default Button