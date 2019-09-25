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
        getSelectItem() {
            return <li>{this.page}</li>
        },
        getPageItem() {
            const { page, disabled, active, prefixCls = getPrefixCls('pagination-item') } = this
            const cls = {
                [`${prefixCls}`]: true,
                [`${prefixCls}-active`]: active === page,
                [`${prefixCls}-disabled`]: disabled
            }
            return <li class={cls} onClick={this.pageItemClick}><a>{page}</a></li>
        },
        getJumpPrevItem() {
        	const { prefixCls = getPrefixCls('pagination'), jumpPrevIcon} = this
        	const icon = jumpPrevIcon || <Icon type="doubleleft" class={`${prefixCls}-item-link-icon`}/>
        	const cls = {
        		[`${prefixCls}-jump-prev-custom-icon`]: !jumpPrevIcon,
        		[`${prefixCls}-jump-prev`]: true
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
            const { prefixCls = getPrefixCls('pagination'), jumpNextIcon} = this
            const icon = jumpNextIcon || <Icon type="doubleright" class={`${prefixCls}-item-link-icon`} />
        	const cls = {
        		[`${prefixCls}-jump-next-custom-icon`]: !jumpNextIcon,
        		[`${prefixCls}-jump-next`]: true
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
            const { prefixCls = getPrefixCls('pagination-item')} = this
        	const cls = {
        		[`${prefixCls}`]: true,
        	}
            return <li class={cls}>{this.page}</li>
        },
        getNextItem() {
            const { prefixCls = getPrefixCls('pagination-item')} = this
        	const cls = {
        		[`${prefixCls}`]: true,
        	}
            return <li class={cls}>{this.page}</li>
        },
        getGoInputItem() {
            const { prefixCls = getPrefixCls('pagination-item')} = this
        	const cls = {
        		[`${prefixCls}`]: true,
        	}
            return <li class={cls}>{this.page}</li>
        },
        getItem(type) {
            let itemType = {
                'page': this.getPageItem(),
                'jumpPrev': this.getJumpPrevItem(),
                'jumpNext': this.getJumpNextItem(),
                'prev': this.getPrevItem(),
                'next': this.getNextItem()
            }
            return itemType[type]
        },
        pageItemClick() {
        	this.context.curPage = this.page
        	this.context.$emit('click', this.page)
        },
        jumpPrevItemClick(){
        	this.context.curPage = this.context.curPage - 3
        },
        jumpNextItemClick(){
        	this.context.curPage = this.context.curPage + 3
        }
    },
    render() {
        return this.getItem(this.type)
    }
}

export default PageItem