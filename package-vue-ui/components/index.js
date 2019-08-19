const ENV = process.env.NODE_ENV

import './style/index.scss'

//Test Component
import { default as Test } from './test_demo'
//==================================================
import { default as Icon } from './icon'
import { default as Affix } from './affix'
import { default as Anchor } from './anchor'
import { default as Alert } from './alert'
import { default as AutoComplete } from './auto-complete'
import { default as Button } from './button'
import { Row } from './grid'
import { Col } from './grid'
import { default as Select } from './Select'
const components = [
    Affix,
    Anchor,
    AutoComplete,
    Alert,
    Button,
    Icon,
    Col,
    Select,
    Row,
    Test, //test mod
]

const install = (Vue) => {
    components.each(component => {
        Vue.use(component)
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    Affix,
    Anchor,
    AutoComplete,
    Alert,
    Button,
    Icon,
    Col,
    Select,
    Row,
    Test,
}
export default {
    install
}