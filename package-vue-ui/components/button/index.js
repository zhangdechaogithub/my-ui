import './style/index.scss'
import Button from './Button'
import ButtonGroup from './ButtonGroup'

Button.Group = ButtonGroup 

Button.install = (Vue) => {
	Vue.component(Button.name, Button)
	Vue.component(ButtonGroup.name, ButtonGroup)
}

export default Button