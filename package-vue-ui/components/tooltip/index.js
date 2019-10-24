import ToolTip from './Tooltip'

ToolTip.install = function(Vue) {
  Vue.component(ToolTip.name, ToolTip)
}

export default ToolTip