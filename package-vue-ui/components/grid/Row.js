import { getPrefixCls } from '../_util/'

const responsiveArr = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
let enquire = null

if (typeof window !== 'undefined') {
    const matchMediaPollfill = media => {
        return {
            media: media,
            matches: false,
            addListener() {},
            removeEventListener() {}
        }
    }
    window.matchMedia = window.matchMedia || matchMediaPollfill
    enquire = require('enquire.js')
}
const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
}
const Row = {
    name: 'Row',
    props: {
        gutter: [Number, Object],
        type: {
            validator(value) {
                return ['flex'].includes(value)
            }
        },
        align: {
            validator(value) {
                return ['top', 'middle', 'bottom'].includes(value)
            }
        },
        justify: {
            validator(value) {
                return ['start', 'end', 'center', 'space-around', 'space-between'].includes(value)
            }
        }
    },
    provide() {
        return {
            rowContext: this
        }
    },
    data() {
        return {
            screens: {}
        }
    },
    beforeDestory() {
        Object.keys(responsiveMap).map(screen => enquire.unregister(responsiveMap[screen]))
    },
    methods: {
        getGutter() {
            const gutter = this.gutter
            if (typeof gutter === 'object') {
                for (let i = 0; i < responsiveArr.length; i++) {
                    const breakpoint = responsiveArr[i]
                    if (this.screens[breakpoint] && gutter[breakpoint] !== undefined) {
                        return gutter[breakpoint]
                    }
                }
            }
            return gutter
        }
    },
    mounted() {
        this.$nextTick(() => {
            Object.keys(responsiveMap).map(screen => enquire.register(responsiveMap[screen], {
                match: () => {
                    if (typeof this.gutter !== 'object' && typeof this.gutter !== 'number') {
                        return
                    }
                    this.screens = Object.assign({
                        [screen]: true
                    }, this.screens)
                },
                unmatch: () => {
                    if (typeof this.gutter !== 'object' && typeof this.gutter !== 'number') {
                        return
                    }
                    this.screens = Object.assign({
                        [screen]: false
                    }, this.screens)
                },
                destory() {}
            }))
        })
    },
    render() {
        const { type, justify, align, prefixCls = getPrefixCls('row'), $slots } = this
        const gutter = this.getGutter()
        const classes = {
            [prefixCls]: !type,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${type}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align,
        }

        const rowStyle = gutter > 0 ? {
            marginLeft: `${gutter / -2}px`,
            marginRight: `${gutter / -2}px`,
        } : {}

        return (
            <div class={classes} style={rowStyle}>{$slots.default}</div>
        )
    }
}

Row.install = (Vue) => {
    Vue.component(Row.name, Col)
}

export default Row