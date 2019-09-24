import Anchor from './Anchor'
import Link from './Link'


Anchor.Link = Link

Anchor.install = function(Vue) {
    Vue.component(Anchor.name, Anchor)
    Vue.component(Anchor.Link.name, Anchor.Link)
}
export default Anchor