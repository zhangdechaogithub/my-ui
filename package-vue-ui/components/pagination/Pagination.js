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
            curPage: 1, //当前页码
            curPageSize: 10, //每页条数
            lastPage: 0 //最大页码
        }
    },
    computed: {
        pageList() {
            return createList(this.curPage, this.lastPage, true)
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
            this.curPage = 1 //改变每页条数，重新初始化
        }
    },
    methods: {
        jumpToPage(page) {
            if (page > 0 && page <= this.lastPage) {
                this.curPage = page
            }
            if (page <= 0) {
                this.curPage = 1
            }
            if (page > this.lastPage) {
                this.curPage = this.lastPage
            }
        },
        getQuickJumperItem() {
            const { prefixCls = getPrefixCls('pagination-options'), disabled } = this
            const cls = {
                [`${prefixCls}`]: true,
            }
            const inputChangeHandler = (et) => {
                const val = parseInt(et.target.value)
                this.jumpToPage(val)
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
        },
        //简单模式
        simpleMod() {
            const { prefixCls = getPrefixCls('pagination'), disabled } = this
            const cls = {
                [`${prefixCls}`]: true,
                [`${prefixCls}-simple`]: true
            }
            const simpleCls = {
                [`${prefixCls}-simple-pager`]: true
            }
            const inputChangeHandler = (et) => {
                const val = parseInt(et.target.value)
                this.jumpToPage(val)
            }
            return (
                <ul class={cls}>
                    <PageItem 
                      type="prev" 
                      page="prev" 
                      disabled={disabled} 
                    />
                    <li class={simpleCls}>
                         <input type="text" onChange={inputChangeHandler} disabled={disabled} value={this.curPage}/>
                         <span class={`${prefixCls}-slash`}>/</span>
                         {this.lastPage}
                    </li>
                    <PageItem 
                      type="next" 
                      page="next" 
                      disabled={disabled} 
                    />
                </ul>
            )
        },
        //默认模式
        defaultMod() {
            const {
                pageList,
                curPage,
                disabled,
                showQuickJumper,
                showTotal,
                size,
                showSizeChanger,
                simple,
                prefixCls = getPrefixCls('pagination')
            } = this

            const cls = {
                [`${prefixCls}`]: true,
                [`${prefixCls}-mini`]: size === 'small'
            }

            return (<ul class={cls}>
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
            </ul>)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.curPage = this.current
            this.curPageSize = this.pageSize
            this.lastPage = window.Math.ceil(this.total / this.curPageSize)
        })
    },
    render() {
        return this.simple ? this.simpleMod() : this.defaultMod()
    }
}

export default Pagination