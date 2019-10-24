import {subMenuProps} from './props'
const popupPlacementMap = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop',
  'vertical-left': 'rightTop',
  'vertical-right': 'leftTop',
}
const SubMenu = {
	name: 'SubMenu',
	props: subMenuProps,
	render(){
		return (
			<li>
				<div>{this.title}</div>
				{this.$slots.default}
			</li>
		)
	}
}
export default SubMenu