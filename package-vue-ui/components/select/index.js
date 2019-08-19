import './style/index.scss'
import VcSelect from '../vc/select/index'
import LocaleReceiver from '../locale-provider/LocaleReceiver'
import defaultLocale from '../locale-provider/default'
import { getClassName } from '../_util/'
const Select = {
    name: 'Select',
    props: [],
    methods: {
        renderSelect(locale) {
            return (<VcSelect />)
        }
    },
    render() {
        console.log('VcSelect', VcSelect)
        return (<LocaleReceiver
	        componentName="Select"
	        defaultLocale={defaultLocale.Select}
	        scopedSlots={{ default: this.renderSelect }}/>)
    }
}
export default Select