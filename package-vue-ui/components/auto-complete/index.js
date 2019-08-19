import './style/index.scss'

import { getClassName } from '../_util/'
import Select from '../select'

const AutoComplete = {
    name: 'AutoComplete',
    props: [],
    option: {

    },
    OptGroup: {

    },
    model: {

    },
    methods: {
        getInputElement() {

        },
        focus() {

        },
        blur() {

        }
    },
    render() {
        return (<Select></Select>)
    }
}

AutoComplete.install = (Vue) => {
    Vue.component(AutoComplete.name, AutoComplete)
    Vue.component(AutoComplete.Option.name, AutoComplete.Option)
    Vue.component(AutoComplete.OptGroup.name, AutoComplete.OptGroup)
}

export default AutoComplete