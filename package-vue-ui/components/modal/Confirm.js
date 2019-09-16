import Modal from './Modal'
import { getPrefixCls, provider } from '../_util/'
import Icon from '../icon/'
import Button from '../button/'
const Confirm = {
    name: 'confirm',
    props: {
        type: {
            validator(val) {
                return ['success', 'info', 'warning', 'error', 'confirm'].includes(val)
            },
            default: 'confirm'
        },
        title: {
            type: String
        },
        visible: {
            type: Boolean
        },
        closable: {
            type: Boolean
        },
        afterClose: {
            type: Function
        },
        onOk: {
            type: Function
        }
    },
    data() {
        return {
            isShow: false,
            //closeEls: [],
            // closeElsHandlers: []
        }
    },
    watch: {
        visible(val) {
            this.isShow = val
        }
    },
    methods: {
        getTitle() {
            const titleCls = getPrefixCls('modal-confirm-title')
            return (
                <span class={titleCls}>
                    {this.title}
                </span>
            )
        },
        getIcon() {
            const iconType = {
                success: 'check-circle',
                info: 'info-circle',
                warning: 'warning-circle',
                error: 'close-circle',
                confirm: 'question-circle'
            }

            return <Icon type={iconType[this.type]} />
        },
        getBtns() {
            const btnCls = getPrefixCls('modal-confirm-btns')
            const clickCancel = () => {
                this.isShow = false
            }
            const clickOk = () => {
                this.onOk && this.onOk()
                this.isShow = false
            }
            return this.type !== 'confirm' ?
                (<div class={btnCls}>
                    <Button type="primary" onClick={clickOk}>
                        <span>{provider.modal.confirmText}</span>
                    </Button>
                </div>) :
                (<div class={btnCls}>
                    <Button type="primary"  onClick={clickOk}>
                        <span>{provider.modal.okText}</span>
                    </Button>
                    <Button type="dashed" onClick={clickCancel}>
                        <span>{provider.modal.cancelText}</span>
                    </Button>
                </div>)
        },
        getConfirmBody(content) {
            const icon = this.getIcon()
            const title = this.getTitle()
            const btns = this.getBtns()
            return (
                <div class={getPrefixCls('modal-confirm-body-wrapper')}>
                    <div class={getPrefixCls('modal-confirm-body')}>
                        {icon}
                        {title}
                        <div class={getPrefixCls('modal-confirm-content')}>
                            {content}
                        </div>
                    </div>
                    {btns}
                </div>
            )
        }
    },
    render() {
        const {
            prefixCls = getPrefixCls('modal-confirm'),
                $slots,
                isShow,
                afterClose
        } = this
        const modal = (<Modal />)
        modal.data.class = `${prefixCls} ${getPrefixCls(`modal-confirm-${this.type}`)}`
        modal.componentOptions.propsData = Object.assign(modal.componentOptions.propsData, {
            visible: isShow,
            closable: false,
            afterClose: afterClose,
            width: 450,
            maskClosable: false,
            footer: null,

        })
        modal.componentOptions.children = [this.getConfirmBody($slots.default)]
        return modal
    }
}

export default Confirm