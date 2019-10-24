import { menuItemProps } from './props'
const MenuItem = {
	name: 'MenuItem',
	props: menuItemProps,
	render(){
		return (
			<li>{this.$slots.default}</li>
		)
	}
}

export default MenuItem