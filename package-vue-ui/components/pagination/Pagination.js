import { paginationProps } from './props'
import PageItem from './PageItem'
import { createList } from './util/'
import { getPrefixCls, provider } from '../_util/'
const Pagination = {
    name: 'Pagination',
    props: paginationProps,
    provide() {
        return {
            context: this
        }
    },
    data() {
        return {
            curPage: 1,
            curPageSize: 10
        }
    },
    computed: {
        pageList() {
            const pages = window.Math.ceil(this.total / this.curPageSize)
            return createList(this.curPage, pages, true)
        }
    },
    watch: {
        curPage(page) {
            if (this.changeFunc && (typeof this.changeFunc === 'function')) {
                this.changeFunc(page, this.curPageSize, this.total)
            }
            this.$emit('pagination-change', page)
        },
        curPageSize(val, oldVal) {
            const pageNum = window.Math.ceil((oldVal * this.curPage) / val)
            this.curPage = pageNum >= this.maxPage ?  this.maxPage : pageNum//限制大小
        }
    },
    methods: {
        getQuickJumperItem() {
            const { prefixCls = getPrefixCls('pagination-options'), disabled } = this
            const cls = {
                [`${prefixCls}`]: true,
            }
            const inputChangeHandler = (et) => {
                const val = parseInt(et.target.value)
                let totalPage = window.Math.ceil(this.total/this.curPageSize)
                if (val > 0 && val <= totalPage) {
                    this.curPage = val
                }
                if (val <= 0) {
                    this.curPage = 1
                }
                if (val > totalPage) {
                    this.curPage = totalPage
                }
            }
            return (<li class={cls}>
                        <div class={`${prefixCls}-quick-jumper`}>
                            {provider.pagination.jumpText}
                            <input type="text" onChange={inputChangeHandler} disabled={disabled}/>
                            {provider.pagination.page}
                        </div>
                    </li>)
        },
        getTotalItem() {
            const { prefixCls = getPrefixCls('pagination-total-text'), disabled } = this
            const cls = {
                [`${prefixCls}`]: true,
            }
            return (
                <li class={cls}>
                    {provider.pagination.total}
                    <span>{this.total}</span>
                    {provider.pagination.item}
                </li>
            )
        },
        sizeSelectItem() {
            //待select组建完成再替换,暂时完成功能
            const { prefixCls = getPrefixCls('pagination-options'), disabled, pageSizeOptions } = this
            const cls = {
                [`${prefixCls}`]: true,
            }
            const optionChange = (et) => {
                this.curPageSize = parseInt(et.target.value)
            }
            return (
                <li class={cls}>
                    <select onChange={optionChange}>
                        {pageSizeOptions.map(v => {
                            return (<option value={v}>
                                       <span>{v}</span>
                                       {provider.pagination.item}/
                                       {provider.pagination.page}
                                   </option>)
                        })}
                    </select>
                </li>
            )
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.curPage = this.current
            this.curPageSize = this.pageSize

            let minPageSize = this.pageSizeOptions[0]
            this.pageSizeOptions.forEach(v => {
                minPageSize = minPageSize > v ? v : minPageSize
            })
            this.maxPage = window.Math.ceil(this.total/minPageSize)//计算最大页数
        })
    },
    render() {
        const {
            pageList,
            curPage,
            disabled,
            showQuickJumper,
            showTotal,
            size,
            showSizeChanger,
            prefixCls = getPrefixCls('pagination')
        } = this
        const cls = {
            [`${prefixCls}`]: true,
            [`${prefixCls}-mini`]: size === 'small'
        }
        return (
            <ul class={cls}>
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
                        return <PageItem 
                                type={type} 
                                page={val} 
                                active={curPage} 
                                disabled={disabled} 
                              />
                    })
                }
                {showQuickJumper ? this.getQuickJumperItem() : null}
                {showTotal ? this.getTotalItem(): null}
                {showSizeChanger ? this.sizeSelectItem(): null}
            </ul>
        )
    }
}

export default Pagination