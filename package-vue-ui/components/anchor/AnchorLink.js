import { getClassName, camelize, getComponentFromProp } from '../_util/'
import { anchor, anchorContext } from './Anchor'

const AnchorLink = {
    name: 'AnchorLink',
    props: {
        href: String,
        title: null
    },
    inject: {
        [anchor]: { default: () => ({}) },
        [anchorContext]: { default: () => ({}) }
    },
    watch: {
        href(val, oldVal) {
            this[anchor].unregisterLink(oldVal)
            this[anchor].registerLink(val)
        }
    },
    mounted() {
        this[anchor].registerLink(this.href)
    },
    beforeDestory() {
        this[anchor].unregisterLink(this.href)
    },
    methods: {
        handleClick(e) {
            this[anchor].scrollTo(this.href)
            const { scrollTo } = this[anchor]
            const { href, title } = this.$props
            if (this[anchorContext].$emit) {
                this[anchorContext].$emit('click', e, { title, href })
            }
            scrollTo(href)
            
        }
    },
    render() {
        const prefixCls = getClassName('anchor')
        const { href, $slots } = this
        const title = getComponentFromProp(this, 'title')

        const active = this[anchor].$data.activeLink === href
        const wrapperClassName = {
            [`${prefixCls}-link`]: true,
            [`${prefixCls}-link-active`]: active
        }

        const titleClassName = {
            [`${prefixCls}-link-title`]: true,
            [`${prefixCls}-link-title-active`]: active
        }
        return (
            <div class={wrapperClassName}>
        		<a 
        		class={titleClassName}
        		href={href}
        		title={typeof title === 'string' ? title : ''}
        		onClick={this.handleClick}>
        		{title}
        		</a>
        		{$slots.default}
        	</div>
        )
    }
}

export default AnchorLink