import {Wave, filterEmpty, getClassName, getUpperCasePrefix} from '../_util/'
import Icon from '../icon/'
import buttonTypes from './buttonTypes'

const props = buttonTypes()
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

const Button = {
    name: 'Button',
    inheritAttrs: false,
    [`__${getUpperCasePrefix()}_BUTTON`]: true,
    props: props,
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
    computed: {
        classes() {
            const prefixCls = getClassName('btn')
            const { type, shape, size, hasTwoCNChar, sLoading, ghost, block, sizeMap, icon, $slots } = this
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
                [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
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
    mounted() {
        this.fixTwoCNChar()
    },
    updated() {
        this.fixTwoCNChar()
    },
    beforeDestory() {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout)
        }
    },
    methods: {
        fixTwoCNChar() {
        	const node = this.$refs.buttonNode 
        	if(!node){
        		return 
        	}
        	const buttonText = node.textContent || node.innerText
        	if(this.isNeedInserted() && isTwoCNChar(buttonText)){
        		if(!this.hasTwoCNChar){
        			this.hasTwoCNChar = true
        		}
        	}else if(this.hasTwoCNChar){
        		this.hasTwoCNChar = false
        	}
        },
        handleClick(event) {
            const { sLoading } = this.$data
            if (sLoading) {
                return
            }
            this.$emit('click', event)
        },
        insertSpace(child, needInserted) {
            const SPACE = needInserted ? ' ' : ''
            if (typeof child.text === 'string') {
                let text = child.text.trim()
                if (isTwoCNChar(text)) {
                    text = text.split('').join(SPACE)
                }
                return <span>{text}</span>
            }
            return child
        },
        isNeedInserted() {
            const { icon, $slots } = this
            return $slots.default && $slots.default.length === 1 && !icon
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
            attrs: Object.assign({ disabled: disabled }, $attrs),
            class: classes,
            on: Object.assign({
                click: handleClick
            }, $listeners),
            ref: 'buttonNode'
        }
        const iconType = sLoading ? 'ellipsis' : icon
        const iconNode = iconType ? <Icon type={iconType} /> : null
        const children = filterEmpty($slots.default)

        const kids = children.map(child => this.insertSpace(child, this.isNeedInserted))

        if ($attrs.href !== undefined) {
            return (<a {...buttonProps}>{iconNode}{kids}</a>)
        } else {
            buttonProps.attrs.type = htmlType || 'button'
            return (<Wave><button {...buttonProps}>{iconNode}{kids}</button></Wave>)
        }
    }
}
export default Button