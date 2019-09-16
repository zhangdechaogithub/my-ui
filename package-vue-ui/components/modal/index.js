import Modal from './Modal'
import Confirm from './Confirm'

Modal.install = (Vue) => {
    Vue.component(Modal.name, Modal)
}
Modal.Confirm = Confirm
export default Modal