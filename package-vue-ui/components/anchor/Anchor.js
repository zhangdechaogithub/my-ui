import './style/index.scss'

import { BaseMixin, camelize, getClassName, scrollTo, getWindow, getOffsetTop } from '../_util/'

import Affix from '../affix'

export const anchor = camelize(getClassName('Anchor'))
export const anchorContext = camelize(getClassName('AnchorContext'))
const sharpMatcherRegx = /#([^#]+)$/

const Anchor = {
    name: 'Anchor',
    props: {
        offsetTop: Number,
        bounds: Number,
        affix: Boolean,
        showInkInFixed: Boolean,
        getContainer: Function,
        wrapperClass: String,
        wrapperStyle: Object,
    },
    mixins: [BaseMixin],
    data() {
        this.links = []
        return {
            activeLink: null
        }
    },
    provide() {
        return {
            [anchor]: {
                registerLink: link => {
                    if (!this.links.includes(link)) {
                        this.links.push(link)
                    }
                },
                unregisterLink: link => {
                    const index = this.links.indexOf(link)
                    if (index !== -1) {
                        this.links.splice(index, 1)
                    }
                },
                $data: this.$data,
                scrollTo: this.handleScrollTo
            },
            [anchorContext]: this
        }
    },
    mounted() {
        this.$nextTick(() => {
            const { getContainer } = this
            getContainer().addEventListener('scroll', this.handleScroll, false)
            this.handleScroll()
        })
    },
    beforeDestory() {
        const { getContainer } = this
        getContainer().removeEventListener(getContainer())
    },
    updated() {
        this.$nextTick(() => {
            this.updateInk()
        })
    },
    methods: {
        handleScroll() {
            if (this.animating) {
                return
            }
            const { offsetTop, bounds } = this
            this.setState({
                activeLink: this.getCurrentAnchor(parseInt(offsetTop), parseInt(bounds)),
            })
        },
        handleScrollTo(link) {

            const { offsetTop, getContainer } = this
            this.animating = true
            this.setState({ activeLink: link })

            scrollTo(link, offsetTop, getContainer, () => {
                this.animating = false;
            })

        },
        getCurrentAnchor(offsetTop = 0, bounds = 0) {
            const activeLink = ''
            if (typeof document === 'undefined') {
                return activeLink
            }

            const linkSections = []
            const { getContainer } = this
            const container = getContainer()

            this.links.forEach(link => {
                const sharpLinkMatch = sharpMatcherRegx.exec(link.toString())
                if (!sharpLinkMatch) {
                    return
                }
                const target = document.getElementById(sharpLinkMatch[1])
                if (target) {
                    const top = getOffsetTop(target, container)
                    if (top < offsetTop + bounds) {
                        linkSections.push({
                            link,
                            top
                        })
                    }
                }
            })
            if (linkSections.length) {
                const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev))
                return maxSection.link
            }
            return ''
        },
        updateInk() {
            if (typeof document === 'undefined') {
                return
            }
            const prefixCls = getClassName('anchor')
            const linkNode = this.$el.getElementsByClassName(`${prefixCls}-link-title-active`)[0]
            if (linkNode) {
                this.$refs.linkNode.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`
            }
        }
    },
    render() {
        const prefixCls = getClassName('anchor')
        const { offsetTop, affix, showInkInFixed, activeLink, $slots, getContainer } = this

        const inkClass = {
            [`${prefixCls}-ink-ball`]: true,
            visible: activeLink
        }

        const wrapperClass = Object.assign({
            [`${prefixCls}-wrapper`]: true
        }, this.wrapperClass)

        const anchorClass = Object.assign({
            [prefixCls]: true,
        }, { fixed: !affix && !showInkInFixed })

        const wrapperStyle = Object.assign({
            maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
        }, this.wrapperStyle)

        const anchorContent = (
            <div class={wrapperClass} style={wrapperStyle}>
                <div class={anchorClass}>
                  <div class={`${prefixCls}-ink`}>
                    <span class={inkClass} ref="linkNode" />
                  </div>
                  {$slots.default}
                </div>
            </div>
        )

        return !affix ? (
            anchorContent
        ) : (
            <Affix offsetTop={offsetTop} target={getContainer}>
            {anchorContent}
          </Affix>
        )
    }
}

export default Anchor