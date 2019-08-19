export default {
    methods: {
        setState(state, func) {
            const newState = typeof state === 'function' ? state(this.$data, this.$props) : state

            Object.assign(this.$data, newState)
            this.$nextTick(() => {
                func && func()
            })
        },
        getComponentFromProp(prop){
        	return this[prop]
        }
    }
}