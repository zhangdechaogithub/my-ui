import Button from '../button'
import buttonTypes from '../button/buttonTypes'
import { ButtonGroupProps } from '../button/ButtonGroup'
import { hasProp, getComponentFromProp, getClassName } from '../_util/'
import dropdownProps from './dropdownProps'

const ButtonTypesProps = buttonTypes()
const DropdownProps = dropdownProps()
const ButtonGroup = Button.Group

const props = {
    type: {
        validator(val) {
            return ['primary', 'ghost', 'dashed', 'danger', 'default'].includes(val)
        },
        default: 'default'
    },
    htmlType: ButtonTypesProps.htmlType,
    disabled: Boolean,
    placement: {
        validator: DropdownProps.placement.validator,
        default: 'bottomRight'
    }
}
const DropdownButtonProps = Object.assign(props, ButtonGroupProps, DropdownProps)

export { DropdownButtonProps }

export default {
    name: 'DropdownButton',
    model: {
    	prop: 'visible',
    	event: 'visibleChange'
    },
    props: DropdownButtonProps,
    methods: {
    	clickHandler(e){
    		this.$emit('click', e)
    	},
    	onVisibleChange(val){
    		this.$emit('visibleChange', val)
    	}
    },
    inject: {
    	configProvider: { default: () => ({}) }
    },
    render() {
        return (<div>dropdown button</div>)
    }
}