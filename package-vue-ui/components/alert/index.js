import './style/index.scss'

import { BaseMixin, getClassName, getTransitionProps } from '../_util/'

import Icon from '../icon/'

const Alert = {
    props: {
        type: {
            validator(val){
                return ['success', 'info', 'warning', 'error'].includes(val)
            }
        },
        closable: Boolean,
        closeText: null,
        message: null,
        description: null,
        afterClose: Function,
        showIcon: Boolean,
        iconType: String,
        banner: Boolean,
        icon: null
    },
    name: 'Alert',
    mixins: [BaseMixin],
    data() {
        return {
            closing: true,
            closed: false,
            msg: 'hello world2'
        }
    },
    methods: {
        handleClose(e) {
            e.preventDefault()
            const dom = this.$el

            dom.style.height = `${dom.offsetHeight}px`
            dom.style.height = `${dom.offsetHeight}px`

            this.setState({
                closing: false
            })
            this.$emit('close', e)
        },
        animationEnd() {
            this.setState({
                closed: true,
                closing: true,
            });
            this.afterClose && this.afterClose()
        }
    },
    render(h) {
        const { prefixCls = getClassName('alert'), banner, closing, closed } = this
        let { closable, type, showIcon, iconType } = this

        const closeText = this.getComponentFromProp('closeText')
        const description = this.getComponentFromProp('description')
        const message = this.getComponentFromProp('message')
        const icon = this.getComponentFromProp('icon')
        //default banner has icon
        showIcon = banner && showIcon === undefined ? true : showIcon
        //warning icon is default
        type = banner && type === undefined ? 'waring' : type || 'info'

        let iconTheme = 'filled'

        if (!iconType) {
            switch (type) {
                case 'success':
                    iconType = 'check-circle-fill'
                    break;
                case 'info':
                    iconType = 'info-circle-fill'
                    break;
                case 'error':
                    iconType = 'close-circle-fill'
                    break;
                case 'warning':
                    iconType = 'warning-circle-fill'
                    break;
                default:
                    iconType = 'default'
            }
            //use outline icon in alert with description
            if (description) {
                iconTheme = 'outlined'
            }
        }
        //closeable when closeText is assigned
        if (closeText) {
            closable = true
        }

        const alertCls = {
            [`${prefixCls}`]: true,
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-close`]: !closing,
            [`${prefixCls}-with-description`]: !!description,
            [`${prefixCls}-no-icon`]: !showIcon,
            [`${prefixCls}-banner`]: !!banner,
            [`${prefixCls}-closable`]: closable
        }

        const closeIcon = closable ? (
            <a onClick={this.handleClose} class={`${prefixCls}-close-icon`}>
                {closeText || <Icon type="close" />}
            </a>
        ) : null
        const iconNode = showIcon ? (
            <Icon class={`${prefixCls}-icon`} type={iconType}/>
        ) : null

        const transitionProps = getTransitionProps(`${prefixCls}-slide-up`, {
            appear: false,
            afterLeave: this.animationEnd
        })
        return closed ? null : (
            <transition {...transitionProps}>
                <div v-show={closing} class={alertCls} data-show={closing}>
                    {showIcon ? iconNode : null}
                    <span class={`${prefixCls}-message`}>{message}</span>
                    <span class={`${prefixCls}-description`}>{description}</span>
                    {closeIcon}
                </div>
            </transition>
        )
    }
}

Alert.install = (Vue) => {
    Vue.component(Alert.name, Alert)
}

export default Alert