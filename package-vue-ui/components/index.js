const ENV = process.env.NODE_ENV
//scss
import './style/index.scss'

//Component
import {default as Test} from './_test'
import { default as Icon } from './icon'
//==================================================

const components = [
	Test,
	Icon
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
	Test, 
	Icon
}
export default {
    install
}