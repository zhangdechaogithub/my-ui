import { getPrefixCls } from '../_util/'
const ModalMask = {
    name: 'ModalMask',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    render() {
        const prefixCls = getPrefixCls('modal-mask')
        return (
            <transition name="slide-down">
            	<div v-show={this.visible} class={prefixCls}></div>
			</transition>
        )
    }
}

export default ModalMask