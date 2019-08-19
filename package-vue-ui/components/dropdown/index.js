import Dropdown from './Dropdown'
import DropdownButton from './DropdownButton'

Dropdown.Button = DropdownButton

Dropdown.install = (Vue) => {
	Vue.component(Dropdown.name, Dropdown)
	Vue.component(DropdownButton.name, DropdownButton)
}

export default Dropdown