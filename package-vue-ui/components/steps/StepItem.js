import { getPrefixCls, getOptionProps, getComponentFromProp } from '../_util/'
import { stepItemProps } from './props'
const stepItem = {
    name: 'StepItem',
    props: stepItemProps,
    methods: {
        renderIconNode() {
            const {
                prefixCls = getPrefixCls('steps'),
                    stepNumber,
                    status,
                    icons,
                    progressDot,
                    title,
                    description
            } = getOptionProps(this)

            const icon = getComponentFromProp(this, 'icon')
            
            let iconNode

            const iconClassName = {
                [`${prefixCls}-icon`]: true,
                [`icon`]: true,
                [`icon-${icon}`]: icon && typeof icon === 'string',
                [`icon-check`]: !icon && status === 'finish' && (icons && !icons.finish),
                [`icon-close`]: !icon && status === 'error' && (icons && !icons.error),
            }
            const iconDot = <span class={`${prefixCls}-icon-dot`} />

            if (progressDot) {
                if (typeof progressDot === 'function') {
                    iconNode = (
                        <span class={`${prefixCls}-icon`}>
			              {progressDot({ index: stepNumber - 1, status, title, description, prefixCls })}
			            </span>
                    )
                } else {
                    iconNode = <span class={`${prefixCls}-icon`}>{iconDot}</span>;
                }
            } else if (icon && !(typeof icon === 'string')) {
                iconNode = <span class={`${prefixCls}-icon`}>{icon}</span>
            } else if (icons && icons.finish && status === 'finish') {
                iconNode = <span class={`${prefixCls}-icon`}>{icons.finish}</span>
            } else if (icons && icons.error && status === 'error') {
                iconNode = <span class={`${prefixCls}-icon`}>{icons.error}</span>
            } else if (icon || status === 'finish' || status === 'error') {
                iconNode = <span class={iconClassName} />
            } else {
                iconNode = <span class={`${prefixCls}-icon`}>{stepNumber}</span>
            }
            return iconNode
        }
    },
    render() {
        const {
            prefixCls = getPrefixCls('steps'),
                itemWidth,
                status = 'wait',
                tailContent,
                adjustMarginRight,
                title,
                description
        } = getOptionProps(this)

        const clsStr = {
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-${status}`]: true,
            [`${prefixCls}-item-custom`]: getComponentFromProp(this, 'icon'),
        }

        const stepItemProps = {
            class: clsStr,
            on: this.$listeners,
        }
        const stepItemStyle = {}
        if (itemWidth) {
            stepItemStyle.width = itemWidth
        }
        if (adjustMarginRight) {
            stepItemStyle.marginRight = adjustMarginRight
        }
        stepItemProps.style = stepItemStyle
        return (
            <div {...stepItemProps}>
            	<div class={`${prefixCls}-item-tail`}>{tailContent}</div>
        		<div class={`${prefixCls}-item-icon`}>{this.renderIconNode()}</div>
        		<div class={`${prefixCls}-item-content`}>
          		<div class={`${prefixCls}-item-title`}>{title}</div>
          			{description && <div class={`${prefixCls}-item-description`}>{description}</div>}
        		</div>
            </div>
        )
    }
}

export default stepItem