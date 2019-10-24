import { menuItemGroupProps } from './props'
const MenuItemGroup = {
	name: 'MenuItemGroup',
	props: menuItemGroupProps,
	render(){
		return (
			<li>
				<div>MenuItemGroup</div>
				<ul>
					{this.$slots.default}
				</ul>
			</li>
		)
	}
}
export default MenuItemGroup