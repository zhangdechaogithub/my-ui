
import Anchor from './Anchor'

import AnchorLink from './AnchorLink'


Anchor.Link = AnchorLink

Anchor.install = function(Vue) {
    Vue.component(Anchor.name, Anchor)
    Vue.component(Anchor.Link.name, Anchor.Link)
}

export default Anchor