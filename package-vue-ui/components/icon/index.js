const Icon = {
    name: 'Icon',
    props: {
    	type: String
    },
    render() {
        const type = ["icon", "iconfont", `icon-${this.type}` ]
        return (
            <i class={type}></i>
        )
    }
}

Icon.install = (Vue) => {
    Vue.component(Icon.name, Icon)
}

export default Icon