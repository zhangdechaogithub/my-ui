import './style/index.scss'
import { getPrefixCls } from '../_util/'
import Icon from '../icon/'

const Alert = {
    name: 'Alert',
    props: {
        type: {
            validator(val) {
                return ['success', 'info', 'warning', 'error'].includes(val)
            }
        },
        closable: Boolean,
        msg: null,
        description: null,
        afterClose: Function,
        showIcon: Boolean,
        width: Number,
        autoHide: {
            type: Boolean,
            default: false
        },
        time: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
            closed: false
        }
    },
    mounted() {
        if (this.autoHide) {
            setTimeout(() => {
                this.closed = true
            }, this.time * 1000)
        }
    },
    methods: {
        getIconCls(type) {
            let icon
            switch (type) {
                case 'success':
                    icon = 'check-circle-fill'
                    break
                case 'info':
                    icon = 'info-circle-fill'
                    break
                case 'error':
                    icon = 'close-circle-fill'
                    break
                case 'warning':
                    icon = 'warning-circle-fill'
                    break
            }
            return icon
        },
        getIcon(type, cls) {
            return <Icon type={type} class={cls}/>
        },
        getPNode(cls, msg) {
            return <p class={cls}>{msg}</p>
        },
        getAlertNode() {
            const prefixCls = getPrefixCls('alert')
            let { description, msg, type, showIcon, width, closable, closed } = this
            if (!type) {
                type = 'info'
            }
            const classes = [`${prefixCls}`, `${prefixCls}-${type}`]
            let style = {
                width: this.widthValidate(width)
            }

            const iconNode = this.getIcon(this.getIconCls(type))
            const msgNode = this.getPNode(`${prefixCls}-msg`, msg)
            const descriptionNode = this.getPNode(`${prefixCls}-description`, description)
            const closeNode = <a onClick={this.closeOnClick}> {this.getIcon('close', `${prefixCls}-close`)}</a>
            return (
                <div v-show={!this.closed} class={classes} style={style}>
					<div class={`${prefixCls}-icon`}>
            			{showIcon ? iconNode : null}
            		</div>
					<div class={`${prefixCls}-txt`}>
						{msg? msgNode : null}
						{description ? descriptionNode : null}
					</div>
					{closable ? closeNode : null}
				</div>
            )
        },
        widthValidate(width) {
            if (width < 600 && width > 150) {
                return `${width}px`
            }
            return 'auto'
        },
        closeOnClick(e) {
            e.preventDefault()
            this.closed = true
            this.$emit('close')
        }
    },
    render() {
        const alertNode = <transition></transition>
        const alertProps = {
            propsData: {
                name: 'move-down'
            },
            listeners: {
                afterLeave: () => {
                	if(this.afterClose){
                		this.afterClose()
                	}
                	this.$el.remove()
                }
            },
            children: [this.getAlertNode()]
        }
        alertNode.componentOptions = Object.assign(alertNode.componentOptions, alertProps)

        return alertNode

    }
}
Alert.install = (Vue) => {
    Vue.component(Alert.name, Alert)
}
export default Alert