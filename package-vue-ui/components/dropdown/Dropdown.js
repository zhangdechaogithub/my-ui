import DropdownButton from './DropdownButton'
import { cloneElement, getOptionProps, getPropsData } from '../_util/'
import dropdownProps from './dropdownProps'
import Icon from '../icon'

const DropdownProps = dropdownProps()
export { DropdownProps }

const Dropdown = {
    name: 'Dropdown',
    props: Object.assign(DropdownProps, {
        mouseEnterDelay: {
            type: Number,
            default: 0.15
        },
        mouseLeaveDelay: {
            type: Number,
            default: 0.1
        },
        placement: {
            validator: DropdownProps.placement.validator,
            default: 'bottomLeft'
        }
    }),
    model: {
        prop: 'visible',
        event: 'visibleChange'
    },
    methods: {
    	getTransitionName(){
    		
    	}
    },
    render() {
        return (<div>DropDown</div>)
    }
}

Dropdown.Button = DropdownButton

export default Dropdown