import { getPrefixCls } from '../_util/'

const Divider = {
	name: 'Divider',
	props: {
		disabled:{
			type: Boolean,
			default: true
		}
	},
	render(){
		const cls = getPrefixCls('menu-item-divider')
		return (
			<li class={cls} />
		)
	}
}

export default Divider