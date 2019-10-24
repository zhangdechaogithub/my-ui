import {subPopupMenuProps} from './props'
const SubPopupMenu = {
	name: 'SubPopupMenu',
	props: subPopupMenuProps,
	render(){
		return (
			<ul>
				<li>{this.$slots.default}</li>
			</ul>
		)
	}
}

export default SubPopupMenu