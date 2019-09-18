import './style/index.scss'
import { getPrefixCls, initDefaultProps, getOptionProps } from '../_util/'
import { indexProps } from './props'
import Icon from '../icon/'
import StepItem from './StepItem'

import StepList from './StepList'

const Step = {
    name: 'Step',
    props: indexProps,
    render() {
        const prefixCls = getPrefixCls('step')
        const props = getOptionProps(this)

        const icons = {
            finish: <Icon type="check" class={`${prefixCls}-finish-icon`} />,
            error: <Icon type="close" class={`${prefixCls}-error-icon`} />,
        }

        const stepProps = {
            props: Object.assign({ icons }, props),
            on: this.$listeners,
            scopedSlots: this.$scopedSlots,
        }
        return (
            <StepList {...stepProps}>
            	{this.$slots.default}
            </StepList>
        )
    }
}
Step.Item = StepItem
Step.install = function(Vue) {
    Vue.component(Step.name, Step);
    Vue.component(StepItem.name, StepItem);
}


export default Step