import './style/index.scss'
import { getPrefixCls, initDefaultProps, getOptionProps } from '../_util/'
import { indexProps } from './props'
import Icon from '../icon/'
import StepItem from './StepItem'

import StepList from './StepList'

const Steps = {
    name: 'Steps',
    props: indexProps,
    render() {
        const prefixCls = getPrefixCls('step')
        const props = getOptionProps(this)
        const icons = {
            finish: <Icon type="check" class={`${prefixCls}-finish-icon`} />,
            error: <Icon type="close" class={`${prefixCls}-error-icon`} />,
        }

        const stepProps = {
            props: Object.assign(props, { icons }),
            on: this.$listeners,
            scopedSlots: this.$scopedSlots,
        }
        const node = (<StepList {...stepProps}>
                        {this.$slots.default}
                     </StepList>)
        return node
    }
}
Steps.Item = StepItem
Steps.install = function(Vue) {
    Vue.component(Steps.name, Steps);
    Vue.component(StepItem.name, StepItem);
}


export default Steps