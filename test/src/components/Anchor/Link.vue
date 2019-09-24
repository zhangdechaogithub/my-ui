<template>
    <div :class="wrapCls">
        <a :class="titleCls" :href="href" @click="onClickHandler" :title="title">{{title}}</a>
    </div>
</template>
<script>
const Link = {
    name: 'Link',
    props: {
        href: {
            type: String
        },
        title: {
            type: String
        }
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
    computed: {
        active(val) {
            return this.context.activeLink === this.href
        },
        wrapCls(val) {
            const prefixCls = this.context.prefixCls
            return {
                [`${prefixCls}-link`]: true,
                [`${prefixCls}-link-active`]: this.active
            }
        },
        titleCls(val) {
            const prefixCls = this.context.prefixCls
            return {
                [`${prefixCls}-link-title`]: true,
                [`${prefixCls}-link-title-active`]: this.active
            }
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
            const { href, title } = this.$props
            this.context.$emit('click', e, { title, href })
            this.context.activeLink = href
        }
    },
}
export default Link
</script>