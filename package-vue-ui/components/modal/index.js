import './style/index.scss'
import getProps from './props'
import ModalMask from './ModalMask'
import { getPrefixCls, filterEmpty } from '../_util/'
const Modal = {
    name: 'Modal',
    props: getProps(),
    data: () => {
        return {
        	isShow: false
        }
    },
    mounted(){

    },
    watch: {
        visible(val) {
            this.isShow = true
        }
    },
    methods: {
        getMask(isShow) {
            const maskCls = getPrefixCls('modal-mask')
            return (
                <transition name="fade">
	            	<div v-show={isShow} class={maskCls} onClick={() => this.isShow = false}></div>
				</transition>
            )
        },
        getModalWrap() {

        }
    },
    render() {
        const { prefixCls = getPrefixCls('modal'), $slots } = this
        const mask = this.getMask(this.isShow)
        return (
            <div class={prefixCls} v-show={this.isShow}>
				{mask}
				 <transition name="zoom-up">
					<div v-show={this.isShow} class={getPrefixCls('modal-wrap')}>
						<div class={getPrefixCls('modal-content')}>content</div>
					</div>
				</transition>
			</div>
        )
    }
}

export default Modal