import './style/index.scss'
import { getPrefixCls, hasProp, isDOM, addEventListener } from '../_util/'
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

        }
    },

    mounted() {
        const target = isDOM(this.container()) ? this.container() : window
        setTimeout(() => {
            this.setScrollEvent(target)
        })
    },
    methods: {
        setScrollEvent(node) {
            if (node !== window) {
                this.scrollHander = addEventListener(node, 'scroll', (e) => {
                    let el = e.currentTarget
                    let elHeight = el.getBoundingClientRect().height
                    let elScrollHeight = el.scrollHeight

                    if (el.scrollTop > elScrollHeight - elHeight - 5) {//到达底部
                        console.log(elHeight, elScrollHeight, { target: e.currentTarget })
                    }
                })
            }
        }
    },
    render() {
        const prefixCls = getPrefixCls('affix')
        const className = classNames({
            [`${prefixCls}`]: true
        })
        const { target, offsetTop, offsetBottom, $slots } = this
        return (
            <div>
                <div class={className} ref="affixNode">{$slots.default}</div>
            </div>
        )
    }
}

Affix.install = (Vue) => {
    Vue.component(Affix.name, Affix)
}


export default Affix