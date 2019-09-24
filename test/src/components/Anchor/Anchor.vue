<template>
    <div :class="[`${prefixCls}-wrapper`, wrapCls]" :style="wrapStyle">
        <div :class="[`${prefixCls}`]">
            <div :class="[`${prefixCls}-ink`]">
                <span ref="linkNode" :class="[`${prefixCls}-ink-tip`, activeLink ? 'visible': '']"/>
            </div>
            <slot name="links"></slot>
        </div>
        
    </div>
</template>
<script>
import { getPrefixCls, isDOM } from './util/'

const Anchor = {
    name: 'Anchor',
    props: {
    	/*//保留属性，待扩展
        offsetTop: {
        	type: Number
        },
        affix: {
        	type: Boolean
        },
        */
        wrapCls: {
        	type: String
        },
        wrapStyle: {
        	type: Object
        }
    },
    provide() {
        return {
            anchor: {
                register: link => {
                    if (!this.links.includes(link)) {
                        this.links.push(link)
                    }
                },
                unRegister: link => {
                    const index = this.links.indexOf(link)
                    if (index !== -1) {
                        this.links.splice(index, 1)
                    }
                },
                data: this.$data
            },
            context: this
        }
    },
    data() {
        return {
            links: [],
            activeLink: null,
            container: () => window,
            prefixCls: getPrefixCls('anchor')
        }
    },
    methods: {
        linkMatchRegx() {
            return /#([^#]+)$/
        },
        getActiveLinkStr() {
            let min = window.Number.MAX_VALUE
            let active = null
            this.links.forEach((v) => {
                const resArr = v.match(this.linkMatchRegx())
                if (resArr) {
                    const node = document.getElementById(resArr[1])
                    const top = window.Math.abs(node.getBoundingClientRect().top)
                    min = (top < min) ? top : min
                    if (min === top) {
                        active = v
                    }
                }
            })
            return active
        },
        updatedState(e) {
            const prefixCls = getPrefixCls('anchor')
            this.activeLink = this.getActiveLinkStr()
            const linkNode = this.$el.getElementsByClassName(`${prefixCls}-link-title-active`)[0]
            if (linkNode) {
                this.$refs.linkNode.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 10}px`
            }
        }
    },
    beforeDestrory() {
        this.target.removeEventListener('scroll',this.updatedState, false)
    },
    mounted() {
    	this.$nextTick(() => {
    		this.target = isDOM(this.container()) ? this.container() : window//保留容器属性，待扩展
            this.activeLink = this.getActiveLinkStr()
            this.updatedState()
            this.target.addEventListener('scroll', this.updatedState, false)

        })
    },
}

export default Anchor
</script>
<style lang="scss">
	@import './style/index.scss';
</style>
