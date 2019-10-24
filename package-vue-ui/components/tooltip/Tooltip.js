import { getPrefixCls, getComponentFromProp, getOptionProps } from '../_util/'
import props from './props'
import Vue from 'vue'

const Tooltip = {
    name: 'Tooltip',
    props: props,
    data() {
        return {

        }
    },
    mounted() {
        this.overlayNode = this.getOverlayWrap(<div style={{left: '100px', position:'absolute'}}>hello test</div>, this.visible, {})
        this.source = this.overlayNode.$el
        this.target = this.$slots.default[0].elm
    },

    methods: {
        getPopupElement() {
            const { prefixCls, tipId } = this.$props
            const overlay = getComponentFromProp(this, 'overlay')
            return [
                <div class={`${prefixCls}-arrow`} key="arrow">
                	{getComponentFromProp(this, 'arrowContent')}
                </div>,
                <div class={`${prefixCls}-inner`} role="tooltip">
				 	{typeof overlay === 'function' ? overlay() : overlay}
				</div>
            ]
        },
        getOverlayWrap(node, visible, nodeStyle) {
            const overlayNode = document.createElement('div')
            let container = document.body
            if (this.getPopupContainer) {
                container = this.getPopupContainer()
            }
            container.appendChild(overlayNode)
            const wrapStyle = {
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '100%'
            }
            const context = this
            return new Vue({
                el: overlayNode,
                data() {
                    return {
                        visible: false
                    }
                },
                mounted() {
                    this.visible = visible
                },
                watch: {
                    visible(val) {
                        if (context.visibleChange) {
                            context.visibleChange(val)
                        }
                    }
                },
                render() {
                    return (
                        <div style={wrapStyle}>
                        	<transition name="zoom-up">
								<div ref="popup" v-show={this.visible} style={nodeStyle}>{node}</div>
							</transition>
                        </div>
                    )
                }
            })
        },
        clickHandler(et) {
            this.overlayNode.visible = !this.overlayNode.visible
        },
        hoverHandler(et) {
            if (et.type === 'mouseleave') {
                setTimeout(() => {
                    this.overlayNode.visible = false
                }, this.mouseEnterDelay * 1000)

            }
            if (et.type === 'mouseenter') {
                setTimeout(() => {
                    this.overlayNode.visible = true
                }, this.mouseLeaveDelay * 1000)
            }
        },
        focusHandler(et) {
            this.overlayNode.visible = true
        },
        blurHandler(et) {
            this.overlayNode.visible = false
        },
        getTriggerEvent() {
            const triggerEvents = {
                hover: {
                    mouseenter: this.hoverHandler,
                    mouseleave: this.hoverHandler
                },
                click: {
                    click: this.clickHandler,
                },

                focus: {
                    focus: this.focusHandler,
                    blur: this.blurHandler
                }
            }
            return triggerEvents[this.trigger]
        },
        getPlacements() {

        },
        getPopupDomNode() {

        },
        isNoTitle() {

        },
        onPopupAlign(domNode, align) {

        }
    },

    render() {
        const { prefixCls = getPrefixCls('tooltip') } = this
        const tooltipProps = {
            on: Object.assign({}, this.getTriggerEvent())
        }
        this.$slots.default[0].data = Object.assign(tooltipProps, this.$slots.default[0].data)
        return this.$slots.default
    }
}

export default Tooltip