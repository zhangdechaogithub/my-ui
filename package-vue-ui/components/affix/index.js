import './style/index.scss'
import { BaseMixin, getClassName, getWindow, getElRect, getScroll, getOffset } from '../_util/'

const Affix = {
    name: "Affix",
    props: {
        offsetTop: Number,
        offset: Number,
        offsetButtom: Number,
        target: Function
    },
    mixins: [BaseMixin],
    data: () => ({
        events: ['resize', 'scroll', 'load'],
        affixStyle: undefined,
        placeholderStyle: undefined
    }),
    mounted() {
        const target = this.target
        this.inc = setTimeout(() => {
            this.setTargetEventListeners(target)
            this.updatePosition({})
        })
    },
    watch: {
        target(val) {
            this.clearEventListeners()
            this.setTargetEventListeners(val)
            this.updatePosition({})
        },
        offsetTop() {
            this.updatePosition({});
        },
        offsetBottom() {
            this.updatePosition({});
        },
    },
    methods: {
        setAffixStyle(e, affixStyle) {
            const { target } = this
            const originalAffixStyle = this.affixStyle
            const isWindow = target() === window

            if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
                return;
            }

            this.setState({ affixStyle: affixStyle }, () => {
                const affixed = !!this.affixStyle
                if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
                    this.$emit('change', affixed);
                }
            })
        },
        setPlaceholderStyle(placeholderStyle) {
            this.setState({ placeholderStyle: placeholderStyle })
        },
        syncPlaceholderStyle(e) {
            const { affixStyle } = this;
            if (!affixStyle) {
                return;
            }
            this.$refs.placeholderNode.style.cssText = ''
            affixStyle.width = this.$refs.placeholderNode.offsetWidth + 'px'
            this.setAffixStyle(e, affixStyle)
            this.setPlaceholderStyle({
                width: this.$refs.placeholderNode.offsetWidth + 'px',
            })
        },
        updatePosition(e) {
            const { offsetBottom, offset, target } = this
            let { offsetTop } = this

            const targetNode = target && target.constructor === Function ? target() : getWindow()

            const scrollTop = getScroll(targetNode, true)
            const affixNode = this.$el
            const elemOffset = getOffset(affixNode, targetNode)

            const elemSize = {
                width: this.$refs.fixedNode.offsetWidth,
                height: this.$refs.fixedNode.offsetHeight
            }
            const offsetMode = {
                top: false,
                bottom: false
            }
            //Default `offsetTop=0`

            if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
                offsetMode.top = true
                offsetTop = 0
            } else {
                offsetMode.top = typeof offsetTop === 'number'
                offsetMode.bottom = typeof offsetBottom === 'number'
            }
            const targetRect = getElRect(targetNode)

            const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight

            if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {

                const width = `${elemOffset.width}px`
                const top = `${targetRect.top + offsetTop}px`
                this.setAffixStyle(e, {
                    position: 'fixed',
                    top,
                    left: `${targetRect.left + elemOffset.left}px`,
                    width,
                })

                this.setPlaceholderStyle({
                    width,
                    height: `${elemSize.height}px`
                })
            } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight &&
                offsetMode.bottom) {
                // Fixed Bottom
                const targetButtomOffset =
                    targetNode === window ? 0 : window.innerHeight - targetRect.bottom

                const width = `${elemOffset.width}px`
                this.setAffixStyle(e, {
                    position: 'fixed',
                    bottom: targetBottomOffet + offsetBottom + 'px',
                    left: targetRect.left + elemOffset.left + 'px',
                    width,
                })
                this.setPlaceholderStyle({
                    width,
                    height: elemOffset.height + 'px',
                })
            } else {
                const { affixStyle } = this

                if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
                    affixStyle.width = affixNode.offsetWidth + 'px'
                    this.setAffixStyle(e, affixStyle)
                } else {
                    this.setAffixStyle(e, null)
                }
                this.setPlaceholderStyle(null)
            }
            if (e.type === 'resize') {
                this.syncPlaceholderStyle(e)
            }
        },
        setTargetEventListeners(getTarget) {
            const target = getTarget()
            if (!target) {
                return
            }
            this.clearEventListeners(target)
            this.events.forEach(etName => {
                target.addEventListener(etName, this.updatePosition, false)
            })
        },
        clearEventListeners(target) {
            this.events.forEach(etName => {
                target.removeEventListener(etName, this.updatePosition, false)
            })
        }
    },
    beforeDestory() {
        this.clearEventListeners(this.target())
        clearTimeout(this.inc)
    },

    render(h) {
        const { $slots, affixStyle, placeholderStyle, $props } = this
        var className = getClassName('affix')
        return (
            <div ref="affixNode" ref="placeholderNode" style={placeholderStyle}>
                <div class={className} ref="fixedNode" style={affixStyle}>
                    {$slots.default}
                </div>
            </div>
        )
    }
}

Affix.install = (Vue) => {
    Vue.component(Affix.name, Affix)
}


export default Affix