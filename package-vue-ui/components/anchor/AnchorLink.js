import { getPrefixCls } from '../_util/'

const AnchorLink = {
    name: 'AnchorLink',
    props: {
        href: String,
        title: String
    },
    inject: {
        anchor: { default: () => ({}) },
        context: { default: () => ({}) }
    },
    watch: {
        href(val, old) {
            this.anchor.unRegister(old)
            this.anchor.register(val)
        }
    },
    mounted() {
        this.anchor.register(this.href)
    },
    beforeDestory() {
        this.anchor.unRegister(this.href)
    },
    methods: {
        onClickHandler(e) {
           // e.preventDefault()
            this.anchor.scrollTo(this.href)
            const { href, title } = this.$props
            this.context.$emit('click', e, { title, href })
        }
    },
    render() {
        const { $slots, href, title, onClickHandler, prefixCls = getPrefixCls('anchor') } = this
        const active = this.context.activeLink === href
        const wrapCls = {
            [`${prefixCls}-link`]: true,
            [`${prefixCls}-link-active`]: active
        }
        const titleCls = {
            [`${prefixCls}-link-title`]: true,
            [`${prefixCls}-link-title-active`]: active
        }
        return (
            <div class={wrapCls}>
            	<a 
            	class={titleCls}
            	href={href}
            	title={typeof title === 'string' ? title : ''}
            	onClick={onClickHandler}
            	>
            		{title}
            	</a>
            	{$slots.default}
            </div>
        )
    }
}

export default AnchorLink