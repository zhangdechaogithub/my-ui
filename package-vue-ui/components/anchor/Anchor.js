import './style/index.scss'

import classNames from 'classnames'
import { getPrefixCls, addEventListener, isDOM, getOffsetTop, getScroll, aniFrame } from '../_util/'
import Affix from '../affix/'

const Anchor = {
    name: 'Anchor',
    props: {
        offsetTop: Number,
        affix: Boolean,
        //container: Function,
        wrapCls: String,
        wrapStyle: Object
    },
    provide() {
        return {
            anchor: {
                register: link => {
                    if (!this.links.includes(link)) {
                        this.links.push(link)
                    }
                },
                unRegister: link => {
                    const index = this.links.indexOf(link)
                    if (index !== -1) {
                        this.links.splice(index, 1)
                    }
                },
                scrollTo: this.scrollToCall,
                data: this.$data
            },
            context: this
        }
    },

    data() {
        return {
            links: [],
            activeLink: null,
            container: () => window
        }
    },
    mounted() {
        this.$nextTick(() => {
            const target = isDOM(this.container()) ? this.container() : window
            this.activeLink = this.getActiveLinkStr()
            this.scrollToCall(this.activeLink)
            this.scrollHandler = addEventListener(target, 'scroll', this.updatedState)
        })
    },
    beforeDestrory() {
        if (this.scrollHandler) {
            this.scrollHandler.remove()
        }
    },
    methods: {
        linkMatchRegx() {
            return /#([^#]+)$/
        },
        getActiveLinkStr() {
            let min = window.Number.MAX_VALUE
            let active = null
            this.links.forEach((v) => {
                const resArr = v.match(this.linkMatchRegx())
                if (resArr) {
                    const node = document.getElementById(resArr[1])
                    const top = window.Math.abs(node.getBoundingClientRect().top)
                    min = (top < min) ? top : min
                    if (min === top) {
                        active = v
                    }
                }
            })
            return active
        },
        getAnchorNode(classes, $slotNode) {
            const { wrapCls, wrapStyle, anchorCls, inkCls, prefixCls = getPrefixCls('anchor') } = classes
            return (
                <div class={wrapCls} style={wrapStyle}>
                    <div class={anchorCls}>
                        <div class={`${prefixCls}-ink`}>
                            <span class={inkCls} ref="linkNode" />
                        </div>
                        {$slotNode}
                    </div>
                </div>
            )
        },
        scrollToCall(link) {
            const resArr = link.match(this.linkMatchRegx())
            if (!resArr) {
                return
            }
            const id = resArr[1]
            const node = document.getElementById(id)
            if (!node) {
                return
            }
            const container = this.container()
            const easeInOutCubic = (t, b, c, d) => {
                const cc = c - b
                t /= d / 2
                if (t < 1) {
                    return (cc / 2) * t * t * t + b
                }
                return (cc / 2) * ((t -= 2) * t * t + 2) + b
            }

            const elOffsetTop = getOffsetTop(node, container)
            const scrollTop = getScroll(container, true)
            const elSchollTop = scrollTop + elOffsetTop

            const start = Date.now()
            const aniFunc = () => {
                const timeStamp = Date.now()
                const time = timeStamp - start

                const nextScrollTop = easeInOutCubic(time, scrollTop, elSchollTop, 450)
                if (container === window) {
                    window.scrollTo(window.pageXOffset, nextScrollTop)
                } else {
                    container.scrollTop = nextScrollTop
                }
                if (time < 450) {
                    aniFrame(aniFunc)
                }
            }
            aniFrame(aniFunc)
            this.activeLink = link
        },
        updatedState(e) {
            const prefixCls = getPrefixCls('anchor')
            this.activeLink = this.getActiveLinkStr()
            const linkNode = this.$el.getElementsByClassName(`${prefixCls}-link-title-active`)[0]
            if (linkNode) {
                this.$refs.linkNode.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`
            }
        }
    },

    render() {
        const { $slots, affix, offsetTop, container, activeLink, prefixCls = getPrefixCls('anchor') } = this
        const classes = {
            wrapCls: classNames(this.wrapCls, {
                [`${prefixCls}-wrapper`]: true
            }),
            wrapStyle: Object.assign({
                maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh'
            }, this.wrapStyle),
            anchorCls: classNames(prefixCls),
            inkCls: {
                [`${prefixCls}-ink-ball`]: true,
                visible: activeLink
            }
        }
        const anchorNode = this.getAnchorNode(classes, $slots.default)
        return !affix ? (
            anchorNode
        ) : (
            <Affix offsetTop={offsetTop} container={container}>
                {anchorNode}
            </Affix>
        )
    }
}

Anchor.install = (Vue) => {
    Vue.component(Anchor.name, Anchor)
}
export default Anchor