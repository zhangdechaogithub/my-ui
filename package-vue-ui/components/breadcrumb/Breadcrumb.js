import { getPrefixCls, cloneElement, filterEmpty, getComponentFromProp, getSlotOptions } from '../_util/'
import props from './props'
import BreadcrumbItem from './BreadcrumbItem'

const Breadcrumb = {
    name: 'Breadcrumb',
    props: props(),
    methods: {
        getBreadcrumbName(route, params) {
            if (!route.breadcrumbName) {
                return null
            }
            const paramsKeys = Object.keys(params).join('|')
            return route.breadcrumbName.replace(
            	new RegExp(`:(${paramsKeys})`, 'g'),
            	(replacement, key) => params[key] || replacement
            )

        },
        defaultItemRender({ route, params, routes, paths }) {
            const isLastItem = routes.indexOf(route) === routes.length - 1
            const name = this.getBreadcrumbName(route, params)
            return (
                isLastItem ? <span>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>
            )
        }
    },
    render() {
        let crumbs
        const {
            prefixCls = getPrefixCls('breadcrumb'),
                $slots,
                routes,
                params = {},
                $scopedSlots
        } = this
        const children = filterEmpty($slots.default)
        const separator = getComponentFromProp(this, 'separator')

        if (routes && routes.length > 0) {
            const paths = []
            const itemRender = this.itemRender || $scopedSlots.itemRender || this.defaultItemRender

            crumbs = routes.map(route => {
                route.path = route.path || ''
                let path = route.path.replace(/^\//, '')

                Object.keys(params).forEach(key => {
                    path = path.replace(`:${key}`, params[key])
                })
                path && paths.push(path)
                return (
                    <BreadcrumbItem separator={separator} key={route.breadcrumbName || path}>
                		{itemRender({ route, params, routes, paths })}
                	</BreadcrumbItem>
                )
            })
        } else if (children.length) {
            crumbs = children.map((vnode, index) => {
                return cloneElement(vnode, {
                    props: { separator },
                    key: index
                })
            })
        }
        return (
            <div class={prefixCls}>{crumbs}</div>
        )
    }
}

export default Breadcrumb