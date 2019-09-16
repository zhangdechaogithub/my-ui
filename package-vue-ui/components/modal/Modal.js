import './style/index.scss'
import getProps from './props'
import { getPrefixCls, filterEmpty, addEventListener, provider } from '../_util/'
import Icon from '../icon/'
import Button from '../button/'
const Modal = {
    name: 'Modal',
    props: getProps(),
    data: () => {
        return {
            isShow: false,
            closeEls: [],
            closeElsHandlers: [],
            isLoad: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            const { closable } = this
            if (closable) {
                this.closeEls = this.closeEls.concat([this.$refs.closeBtn])
            }
            this.closeEls.length && this.bindHideEvent()
        })
    },
    beforeDestroy() {
        if (this.closeElsHandlers.length) {
            this.closeElsHandlers.forEach((handler) => {
                handler.remove()
            })
        }
    },
    watch: {
        visible(val) {
            val ? this.show() : this.hide()
        }
    },
    methods: {
        getMaskNode() {
            const maskNode = <transition></transition>
            const maskProps = {
                propsData: {
                    name: 'fade'
                },
                listeners: {
                    beforeEnter: () => {
                        document.body.classList.add(getPrefixCls('modal-show'))
                    },
                    afterEnter: () => {
                        this.$emit('show')
                    },
                    afterLeave: () => {
                        document.body.classList.remove(getPrefixCls('modal-show'))
                        if (this.afterClose) {
                            this.afterClose()
                        }

                        this.$emit('hide')
                    }
                },
                children: [<div class={getPrefixCls('modal-mask')} v-show={this.isShow}></div>]
            }
            maskNode.componentOptions = Object.assign(maskNode.componentOptions, maskProps)
            return maskNode
        },
        getHeader() {
            const title = this.title
            if (!title) {
                return null
            }
            const headerCls = getPrefixCls('modal-header')
            const titleCls = getPrefixCls('modal-title')

            return (
                <div class={headerCls}>
                    <div class={titleCls}>{title}</div>
                </div>
            )
        },
        getCloseBtn() {
            const {
                btnCls = getPrefixCls('modal-close'),
                    btnXCls = getPrefixCls('modal-close-x'),
                    closable
            } = this
            return closable ? (
                <button type="button" class={btnCls} ref="closeBtn">
                    <span class={btnXCls}>
                        <Icon type="close" />
                    </span>
                </button>
            ) : null
        },

        getFooter() {
            const {
                footerCls = getPrefixCls('modal-footer'),
                    footer,
                    okType,
                    okText,
                    cancelText,
                    okCall,
                    cancelCall
            } = this
            let node
            if (footer || footer === null) {
                node = footer
            } else {
                const okBtnClick = () => {
                    if (this.confirmLoading) {
                        this.isLoad = true
                    }
                    if (okCall) {
                        okCall(this.hide)
                        this.$emit('ok')
                    }
                }
                const cancelBtnClick = () => {
                    this.hide()
                    if (cancelCall) {
                        cancelCall()
                        this.$emit('cancel')
                    }
                }
                node = (
                    <div>
                        <Button type={okType ? okType : 'primary'} onClick={okBtnClick} loading={this.isLoad}>
                            <span>{okText ? okText : provider.modal.okText}</span>
                        </Button>
                        <Button type="dashed"  onClick={cancelBtnClick}>
                            <span>{cancelText ? cancelText : provider.modal.cancelText}</span>
                        </Button>
                    </div>
                )
            }
            return (
                node !== null ? (
                    <div class={footerCls}>
                        {node}
                    </div>
                ) : null

            )
        },
        getWrapNode(closebtn, header, footer) {
            const {
                wrapCls = getPrefixCls('modal-wrap'),
                    contentCls = getPrefixCls('modal-content'),
                    bodyCls = getPrefixCls('modal-body'),
                    $slots,
                    width,
                    maskClosable,
            } = this

            const wrapData = {
                class: wrapCls,
                ref: 'wrap',
                directives: [{ name: "show", value: this.isShow }]
            }
            maskClosable ? wrapData.on = {
                click: (et) => {
                    et.preventDefault()
                    if (et.target === this.$refs.wrap) {
                        this.hide()
                    }
                }
            } : null
            const contentData = {
                class: contentCls,
                style: {
                    width: `${width}px`
                }
            }
            return (
                <transition name="zoom">
                    <div {...wrapData}>
                        <div {...contentData}>
                            {closebtn}
                               {header}
                            <div class={bodyCls}>
                                {filterEmpty($slots.default)}
                            </div>
                            {footer}
                        </div>
                     </div>
                 </transition>
            )
        },
        hide() {
            if (this.confirmLoading) {
                this.isLoad = false
            }
            this.$nextTick(()=>{
                this.isShow = false
            })
        },
        show() {
            this.isShow = true
        },
        bindHideEvent() {
            this.closeEls.forEach((el) => {
                const handler = addEventListener(el, 'click', (et) => {
                    et.preventDefault()
                    this.hide()
                }, false)
                this.closeElsHandlers.push(handler)
            })
        }
    },
    render() {
        const { prefixCls = getPrefixCls('modal'), $slots } = this
        const mask = this.getMaskNode()
        const wrap = this.getWrapNode(this.getCloseBtn(), this.getHeader(), this.getFooter())
        return (
            <div class={prefixCls}>
              {mask}
              {wrap}
            </div>
        )
    }
}

export default Modal