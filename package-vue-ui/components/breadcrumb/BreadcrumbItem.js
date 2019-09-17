import { getPrefixCls, hasProp, getComponentFromProp } from '../_util/'

const BreadcrumbItem = {
    name: 'BreadcrumbItem',
    props: {
        href: {
            type: String
        },
        separator: {
            type: null
        }
    },
    render() {
        const {
            prefixCls = getPrefixCls('breadcrumb-link'),
                $slots,
                href
        } = this
        const children = $slots.default
        let link = hasProp(this, 'href') ?
            (<a class={prefixCls} href={href}>{children}</a>) :
            (<span class={prefixCls}>{children}</span>)
        console.log(link)
        return children ? (
            <span>
            	{link}
            	<span class={getPrefixCls('breadcrumb-separator')}>
            		{getComponentFromProp(this, 'separator') || '/'}
            	</span>
            </span>
        ) : null

    }
}

export default BreadcrumbItem