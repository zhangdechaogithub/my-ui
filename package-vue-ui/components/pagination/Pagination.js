import { paginationProps } from './props'
import PageItem from './PageItem'
import { createList } from './util/'
import { getPrefixCls } from '../_util/'
const Pagination = {
    name: 'Pagination',
    props: paginationProps,
    provide(){
        return {
            context: this
        }
    },
    data() {
        return {
            curPage: 1
        }
    },
    computed: {
        pageList() {
            return createList(this.curPage, this.total, true)
        }
    },
    methods: {

    },
    mounted() {
        this.curPage = this.current
    },
    render() {
        const { pageList, curPage, disabled, prefixCls = getPrefixCls('pagination') } = this
        return (
            <ul class={prefixCls}>
    			{
    				pageList.map((val) => {
    					let typeObj = {
    						number: 'page',
    						sm: 'jumpPrev',
    						lg: 'jumpNext',
    						prev: 'prev',
    						next: 'next'
    					}
    					let type = ''
    					if(typeof val === 'number'){
    						type = typeObj[typeof val]
    					}else{
    						type = typeObj[val]
    					}
    					return <PageItem type={type} page={val} active={curPage} disabled={disabled}/>
    				})
    			}
    		</ul>
        )
    }
}

export default Pagination