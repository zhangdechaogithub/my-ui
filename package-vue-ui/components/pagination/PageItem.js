import { pageItemProps } from './props'
import { getPrefixCls } from '../_util/'
import Icon from '../icon/'
const PageItem = {
    name: 'PageItem',
    props: pageItemProps,
    inject: {
        context: { default: () => ({}) }
    },
    methods: {
        getPageItem() {
            const { page, disabled, active, prefixCls = getPrefixCls('pagination-item') } = this
            const cls = {
                [`${prefixCls}`]: true,
                [`${prefixCls}-active`]: active === page,
                [`${getPrefixCls('pagination')}-disabled`]: disabled
            }
            return <li class={cls} onClick={this.pageItemClick}><a>{page}</a></li>
        },
        getJumpPrevItem() {
            const { prefixCls = getPrefixCls('pagination'), jumpPrevIcon, disabled } = this
            const icon = jumpPrevIcon || <Icon type="doubleleft" class={`${prefixCls}-item-link-icon`}/>
            const cls = {
                [`${prefixCls}-jump-prev-custom-icon`]: !jumpPrevIcon,
                [`${prefixCls}-jump-prev`]: true,
                [`${getPrefixCls('pagination')}-disabled`]: disabled
            }

            return (<li class={cls} onClick={this.jumpPrevItemClick}>
            			<a class={`${prefixCls}-item-link`}>
            				<div class={`${prefixCls}-item-container`}>
            					{icon}
            					<span class={`${prefixCls}-item-ellipsis`}>•••</span>
            				</div>
            			</a>	
            	   </li>)
        },
        getJumpNextItem() {
            const { prefixCls = getPrefixCls('pagination'), jumpNextIcon, disabled } = this
            const icon = jumpNextIcon || <Icon type="doubleright" class={`${prefixCls}-item-link-icon`} />
            const cls = {
                [`${prefixCls}-jump-next-custom-icon`]: !jumpNextIcon,
                [`${prefixCls}-jump-next`]: true,
                [`${getPrefixCls('pagination')}-disabled`]: disabled
            }
            return (<li class={cls} onClick={this.jumpNextItemClick}>
	            		<a class={`${prefixCls}-item-link`}>
	            			<div class={`${prefixCls}-item-container`}>
	            				{icon}
	            				<span class={`${prefixCls}-item-ellipsis`}>•••</span>
	            			</div>
	            		</a>	
	            	</li>)
        },
        getPrevItem() {
            const { prefixCls = getPrefixCls('pagination'), disabled, prevIcon } = this
            const icon = prevIcon || <Icon type="left" />
            const cls = {
                [`${prefixCls}-prev`]: true,
                [`${getPrefixCls('pagination')}-disabled`]: disabled || this.context.curPage === 1
            }
            return (<li class={cls} onClick={this.prevItemClick}>
            			<a class={`${prefixCls}-item-link`}>{icon}</a>
            		</li>)
        },
        getNextItem() {
            const { prefixCls = getPrefixCls('pagination'), disabled, nextIcon } = this
            const icon = nextIcon || <Icon type="right" />
            const cls = {
                [`${prefixCls}-next`]: true,
                [`${prefixCls}-disabled`]: disabled || this.context.curPage === this.context.lastPage
            }
            return (<li class={cls} onClick={this.nextItemClick}>
		            	<a class={`${prefixCls}-item-link`}>{icon}</a>
		            </li>)
        },
        getItem(type) {
            let itemType = {
                'page': this.getPageItem(),
                'jumpPrev': this.getJumpPrevItem(),
                'jumpNext': this.getJumpNextItem(),
                'prev': this.getPrevItem(),
                'next': this.getNextItem(),
            }
            return itemType[type]
        },
        pageItemClick() {
            if (!this.disabled) {
                this.context.curPage = this.page
            }
        },
        jumpPrevItemClick() {
            if (!this.disabled) {
                this.context.curPage = this.context.curPage - 3
            }

        },
        jumpNextItemClick() {
            if (!this.disabled) {
                this.context.curPage = this.context.curPage + 3
            }
        },
        prevItemClick() {
            if (!this.disabled && this.context.curPage > 1) {
                this.context.curPage = this.context.curPage - 1
            }
        },
        nextItemClick() {
            if (!this.disabled && this.context.curPage <this.context.lastPage) {
                this.context.curPage = this.context.curPage + 1
            }
        }
    },
    render() {
        return this.getItem(this.type)
    }
}

export default PageItem