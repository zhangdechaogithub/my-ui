import './style/index.scss'
import { getPrefixCls, hasProp, isDOM, addEventListener, aniFrame, cancelAniFrame, getOffsetTop, getScroll } from '../_util/'
import classNames from 'classnames'

const Affix = {
    name: 'Affix',
    props: {
        container: Function,
        offsetTop: Number,
        offsetBottom: Number
    },
    data() {
        return {
            top: 0,
            events: ['resize', 'scroll'],
            eventHandlers: {},
        }
    },
    mounted() {
        this.top = this.$refs.affixNode.offsetTop //初始位置
        this.inc = setTimeout(() => {
            this.target = isDOM(this.container()) ? this.container() : window
            this.setNodeEvents(this.target)
            this.setPosition({ currentTarget: this.target })
        })
    },
    watch: {
        container(val) {
            this.clearNodeEvents()
            this.setNodeEvents(val)
            this.setPosition({ currentTarget: val })
        },
        offsetTop() {
            this.setPosition({ currentTarget: this.target })
        },
        offsetBottom() {
            this.setPosition({ currentTarget: this.target })
        }
    },
    beforeDestroy() {
        this.clearNodeEvents()
        clearTimeout(this.inc)
    },
    methods: {
        setNodeEvents(node) {
            if (!node) {
                return
            }
            this.clearNodeEvents()
            this.events.forEach((ev) => {
                this.eventHandlers[ev] = addEventListener(node, ev, this.setPosition)
            })
        },
        clearNodeEvents() {
            if (this.aniId) {
                cancelAniFrame(this.aniId)
            }
            this.events.forEach((ev) => {
                const handler = this.eventHandlers[ev]
                if (handler && handler.remove) {
                    handler.remove()
                }
            })
        },
        setPosition(e) {
            if (this.aniId) {
                cancelAniFrame(this.aniId)
            }
            let el = e.currentTarget
            let affixNode = this.$refs.affixNode
            let elHeight = el === window ? el.innerHeight : el.getBoundingClientRect().height
            let offsetTop = this.offsetTop ? this.offsetTop : elHeight - this.offsetBottom
            //container不为window时父层级的position的值 要为static
            let scrollTop = getScroll(this.target, true)

            this.aniId = aniFrame(() => {
                affixNode.style = el !== window ? `top:${el.offsetTop+ offsetTop}px;` : `top: ${offsetTop}px;position:fixed;`
            })
        }
    },
    render() {
        const prefixCls = getPrefixCls('affix')
        const className = classNames({
            [`${prefixCls}`]: true
        })
        const { $slots } = this
        return (
            <div class={className} ref="affixNode">{$slots.default}</div>
        )
    }
}

Affix.install = (Vue) => {
    Vue.component(Affix.name, Affix)
}


export default Affix