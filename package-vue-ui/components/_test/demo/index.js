import './style/index.scss'
const Demo = {
    name: 'Demo',
    mounted(){
    	console.log('$slots', this.$slots)
    	console.log('$scopedSlots', this.$scopedSlots)
    },
    render() {
        return (
           <div>
                {this.$scopedSlots.header()}
           </div>
        )
    }
}
export default Demo